"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDbDate, subtractFromDbDate } from "@/utils/date";

type Props = {
  recipe: Recipe;
  href: string;
  featuredAt?: number;
};
export default function Card({ recipe, href, featuredAt }: Props) {
  return (
    <Link
      href={href}
      className="border-gray-100 border hover:bg-lime-100 p-4 shadow-[0_0_0_black] hover:shadow-[3px_3px_0_black] transition-all h-full"
    >
      <div className="aspect-[calc(3/4)] relative mb-2">
        <Image
          fill
          src={recipe.imageUrl || ""}
          alt={recipe.title}
          className="object-cover rounded"
        />
      </div>
      <div>
        <p className="font-semibold text-lg leading-tight line-clamp-2">
          {recipe.title}
        </p>
        {featuredAt && (
          <p className="text-base">
            {formatDbDate(
              subtractFromDbDate(featuredAt, 1),
              "EEEE, MMMM dd, yyyy"
            )}
          </p>
        )}
        <p className="text-sm text-gray-500">@{recipe.author}</p>
      </div>
    </Link>
  );
}
