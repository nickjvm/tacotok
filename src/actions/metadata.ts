export async function getFeaturedRecipeMetadata(recipe?: Recipe) {
  if (!recipe) {
    return {
      title: "Tacotok",
      description:
        "Diversify your Taco Tuesday with a new recipe featured weekly 🌮",
    };
  }

  return {
    title: `${recipe.title} | Tacotok`,
    description: recipe.intro,
    openGraph: {
      title: `${recipe.title} | Tacotok`,
      description: recipe.intro,
      images: recipe.imageUrl
        ? [
            {
              url: recipe.imageUrl,
              width: 576,
              height: 1024,
              alt: recipe.title,
            },
          ]
        : undefined,
    },
  };
}
