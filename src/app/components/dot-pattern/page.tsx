import fs from "node:fs";
import path from "node:path";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import { CodeBlockClient } from "@/components/code-block-client";
import { CollapsibleCodeBlock } from "@/components/collapsible-code-block";
import { DotPatternPlaygroundTabs } from "@/components/dot-pattern-playground-tabs";

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

      <DotPatternPlaygroundTabs />

      <div className="mt-12 grid gap-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">安装方式</h2>
          <Tabs defaultValue="cli">
            <TabsList>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli">
              <Tabs defaultValue="pnpm">
                <TabsList className="h-9">
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="bun">bun</TabsTrigger>
                </TabsList>
                <TabsContent value="pnpm">
                  <CodeBlockClient code={installCli.pnpm} language="bash" />
                </TabsContent>
                <TabsContent value="npm">
                  <CodeBlockClient code={installCli.npm} language="bash" />
                </TabsContent>
                <TabsContent value="yarn">
                  <CodeBlockClient code={installCli.yarn} language="bash" />
                </TabsContent>
                <TabsContent value="bun">
                  <CodeBlockClient code={installCli.bun} language="bash" />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="manual">
              <div className="space-y-2">
                <div className="text-sm font-medium">1) 复制组件源码</div>
                <CollapsibleCodeBlock collapsedHeight={220}>
                  <CodeBlockClient code={dotPatternSource} language="tsx" />
                </CollapsibleCodeBlock>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">2) 确保有 cn 工具函数</div>
                <CodeBlockClient code={utilsSource} language="ts" />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">属性说明</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 font-medium">Prop</th>
                  <th className="px-4 py-2 font-medium">类型</th>
                  <th className="px-4 py-2 font-medium">默认值</th>
                  <th className="px-4 py-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">width</td>
                  <td className="px-4 py-2">number</td>
                  <td className="px-4 py-2">16</td>
                  <td className="px-4 py-2">点阵横向间距</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">height</td>
                  <td className="px-4 py-2">number</td>
                  <td className="px-4 py-2">16</td>
                  <td className="px-4 py-2">点阵纵向间距</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">cx</td>
                  <td className="px-4 py-2">number</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">圆心 x</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">cy</td>
                  <td className="px-4 py-2">number</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">圆心 y</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">cr</td>
                  <td className="px-4 py-2">number</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">圆点半径</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">x/y</td>
                  <td className="px-4 py-2">number</td>
                  <td className="px-4 py-2">0</td>
                  <td className="px-4 py-2">pattern 偏移</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">className</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2">覆盖样式</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
