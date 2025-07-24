export const revalidate = 900;

import db from "@/db";
import { features, recipes } from "@/db/schema";
import { and, desc, eq, lt } from "drizzle-orm";
import Card from "@/components/Card";
import { yyyymmdd } from "@/utils/date";

export default async function Page() {
  const data = await db
    .select({
      recipe: recipes,
      featuredAt: features.featuredAt,
    })
    .from(features)
    .innerJoin(recipes, eq(recipes.id, features.recipe))
    .where(
      and(
        eq(recipes.hidden, 0),
        lt(features.featuredAt, yyyymmdd(new Date()) - 7)
      )
    )
    .orderBy(desc(features.featuredAt));

  return (
    <div>
      <h1 className="sr-only">Feature Archive</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {data.map((post) => (
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
