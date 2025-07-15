import { notFound } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.ADMIN_TOKEN) {
    return notFound();
  }

  return <>{children}</>;
}
