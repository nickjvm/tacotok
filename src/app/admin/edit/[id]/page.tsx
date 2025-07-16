import db from "@/db";
import { recipes } from "@/db/schema";
import { eq } from "drizzle-orm";
import EditPost from "@/components/EditPost";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const recipe = await db
    .select()
    .from(recipes)
    .where(eq(recipes.uuid, id))
    .get();

  if (!recipe) {
    return notFound();
  }

  return <EditPost recipe={recipe} />;
}
