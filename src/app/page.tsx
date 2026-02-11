import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16">
        <section className="space-y-6">
          <h1 className="text-5xl font-semibold tracking-tight">UnderTheSun</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            基于 Next.js + Shadcn UI 的组件库，提供可复制即用的高质量 UI
            组件与交互动效。
          </p>
          <div className="flex gap-3">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90"
              href="/components/dot-pattern"
            >
              开始使用
            </Link>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shadcn UI
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">组件</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/components/dot-pattern"
              className="rounded-lg border p-6 transition hover:bg-muted"
            >
              <div className="text-base font-medium">Dot Pattern</div>
              <p className="mt-2 text-sm text-muted-foreground">
                点阵背景图案组件，含预览/代码/安装/属性说明。
              </p>
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">测试</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/components/dialoguethinking/test"
              className="rounded-lg border p-6 transition hover:bg-muted"
            >
              <div className="text-base font-medium">Agent 思考输出</div>
              <p className="mt-2 text-sm text-muted-foreground">
                对话界面中的思考过程组件，支持流式 A（字符流）与流式 B（按行模糊→清晰）两种样式对比。
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
