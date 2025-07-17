import asset from "@/utils/asset";

export async function getFeaturedRecipeMetadata(recipe?: Recipe) {
  if (!recipe) {
    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      ),
      title: "Tacotok",
      description:
        "Diversify your Taco Tuesday with a new recipe featured weekly 🌮",
    };
  }

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    title: `Tacotok | ${recipe.title}`,
    description: recipe.intro,
    openGraph: {
      title: `Tacotok | ${recipe.title}`,
      description: recipe.intro,
      images: recipe.imageKey
        ? [
            {
              url: asset(recipe.imageKey),
              width: 576,
              height: 1024,
              alt: recipe.title,
            },
          ]
        : undefined,
    },
  };
}
