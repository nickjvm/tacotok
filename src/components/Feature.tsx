"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEyeSlash, FaPlay } from "react-icons/fa";
import Markdown from "react-markdown";

import { formatDbDate } from "@/utils/date";

import EmbeddedPost from "@/components/EmbeddedPost";
import RecipeSchema from "@/components/RecipeSchema";
import EmbedModal from "@/components/modals/Embed";
import Image from "@/components/Image";

type Props = {
  recipe: Recipe;
  featuredAt?: number | null;
};

export default function Feature({ recipe, featuredAt }: Props) {
  let source;

  if (recipe.website) {
    source = new URL(recipe.website || "");
  }

  const [mobileEmbedOpen, setMobileEmbedOpen] = useState(false);

  return (
    <div className="grid grid-cols-16 max-w-5xl mx-auto sm:gap-6 p-4">
      <RecipeSchema recipe={recipe} />
      <div className="col-span-16 lg:col-span-6 lg:order-1 order-2">
        <div
          className="hidden lg:block lg:sticky top-20 pt-12 lg:pt-0"
          id="video"
        >
          <EmbeddedPost url={recipe.embedUrl} />
        </div>
      </div>
      <div className="col-span-16 lg:col-span-10 lg:order-2 order-1 ">
        <div className="lg:hidden aspect-video overflow-hidden relative mb-4 max-w-md mx-auto">
          <button
            onClick={() => setMobileEmbedOpen(true)}
            className="absolute bg-black/50 overflow-hidden w-full h-full top-0 left-0"
          >
            <Image
              src={recipe.imageKey}
              alt={recipe.title}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
            />
            <div className="text-white absolute top-1/2 -translate-y-1/2 left-0 right-0 flex flex-col items-center justify-center">
              <span className="flex gap-2 items-center justify-center px-4 py-2 border backdrop-blur-xs bg-black/20">
                <FaPlay className="w-4 h-4" />
                Watch the video
              </span>
            </div>
          </button>
          <EmbedModal
            recipe={recipe}
            open={mobileEmbedOpen}
            setOpen={setMobileEmbedOpen}
          />
        </div>
        {featuredAt && (
          <p className="text-sm text-gray-500">
            {formatDbDate(featuredAt, "EEEE, MMMM d, yyyy")}
          </p>
        )}
        <div className="w-full max-w-full">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            {!!recipe.hidden && <FaEyeSlash className="w-6 h-6 opacity-50" />}
            {recipe.title}
          </h1>
          <div className="prose">
            <Markdown>{recipe.intro}</Markdown>
          </div>
          <div className="prose">
            <h2 className="text-xl font-bold mt-6">Ingredients</h2>
            <Markdown>{recipe.ingredients}</Markdown>
          </div>
          <div className="prose">
            <h2 className="text-xl font-bold mt-6">Instructions</h2>
            <Markdown>{recipe.instructions}</Markdown>
          </div>
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
