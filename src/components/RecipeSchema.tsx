import asset from "@/utils/asset";

function extractIngredients(ingredients: string) {
  return ingredients
    .split("\n")
    .filter(
      (ingredient) => ingredient.startsWith("-") || ingredient.startsWith("*")
    )
    .map((ingredient) => ingredient.trim().replace(/^(-|\*)\s*/g, ""));
}

function extractInstructions(instructions: string) {
  return [
    {
      "@type": "HowToSection",
      name: "Instructions",
      itemListElement: instructions
        .split("\n")
        .filter((instruction) => instruction.match(/^\d+\. /))
        .map((instruction) => ({
          "@type": "HowToStep",
          text: instruction.trim().replace(/^\d+\. /, ""),
        })),
    },
  ];
}

export default function RecipeSchema({ recipe }: { recipe: Recipe }) {
  if (!recipe) {
    return null;
  }

  return (
    <script
      id="schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.title,
          video: recipe.embedUrl,
          description: recipe.intro,
          image: asset(recipe.imageKey),
          recipeCategory: "Dinner",
          recipeCuisine: "Mexican",
          author: {
            "@type": "Person",
            name: recipe.author,
          },
          recipeIngredient: extractIngredients(recipe.ingredients),
          recipeInstructions: extractInstructions(recipe.instructions),
        }),
      }}
    />
  );
}
