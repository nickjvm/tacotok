export default async function compressImage(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch thumbnail");
    return url;
  }

  const buffer = await res.arrayBuffer();
  const image = await createImageBitmap(new Blob([buffer]));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.75);
}
