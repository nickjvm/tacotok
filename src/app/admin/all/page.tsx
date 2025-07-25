import Card from "@/components/Card";
import db from "@/db";
import { recipes } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Page() {
  const data = await db.select().from(recipes).orderBy(desc(recipes.createdAt));
  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {data.map((recipe) => (
          <li key={recipe.uuid} className="flex flex-col">
            <Card recipe={recipe} href={`/admin/edit/${recipe.uuid}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
