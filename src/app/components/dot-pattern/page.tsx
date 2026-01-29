import fs from "node:fs";
import path from "node:path";

import Link from "next/link";

import { DotPatternClient } from "@/components/dot-pattern-client";

const dotPatternSource = fs.readFileSync(
  path.join(process.cwd(), "registry", "ui", "dot-pattern.tsx"),
  "utf8"
);

const utilsSource = fs.readFileSync(
  path.join(process.cwd(), "src", "lib", "utils.ts"),
  "utf8"
);

const registryItemUrl =
  "https://yilanglab.github.io/underthesun/r/dot-pattern.json";

const installCli = {
  pnpm: `pnpm dlx shadcn@latest add ${registryItemUrl}`,
  npm: `npx shadcn@latest add ${registryItemUrl}`,
  yarn: `yarn dlx shadcn@latest add ${registryItemUrl}`,
  bun: `bunx shadcn@latest add ${registryItemUrl}`,
};

export default function DotPatternPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mb-12 space-y-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight">Dot Pattern</h1>
        <p className="text-lg text-muted-foreground">
          点阵背景图案组件，可作为任意容器的装饰背景。
        </p>
      </div>

      <DotPatternClient
        dotPatternSource={dotPatternSource}
        utilsSource={utilsSource}
        installCli={installCli}
      />
    </div>
  );
}
