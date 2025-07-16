import { useMemo } from "react";

import TiktokEmbed from "@/components/embeds/Tiktok";
import InstagramEmbed from "@/components/embeds/Instagram";
import LoadingEmbed from "@/components/embeds/LoadingEmbed";

type Props = {
  url?: string;
};

export default function EmbeddedPost({ url }: Props) {
  const embed = useMemo(() => {
    const supportedSites = ["tiktok", "instagram"];

    if (!url) {
      return <LoadingEmbed animate />;
    }
    if (!supportedSites.some((site) => url.includes(site))) {
      console.error("Domain not supported", url);
      return null;
    }

    if (url.includes("tiktok")) {
      return <TiktokEmbed url={url} key={url} />;
    } else if (url.includes("instagram")) {
      return <InstagramEmbed url={url} key={url} />;
    } else return null;
  }, [url]);

  return embed;
}
