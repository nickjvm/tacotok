"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function cacheThumbnail(thumbUrl: string, embedUrl: string) {
  const res = await fetch(thumbUrl);
  if (!res.ok) {
    if (embedUrl) {
      const embed = await fetchTiktokEmbed(embedUrl);
      return await cacheThumbnail(embed.thumbnail_url, embedUrl);
    }
    throw new Error("Failed to fetch thumbnail");
  }
  const buffer = await res.arrayBuffer();
  const key = `thumbnails/${crypto.randomUUID()}.jpg`;

  const image = await createImageBitmap(new Blob([buffer]));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
  const compressedBuffer = Buffer.from(dataUrl.split(",")[1], "base64");

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(compressedBuffer),
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
  return await response.json();
}
