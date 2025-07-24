"use client";

import Markdown from "react-markdown";

import StaticEmbed from "./embeds/StaticEmbed";

type Props = {
  recipe: Recipe;
};

export default function Feature({ recipe }: Props) {
  return (
    <div className="grid grid-cols-16 max-w-5xl w-full mx-auto sm:gap-6 p-4">
      <div className="col-span-16 lg:col-span-6">
        <div
          className="lg:sticky top-20 max-w-sm mx-auto mb-8 lg:mb-0"
          id="video"
        >
          <StaticEmbed recipe={recipe} />
        </div>
      </div>
      <div className="col-span-16 lg:col-span-10">
        <div className="w-full max-w-full relative">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-base font-semibold text-center bg-lime-400 rounded-full p-2 py-1">
              👀 Sneak peek
            </span>
            {recipe.title}
          </h1>
          <div className="prose">
            <h2 className="text-xl font-bold mt-6">Ingredients</h2>
            <Markdown>{recipe.ingredients}</Markdown>
          </div>
          <div className="prose">
            <h2 className="text-xl font-bold mt-6">Instructions</h2>
            <p>Check back on Taco Tuesday for the full recipe!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
