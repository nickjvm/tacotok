import {
  IoHeartSharp,
  IoBookmarkOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import cn from "@/utils/cn";
import Image from "@/components/Image";
import asset from "@/utils/asset";

type Props = {
  recipe: Recipe;
};
export default function StaticEmbed({ recipe }: Props) {
  return (
    <div className="border border-gray-50 rounded shadow p-4 space-y-2">
      <div className="aspect-[calc(3/4)] bg-gray-100 relative">
        <Image
          src={asset(recipe.imageKey)}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="rounded"
        />
      </div>
      <div className={cn("flex gap-2")}>
        <IoHeartSharp className="w-7 h-7 text-red-600" />
        <IoChatbubbleOutline className="w-7 h-7 text-gray-600" />
        <IoBookmarkOutline className="w-7 h-7 text-blue-400 ml-auto" />
      </div>
      <div className={cn("flex-col space-y-2 text-sm leading-tight")}>
        {recipe.intro}
      </div>
    </div>
  );
}
