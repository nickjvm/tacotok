"use client";

import Link from "next/link";
import EmbeddedPost from "./EmbeddedPost";
import MDEditor from "@uiw/react-md-editor";
import cn from "@/utils/cn";
import { FaTiktok } from "react-icons/fa";
import RecipeSchema from "./RecipeSchema";

type Props = {
  recipe: Recipe;
  featuredAt?: number;
};

export default function Feature({ recipe, featuredAt }: Props) {
  let source;

  if (recipe.website) {
    source = new URL(recipe.website || "");
  }

  return (
    <div className="grid grid-cols-16 max-w-5xl mx-auto gap-6 p-4">
      <RecipeSchema recipe={recipe} />
      <div className="col-span-16 lg:col-span-6 lg:order-1 order-2">
        <div className="lg:sticky top-20 pt-12 lg:pt-0" id="video">
          <EmbeddedPost url={recipe.embedUrl} />
        </div>
      </div>
      <div className="col-span-16 lg:col-span-10 lg:order-2 order-1 ">
        <Link
          className={cn(
            "lg:hidden flex gap-2 item-center justify-center px-4 py-2 border border-black-200 mb-6"
          )}
          href="#video"
        >
          <FaTiktok className="w-6 h-6" />
          Watch the video
        </Link>
        {featuredAt && (
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(featuredAt - 60 * 60 * 24 * 1000))}
          </p>
        )}
        <div className="w-full max-w-full">
          <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
          <MDEditor.Markdown
            className="prose"
            source={recipe.intro}
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
          <h2 className="text-xl font-bold mt-6">Ingredients</h2>
          <MDEditor.Markdown
            className="prose"
            source={recipe.ingredients}
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
          <h2 className="text-xl font-bold mt-6">Instructions</h2>
          <MDEditor.Markdown
            className="prose"
            source={recipe.instructions}
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
          {source && (
            <>
              <h2 className="text-xl font-bold mt-6">
                Need the full experience?
              </h2>
              <p className="prose">
                Skip the reel and get the full recipe at{" "}
                <Link
                  href={recipe.website || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.hostname || ""}
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
