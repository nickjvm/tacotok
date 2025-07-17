"use server";

import sharp from "sharp";

export default async function compressImage(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch thumbnail");
    return url;
  }

  const buffer = await res.arrayBuffer();
  const image = await sharp(Buffer.from(buffer))
    .resize({ width: 500 })
    .jpeg({ quality: 60, force: false })
    .toBuffer();
  return `data:image/jpeg;base64,${image.toString("base64")}`;
}
