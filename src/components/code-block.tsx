import { codeToHtml } from "shiki";

import { CopyButton } from "@/components/copy-button";

type CodeBlockProps = {
  code: string;
  language: string;
  copyText?: string;
  className?: string;
};

export async function CodeBlock({
  code,
  language,
  copyText,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className={`relative ${className ?? ""}`}>
      <CopyButton
        text={copyText ?? code}
        className="absolute right-3 top-3 h-8 w-8"
      />
      <div
        className="overflow-x-auto rounded-lg border bg-zinc-950 p-4 text-sm text-zinc-100"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
