import asset from "@/utils/asset";
import NextImage from "next/image";

type Props = Parameters<typeof NextImage>[0] & {
  src: string;
  bypassCdn?: boolean;
};
export default function Image({ bypassCdn, ...props }: Props) {
  if (bypassCdn) {
    props.src = props.src.replace(process.env.NEXT_PUBLIC_CDN_URL!, "");
  } else {
    props.src = asset(props.src);
  }
  return <NextImage {...props} />;
}
