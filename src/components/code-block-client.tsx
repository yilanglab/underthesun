"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki/bundle/web";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

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
    codeToHtml(code, { lang: language, theme: "github-light" }).then((output) => {
      if (active) setHtml(output);
    });
    return () => {
      active = false;
    };
  }, [code, language]);

  return (
    <div className={cn("relative rounded-lg border bg-zinc-50/50", className)}>
      <CopyButton
        text={copyText ?? code}
        className="absolute right-3 top-3 h-8 w-8 text-muted-foreground hover:bg-zinc-200"
      />
      <div
        className="overflow-x-auto p-4 text-sm [&>pre]:bg-transparent! [&>pre]:p-0!"
        dangerouslySetInnerHTML={{
          __html: html || `<pre><code>${code}</code></pre>`,
        }}
      />
    </div>
  );
}
