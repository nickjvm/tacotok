import db from "@/db";
import { recipes_new } from "@/db/schema";
import { eq } from "drizzle-orm";
import EditPost from "@/components/EditPost";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const recipe = await db
    .select()
    .from(recipes_new)
    .where(eq(recipes_new.uuid, id))
    .get();

  if (!recipe) {
    return notFound();
  }

  return <EditPost recipe={recipe} />;
}
