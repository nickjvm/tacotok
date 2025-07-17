"use client";

import Link from "next/link";
import { formatDbDate, subtractFromDbDate } from "@/utils/date";
import Image from "@/components/Image";
import cn from "@/utils/cn";
import { FaEyeSlash } from "react-icons/fa";

type Props = {
  recipe: Recipe;
  href: string;
  featuredAt?: number;
};
export default function Card({ recipe, href, featuredAt }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "border-gray-100 border hover:bg-lime-100 p-4 shadow-[0_0_0_black] hover:shadow-[3px_3px_0_black] transition-all h-full"
      )}
    >
      <div className="aspect-[calc(3/4)] relative mb-2">
        {!!recipe.hidden && (
          <FaEyeSlash className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-800/75" />
        )}
        <Image
          fill
          src={recipe.imageKey}
          alt={recipe.title}
          sizes="(max-width: 768px) 100vw, 400px"
          className={cn("object-cover rounded", recipe.hidden && "opacity-50")}
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
