"use client";

import { cn } from "@/lib/utils";

export function DotPatternDesignPrinciples() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight">视觉原理：轻盈与透气</h3>
          <p className="text-muted-foreground leading-relaxed">
            点阵背景的核心优势在于<strong>负空间（Negative Space）</strong>。相比于大面积的浅灰填充，点阵保留了原始白底，视觉上更“透气”，消除了色块带来的沉淀感。
          </p>
          <p className="text-muted-foreground leading-relaxed">
            通过<strong>空间混色（Spatial Mixing）</strong>原理，高对比的深色点在宏观上被大脑平滑为一种“纹理灰”，既划定了区域边界，又保持了画面的高亮度和纯净感。
          </p>
        </div>
        <div className="rounded-lg border bg-zinc-50/50 p-6 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
            <div className="space-y-2 text-center">
              <div className="aspect-square w-full rounded-md bg-zinc-100 border border-zinc-200" />
              <p className="text-xs text-muted-foreground">浅灰填充 (Solid)</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="aspect-square w-full rounded-md border border-zinc-200 relative overflow-hidden bg-white">
                <svg className="absolute inset-0 h-full w-full fill-zinc-400/50">
                  <pattern
                    id="principle-dot"
                    width="12"
                    height="12"
                    patternUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#principle-dot)" />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground">点阵纹理 (Dot)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-zinc-50/50 p-6 flex flex-col justify-center gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>覆盖率 (Coverage)</span>
              <span>1% - 3%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
              <div className="h-full w-[3%] bg-zinc-800" />
            </div>
            <p className="text-xs text-muted-foreground">
              推荐值：1% - 3% 是质感与干扰的平衡点
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-md border bg-white p-3">
              <div className="text-2xl font-bold text-zinc-900">1px</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Size</div>
            </div>
            <div className="rounded-md border bg-white p-3">
              <div className="text-2xl font-bold text-zinc-900">16px</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Gap</div>
            </div>
            <div className="rounded-md border bg-white p-3">
              <div className="text-2xl font-bold text-zinc-900">5%</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Opacity</div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight">关键参数模型</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-2">
              <span className="shrink-0 rounded-full bg-zinc-900 h-1.5 w-1.5 mt-2" />
              <span>
                <strong className="text-foreground">点径 1px：</strong> 物理像素对齐，保证边缘最锐利，避免模糊。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 rounded-full bg-zinc-900 h-1.5 w-1.5 mt-2" />
              <span>
                <strong className="text-foreground">间距 16/24px：</strong> 匹配主流 8pt 栅格系统，建立潜意识的秩序感。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 rounded-full bg-zinc-900 h-1.5 w-1.5 mt-2" />
              <span>
                <strong className="text-foreground">透明度 3-8%：</strong> 使用纯黑+低透明度，让屏幕背光透出，保持色彩纯净。
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold tracking-tight">形状与排列策略</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card
            title="圆形 (Circle)"
            description="柔和、轻盈、自由。适合创意画布与内容展示场景。"
            visual={
              <svg className="h-full w-full fill-zinc-800/20">
                <pattern id="shape-circle" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#shape-circle)" />
              </svg>
            }
          />
          <Card
            title="十字 (Cross)"
            description="工业感、定位感强。适合需要精密对齐的工程工具。"
            visual={
              <svg className="h-full w-full stroke-zinc-800/20" strokeWidth="0.5">
                <pattern id="shape-cross" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M4 8h8M8 4v8" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#shape-cross)" />
              </svg>
            }
          />
          <Card
            title="交错排列 (Staggered)"
            description="有机、流动、密度均匀。消除直线禁锢感，提升高级感。"
            visual={
              <svg className="h-full w-full fill-zinc-800/20">
                <pattern id="shape-staggered" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" />
                  <circle cx="9" cy="9" r="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#shape-staggered)" />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}

function Card({
  title,
  description,
  visual,
}: {
  title: string;
  description: string;
  visual: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="aspect-4/3 w-full border-b bg-zinc-50/50 p-4">
        <div className="h-full w-full rounded border bg-white overflow-hidden">{visual}</div>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
