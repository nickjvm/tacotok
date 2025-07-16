"use client";

import {
  useActionState,
  useTransition,
  useState,
  useMemo,
  useRef,
} from "react";
import { IoSparkles } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { createPost, updatePost } from "@/actions/post";
import { parseEmbedSource } from "@/actions/parseEmbedSource";
import { useNotification } from "@/providers/Notifications";
import cn from "@/utils/cn";

import TextInput from "@/components/TextInput";
import Textarea from "@/components/Textarea";
import EmbeddedPost from "@/components/EmbeddedPost";

type Props = {
  recipe: Partial<Recipe>;
};

export default function EditPost({ recipe: _recipe }: Props) {
  const router = useRouter();
  const { addNotification } = useNotification();
  const [recipe, submitAction, isPending] = useActionState(
    async (
      state: Partial<Recipe> | null,
      formData: FormData
    ): Promise<Recipe | null> => {
      const data = {
        title: formData.get("title") as string,
        intro: formData.get("intro") as string,
        ingredients: formData.get("ingredients") as string,
        instructions: formData.get("instructions") as string,
        website: formData.get("website") as string,
        author: formData.get("author") as string,
        embedUrl: formData.get("embedUrl") as string,
        hidden: Boolean(formData.get("hidden")),
        imageUrl: formData.get("imageUrl") as string,
      };

      if (recipe?.uuid) {
        const updatedRecipe = await updatePost({
          ...recipe,
          ...data,
        } as Recipe);
        addNotification({
          message: `Recipe ${updatedRecipe.title} updated.`,
          type: "success",
        });
        return updatedRecipe;
      }

      const newRecipe = await createPost(data);
      addNotification({
        message: `Recipe ${newRecipe.title} created.`,
        type: "success",
      });
      router.push(`/admin/edit/${newRecipe.uuid}`);
      return null;
    },
    _recipe
  );

  const [autocompletedFields, setAutocompletedFields] = useState({
    ingredients: recipe?.ingredients || "",
    instructions: recipe?.instructions || "",
    introduction: recipe?.intro || "",
    author: recipe?.author || "",
    title: recipe?.title || "",
    imageUrl: recipe?.imageUrl || "",
    embedUrl: recipe?.embedUrl || "",
  });

  const [isGenerating, startTransition] = useTransition();

  const generateFromEmbedUrl = async () => {
    const data = new FormData(formRef.current!);
    const embedUrl = data.get("embedUrl") as string;
    if (
      _recipe.embedUrl === embedUrl ||
      autocompletedFields.embedUrl === embedUrl
    ) {
      return;
    }
    try {
      const url = new URL(embedUrl);
      const finalUrl = `${url.origin}${url.pathname}`;
      setAutocompletedFields((prevState) => ({
        ...prevState,
        embedUrl: finalUrl,
      }));
      startTransition(async () => {
        const response = await fetch(
          `https://www.tiktok.com/oembed?url=${finalUrl}`
        );
        const oEmbed = (await response.json()) as OEmbed;

        // setAutocompletedFields({
        //   ...autocompletedFields,
        //   embedUrl,
        //   author: oEmbed.author_unique_id || "",
        //   imageUrl: oEmbed.thumbnail_url || "",
        // });
        // return;
        const parsed = await parseEmbedSource(oEmbed);

        setAutocompletedFields({
          embedUrl: finalUrl,
          title: parsed.title || "",
          ingredients: `- ${parsed.ingredients
            ?.map((i) => i?.trim())
            .filter((i) => !!i)
            .join("\n- ")}`,
          instructions: `1. ${parsed.instructions
            ?.map((i) => i?.trim())
            .filter((i) => !!i)
            .join("\n1. ")}`,
          introduction: parsed.introduction || "",
          author: parsed.oembed.author_unique_id || "",
          imageUrl: parsed.oembed.thumbnail_url || "",
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);
  const preview = useMemo(
    () => <EmbeddedPost url={autocompletedFields.embedUrl} />,
    [autocompletedFields.embedUrl]
  );

  return (
    <div className="grid grid-cols-16 max-w-5xl mx-auto gap-6 p-4">
      {autocompletedFields.embedUrl && (
        <div className="col-span-6">
          <div className="sticky top-20">{preview}</div>
        </div>
      )}
      <div
        className={cn(
          "col-span-16",
          autocompletedFields.embedUrl && "col-span-10"
        )}
      >
        <h1 className="text-xl font-bold mb-4">
          {recipe?.uuid ? `Edit ${recipe?.title}` : "Create a Recipe"}{" "}
        </h1>
        <form className="space-y-2" action={submitAction} ref={formRef}>
          <input
            type="hidden"
            name="imageUrl"
            value={autocompletedFields.imageUrl}
          />
          <div className="flex items-end gap-2">
            <TextInput
              label="Post Link"
              name="embedUrl"
              id="embedUrl"
              disabled={isGenerating}
              defaultValue={autocompletedFields.embedUrl}
            />
            <button
              type="button"
              onClick={generateFromEmbedUrl}
              className="px-3 py-2.5 border-gray-200 rounded border hover:bg-purple-200 text-purple-600 transition-colors hover:border-purple-600"
            >
              <IoSparkles className="w-5 h-5" />
            </button>
          </div>
          {isGenerating && (
            <AiOutlineLoading3Quarters className="animate-spin w-10 h-10 mx-auto mt-20" />
          )}
          {autocompletedFields.embedUrl && !isGenerating && (
            <div className="space-y-2">
              <TextInput
                label="Title"
                name="title"
                id="title"
                value={autocompletedFields.title}
                onChange={(e) =>
                  setAutocompletedFields({
                    ...autocompletedFields,
                    title: e.target.value,
                  })
                }
              />

              <Textarea
                label="Intro"
                name="intro"
                id="intro"
                value={autocompletedFields.introduction}
                onChange={(value) =>
                  setAutocompletedFields({
                    ...autocompletedFields,
                    introduction: value || "",
                  })
                }
              />
              <Textarea
                label="Ingredients"
                name="ingredients"
                id="ingredients"
                value={autocompletedFields.ingredients}
                onChange={(value) =>
                  setAutocompletedFields({
                    ...autocompletedFields,
                    ingredients: value || "",
                  })
                }
              />
              <Textarea
                label="Instructions"
                name="instructions"
                id="instructions"
                value={autocompletedFields.instructions}
                onChange={(value) =>
                  setAutocompletedFields({
                    ...autocompletedFields,
                    instructions: value || "",
                  })
                }
              />
              <TextInput
                label="Website"
                name="website"
                id="source"
                defaultValue={recipe?.website || ""}
              />
              <TextInput
                label="Author"
                name="author"
                id="author"
                value={autocompletedFields.author}
                onChange={(e) =>
                  setAutocompletedFields({
                    ...autocompletedFields,
                    author: e.target.value,
                  })
                }
              />
              <div className="flex justify-end mt-4">
                <button className="button" type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
