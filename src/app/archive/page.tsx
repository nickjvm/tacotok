import db from "@/db";
import { features_new, recipes_new } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Card from "@/components/Card";

export default async function Page() {
  const data = await db
    .select({
      recipe: recipes_new,
      featuredAt: features_new.featuredAt,
    })
    .from(features_new)
    .innerJoin(recipes_new, eq(recipes_new.id, features_new.recipe))
    .orderBy(desc(features_new.featuredAt));

  return (
    <div>
      <h1 className="sr-only">Feature Archive</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {data.slice(1).map((post) => (
          <li key={post.recipe.uuid} className="flex flex-col">
            <Card
              recipe={post.recipe}
              href={`/archive/${post.recipe.uuid}`}
              featuredAt={post.featuredAt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
