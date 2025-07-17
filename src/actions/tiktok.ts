"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function cacheThumbnail(thumbUrl: string, embedUrl: string) {
  let buffer: Buffer;
  if (thumbUrl.startsWith("data:")) {
    buffer = Buffer.from(thumbUrl.split(",")[1], "base64");
  } else {
    const res = await fetch(thumbUrl);
    if (!res.ok) {
      if (embedUrl) {
        const embed = await fetchTiktokEmbed(embedUrl);
        return await cacheThumbnail(embed.thumbnail_url, embedUrl);
      }
    }

    buffer = Buffer.from(await res.arrayBuffer());
  }

  const key = `thumbnails/${crypto.randomUUID()}.jpg`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: "image/jpeg",
    })
  );
  // Generate a public URL
  return key;
}

export async function fetchTiktokEmbed(
  embedUrl: string
): Promise<OEmbed_TikTok> {
  const url = new URL(embedUrl);
  const finalUrl = `${url.origin}${url.pathname}`;
  const response = await fetch(`https://www.tiktok.com/oembed?url=${finalUrl}`);
  if (!response.ok) {
    throw new Error("Failed to fetch tiktok oEmbed");
  }
  const data = await response.json();
  return {
    ...data,
    embed_url: embedUrl,
  };
}
