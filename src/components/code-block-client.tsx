"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki/bundle/web";

import { CopyButton } from "@/components/copy-button";

type CodeBlockClientProps = {
  code: string;
  language: string;
  copyText?: string;
  className?: string;
};

export function CodeBlockClient({
  code,
  language,
  copyText,
  className,
}: CodeBlockClientProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let active = true;
    codeToHtml(code, { lang: language, theme: "github-dark" }).then((output) => {
      if (active) setHtml(output);
    });
    return () => {
      active = false;
    };
  }, [code, language]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <CopyButton
        text={copyText ?? code}
        className="absolute right-3 top-3 h-8 w-8"
      />
      <div
        className="overflow-x-auto rounded-lg border bg-zinc-950 p-4 text-sm text-zinc-100"
        dangerouslySetInnerHTML={{
          __html: html || `<pre><code>${code}</code></pre>`,
        }}
      />
    </div>
  );
}
