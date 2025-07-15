import { FaPhotoVideo } from "react-icons/fa";
import { IoHeartSharp, IoChatbubble, IoBookmark } from "react-icons/io5";
import cn from "@/utils/cn";

export default function LoadingEmbed({ animate }: { animate?: boolean }) {
  return (
    <div className="border border-gray-50 rounded shadow p-4 space-y-2">
      <div
        className={cn(
          "aspect-[calc(3/4)] bg-gray-100",
          animate && "animate-pulse"
        )}
      >
        <FaPhotoVideo className="w-8 h-8 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className={cn("flex gap-2", animate && "animate-pulse")}>
        <IoHeartSharp className="w-7 h-7 text-gray-100" />
        <IoChatbubble className="w-7 h-7 text-gray-100" />
        <IoBookmark className="w-7 h-7 text-gray-100 ml-auto" />
      </div>
      <div className={cn("flex-col space-y-2", animate && "animate-pulse")}>
        <div className="h-2 w-1/2 bg-gray-100 rounded" />
        <div className="h-2 w-[75%] bg-gray-100 rounded" />
      </div>
    </div>
  );
}
