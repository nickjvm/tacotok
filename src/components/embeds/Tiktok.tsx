"use client";

import { useEffect, useTransition, useRef, useState } from "react";
import Script from "next/script";

import LoadingEmbed from "@/components/embeds/LoadingEmbed";

export default function TiktokEmbed({ url }: { url: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const pollForScript = () => {
    const interval = setInterval(() => {
      if (window.tiktokEmbed?.lib?.render && ref.current) {
        window.tiktokEmbed.lib.render([
          ref.current.querySelector("blockquote") as HTMLElement,
        ]);
        clearInterval(interval);
      }
    }, 100);
    setTimeout(() => clearInterval(interval), 5000);
  };

  useEffect(() => {
    startTransition(() => {
      fetch(`https://www.tiktok.com/oembed?url=${url}?lang=en`)
        .then((r) => r.json())
        .then((oEmbed) => {
          setHtml(oEmbed.html);
          pollForScript();
        });
    });
  }, [url]);

  if (!html) {
    return null;
  }

  if (isPending) {
    return <LoadingEmbed animate />;
  }

  return (
    <>
      <div
        id="tiktokembed"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Script src="https://www.tiktok.com/embed.js" />
    </>
  );
}
