export default function asset(src: string) {
  if (
    !src.startsWith(process.env.NEXT_PUBLIC_CDN_URL!) &&
    !src.startsWith("/")
  ) {
    return `${process.env.NEXT_PUBLIC_CDN_URL}/${src}`;
  }
  return src;
}
