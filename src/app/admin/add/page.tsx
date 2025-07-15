import EditPost from "@/components/EditPost";

export default async function Page() {
  return (
    <EditPost
      recipe={{
        uuid: "",
        embedUrl: "",
        author: "",
        website: "",
        title: "",
        intro: "",
        ingredients: "",
        instructions: "",
      }}
    />
  );
}
