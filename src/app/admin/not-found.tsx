import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center grow">
      <h2 className="text-2xl font-bold">That page doesn&apos;t exist.</h2>
      <Link
        href="/admin/all"
        className="mt-4 px-8 py-2 border border-black-200 hover:bg-lime-300 transition-colors"
      >
        Back to list
      </Link>
    </div>
  );
}
