import { sql } from "drizzle-orm";
import { notFound } from "next/navigation";

import db from "@/db";
import { recipes } from "@/db/schema";
import Feature from "@/components/Feature";

export default async function Page() {
  const data = await db
    .select({ recipe: recipes })
    .from(recipes)
    .orderBy(sql`random()`)
    .get();

  if (!data) {
    return notFound();
  }

  return <Feature recipe={data.recipe} />;
}
