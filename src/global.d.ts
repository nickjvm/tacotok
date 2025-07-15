import { InferSelectModel } from "drizzle-orm";
import { recipes_new } from "./db/schema";

declare global {
  type Recipe = InferSelectModel<typeof recipes_new>;

  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
    tiktokEmbed?: {
      lib: {
        render: (elements: HTMLElement[]) => void;
      };
    };
  }

  type OEmbed_TikTok = {
    version: string;
    type: "video";
    title: string;
    author_url: string;
    author_name: string;
    width: string;
    height: string;
    html: string;
    thumbnail_width: number;
    thumbnail_height: number;
    thumbnail_url: string;
    provider_url: string;
    provider_name: string;
    author_unique_id: string;
    embed_product_id: string;
    embed_type: "video";
  };

  type OEmbed_Instagram = {
    foo: string;
  };

  type OEmbed = OEmbed_TikTok;
}
