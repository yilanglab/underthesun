"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { Maximize2, Minimize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/base-path";
import { Button } from "@/components/ui/button";

const TOTAL_SLIDES = 8;

export function DotPatternDesignPrinciples() {
  const [presenting, setPresenting] = useState(false);
  const [slide, setSlide] = useState(0);
  const [zoom, setZoom] = useState(150);

  const prev = useCallback(() => setSlide((s) => Math.max(0, s - 1)), []);
  const next = useCallback(() => setSlide((s) => Math.min(TOTAL_SLIDES - 1, s + 1)), []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(200, z + 10)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(50, z - 10)), []);
  const close = useCallback(() => { setPresenting(false); setZoom(150); }, []);

  useEffect(() => {
    if (!presenting) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [presenting, prev, next, zoomIn, zoomOut, close]);

  useEffect(() => {
    if (presenting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [presenting]);

  useEffect(() => {
    const handleOpenPresentation = () => {
      setSlide(0);
      setZoom(150);
      setPresenting(true);
    };
    window.addEventListener('open-design-presentation', handleOpenPresentation);
    return () => window.removeEventListener('open-design-presentation', handleOpenPresentation);
  }, []);

  const chapters: ReactNode[] = [
    <Chapter1 key={1} />,
    <Chapter2 key={2} />,
    <Chapter3 key={3} />,
    <Chapter5 key={4} />,
    <Chapter6 key={5} />,
    <Chapter7 key={6} />,
    <ChapterOpenSource key={7} />,
    <References key={8} />,
  ];

  return (
    <>
      <div className="grid gap-16">
        {chapters}
      </div>

      {presenting && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex items-center justify-between border-b px-6 py-3 shrink-0 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={close}>
                <X className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground font-mono tabular-nums">
                {slide + 1} / {TOTAL_SLIDES}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomOut} disabled={zoom <= 50}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground font-mono tabular-nums w-12 text-center">
                {zoom}%
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomIn} disabled={zoom >= 200}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-xs" onClick={close}>
              <Minimize2 className="h-3.5 w-3.5" />
              退出
            </Button>
          </div>

          <div className="flex-1 overflow-auto flex items-start justify-center p-8">
            <div
              className="w-full max-w-4xl transition-transform duration-150 origin-top"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              {chapters[slide]}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 border-t px-6 py-3 shrink-0 bg-background/80 backdrop-blur-sm">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={prev} disabled={slide === 0}>
              <ChevronLeft className="h-3.5 w-3.5" />
              上一页
            </Button>
            <div className="flex gap-1">
              {chapters.map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === slide ? "w-4 bg-foreground" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={next} disabled={slide === TOTAL_SLIDES - 1}>
              下一页
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

/* ━━ Chapter Components ━━ */

function Chapter1() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={1} title="一个常见的设计问题" />
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        在白色为主的 UI 界面中，我们常常需要在白底上区分不同的模块区域。最直觉的做法是浅灰填充——但灰色会让整个界面沉下去。
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        点阵是另一种思路：<strong className="text-foreground">用"频率"替代"深浅"来塑造层级</strong>。
      </p>
      <div className="rounded-lg border bg-zinc-50/50 p-6">
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
          <div className="space-y-2 text-center">
            <div className="aspect-square w-full rounded-md bg-zinc-100 border border-zinc-200" />
            <p className="text-xs text-muted-foreground">浅灰填充：面的表达，改变所有像素</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="aspect-square w-full rounded-md border border-zinc-200 relative overflow-hidden bg-white">
              <svg className="absolute inset-0 h-full w-full fill-zinc-400/50">
                <pattern id="p-intro-dot" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="6" cy="6" r="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#p-intro-dot)" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">点阵纹理：点的表达，保留大量白底</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter2() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={2} title="视觉原理：为什么点阵更轻盈？" />
      <div className="grid gap-6 md:grid-cols-3">
        <PrincipleCard
          title="负空间的力量"
          keyword="Negative Space"
          description="点阵保留了大量白底。人眼把散点看成一个整体（格式塔），但大脑能感觉到白底还在“透气”。浅灰填充改变了所有像素，透不过气。"
        />
        <PrincipleCard
          title="空间混色效应"
          keyword="Spatial Mixing"
          description="深色点和白底在微观上形成高对比，宏观上大脑把它们混合成一种“纹理灰”。这种高频纹理比平涂灰色更能勾勒模块边界，同时不会让画面变重。"
        />
        <PrincipleCard
          title="避免“脏”感"
          keyword="Color Purity"
          description="浅灰色（如 #F5F5F5）在低质量屏或 OLED 上容易发灰发脏。点阵用纯黑+低透明度，白色背光能穿透过来，画面亮度和色彩纯净度都不受影响。"
        />
      </div>
      <div className="rounded-lg border border-zinc-100 bg-zinc-50/40 overflow-hidden flex items-center justify-center py-4">
        <img
          src={getAssetPath('mtl/p1.png')}
          alt="点阵背景视觉透视示意图"
          className="max-h-64 w-auto object-contain select-none"
          draggable={false}
        />
      </div>
      <blockquote className="border-l-2 border-zinc-300 pl-4 text-sm text-muted-foreground italic">
        覆盖率只有 1-3% 的点阵是"高频信号"，在视网膜上产生的能量极小，远不如一整块浅灰色抢眼。
      </blockquote>
    </section>
  );
}

function Chapter3() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={3} title="量化控制：覆盖率模型" />
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        点阵"深浅"的精确控制靠<strong className="text-foreground">覆盖率（Coverage）</strong>——点面积占单元格面积的比值。
      </p>
      <div className="rounded-lg border bg-zinc-50/50 p-6 space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="rounded-md bg-white border px-4 py-3 font-mono text-sm">
            Coverage = π × r² / g²
          </div>
          <span className="text-xs text-muted-foreground">r = 点半径，g = 点中心间距</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>推荐覆盖率</span>
            <span className="font-mono">1% – 3%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
            <div className="h-full rounded-full bg-zinc-800" style={{ width: "3%" }} />
          </div>
          <p className="text-xs text-muted-foreground">
            低于 1% 几乎看不见，高于 3% 开始抢前景的注意力。1-3% 是"有质感但不喧宾夺主"的区间。
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ParamCard label="Size" value="1px" note="物理像素对齐，最锐利" />
          <ParamCard label="Gap" value="16/24px" note="匹配 8pt 栅格系统" />
          <ParamCard label="Color" value="#000" note="纯黑+透明度，非灰色值" />
          <ParamCard label="Opacity" value="3–8%" note="5% 是黄金平衡点" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 text-sm">
        <div className="rounded-md border overflow-hidden">
          <div className="aspect-3/2 bg-white relative border-b">
            <svg className="absolute inset-0 h-full w-full fill-zinc-800/15">
              <pattern id="p-cov-a" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-cov-a)" />
            </svg>
          </div>
          <div className="p-3 space-y-1">
            <div className="font-medium">示例 A：精致呼吸感</div>
            <div className="text-muted-foreground font-mono text-xs">r=0.5px · g=24px · Coverage ≈ 0.14%</div>
            <div className="text-xs text-muted-foreground">极低覆盖率，适合大面积背景</div>
          </div>
        </div>
        <div className="rounded-md border overflow-hidden">
          <div className="aspect-3/2 bg-white relative border-b">
            <svg className="absolute inset-0 h-full w-full fill-zinc-800/15">
              <pattern id="p-cov-b" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-cov-b)" />
            </svg>
          </div>
          <div className="p-3 space-y-1">
            <div className="font-medium">示例 B：标准纹理</div>
            <div className="text-muted-foreground font-mono text-xs">r=0.5px · g=16px · Coverage ≈ 0.31%</div>
            <div className="text-xs text-muted-foreground">常规点阵，普适性最强</div>
          </div>
        </div>
        <div className="rounded-md border overflow-hidden">
          <div className="aspect-3/2 bg-white relative border-b">
            <svg className="absolute inset-0 h-full w-full fill-zinc-800/15">
              <pattern id="p-cov-c" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="1.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-cov-c)" />
            </svg>
          </div>
          <div className="p-3 space-y-1">
            <div className="font-medium">示例 C：明显质感</div>
            <div className="text-muted-foreground font-mono text-xs">r=1px · g=12px · Coverage ≈ 2.18%</div>
            <div className="text-xs text-muted-foreground">视觉权重明显，适合强调区域</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter5() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={4} title="形态语言：形状如何改变“性格”" />
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        形状不只是好不好看的问题——换一种形状，界面的<strong className="text-foreground">情绪</strong>和<strong className="text-foreground">引导性</strong>就完全不同。
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <ShapeCard
          title="圆形 Circle"
          personality="柔和 · 轻盈 · 自由"
          scene="创意画布、内容展示、品牌官网"
          detail="没有方向性，各向同性最强。人眼不会从圆点中读出“对齐线”，对前景干扰最小。"
          visual={
            <svg className="h-full w-full fill-zinc-800/20">
              <pattern id="p-shape-circle" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-shape-circle)" />
            </svg>
          }
        />
        <ShapeCard
          title="十字 Cross"
          personality="工业 · 精密 · 定位"
          scene="精密工具、吸附坐标、工程界面"
          detail="中心定位感最强。四条臂的“边缘能量”比圆点高，暗示交汇坐标，适合吸附引导。"
          visual={
            <svg className="h-full w-full stroke-zinc-800/20" strokeWidth="0.6">
              <pattern id="p-shape-cross" width="16" height="16" patternUnits="userSpaceOnUse">
                <line x1="6" y1="8" x2="10" y2="8" />
                <line x1="8" y1="6" x2="8" y2="10" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-shape-cross)" stroke="none" />
            </svg>
          }
        />
        <ShapeCard
          title="方形 Square"
          personality="像素 · 硬朗 · 数字"
          scene="代码编辑器、金融后台、数据面板"
          detail="水平和垂直边缘明确，“网格暗示”最强。放在自由画布里偏死板，但工程场景正合适。"
          visual={
            <svg className="h-full w-full fill-zinc-800/20">
              <pattern id="p-shape-square" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect x="7" y="7" width="2" height="2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-shape-square)" />
            </svg>
          }
        />
      </div>
      <div className="rounded-md border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-900">
        <strong>注意：</strong>三角形等不对称异形会产生强方向性，破坏背景该有的各向同性（Isotropic），慎用。
      </div>
    </section>
  );
}

function Chapter6() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={5} title="排列模式：秩序感 vs 流动感" />
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        同样的点，换一种排法，设计的"语境"立刻变了。
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border overflow-hidden">
          <div className="aspect-2/1 bg-white relative border-b">
            <svg className="absolute inset-0 h-full w-full fill-zinc-800/15">
              <pattern id="p-ortho" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-ortho)" />
            </svg>
          </div>
          <div className="p-4 space-y-2">
            <h4 className="font-medium text-sm">正交排列 Orthogonal</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              水平和垂直方向有明确的导向线，眼睛会自动连点成"棋盘格线"。传达<strong>秩序和精密</strong>。SaaS 面板、代码编辑器、数据后台用得多。
            </p>
          </div>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <div className="aspect-2/1 bg-white relative border-b">
            <svg className="absolute inset-0 h-full w-full fill-zinc-800/15">
              <pattern id="p-stagger" width="20" height="40" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.2" />
                <circle cx="0" cy="30" r="1.2" />
                <circle cx="20" cy="30" r="1.2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#p-stagger)" />
            </svg>
          </div>
          <div className="p-4 space-y-2">
            <h4 className="font-medium text-sm">交错排列 Staggered</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              每行横移半个间距，点与点之间形成等边三角形。垂直方向的直线被打破，视线分散到 60° 斜向，画面<strong>更柔和也更有机</strong>，像织物的纹理。密度分布也更均匀（六角密排原理）。
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 font-medium">维度</th>
              <th className="px-4 py-2 font-medium">正交 Orthogonal</th>
              <th className="px-4 py-2 font-medium">交错 Staggered</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 text-muted-foreground">视觉骨架</td>
              <td className="px-4 py-2">十字型，硬朗稳定</td>
              <td className="px-4 py-2">菱形/三角形，柔和流动</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 text-muted-foreground">视觉噪音</td>
              <td className="px-4 py-2">较高（易产生垂直干扰）</td>
              <td className="px-4 py-2">较低（压力更分散）</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 text-muted-foreground">隐喻</td>
              <td className="px-4 py-2">像素、坐标、精密计算</td>
              <td className="px-4 py-2">蜂巢、编织物、有机纹理</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 text-muted-foreground">适用场景</td>
              <td className="px-4 py-2">效率工具、工程面板</td>
              <td className="px-4 py-2">创意产品、品牌展示</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote className="border-l-2 border-zinc-300 pl-4 text-sm text-muted-foreground italic">
        交错排列更"高级"，但它只做装饰——别指望让 UI 元素对齐交错点阵。
      </blockquote>
    </section>
  );
}

function FadeDemo({ id, label, maskStyle, sublabel }: { id: string; label: string; maskStyle?: React.CSSProperties; sublabel: string }) {
  return (
    <div className="space-y-2 text-center">
      <div className="aspect-3/2 w-full rounded-md border border-zinc-200 relative overflow-hidden bg-white">
        <svg
          className="absolute inset-0 h-full w-full fill-zinc-800/30"
          style={maskStyle}
        >
          <pattern id={`p-fade-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#p-fade-${id})`} />
        </svg>
      </div>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-[10px] text-muted-foreground">{sublabel}</p>
    </div>
  );
}

function Chapter7() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={6} title="边缘处理：渐隐与过渡" />
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        边缘怎么收尾，差别很大。生硬截断让纹理"撞"到描边上，渐隐（Mask）则让过渡柔和得多。
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <FadeDemo
          id="none"
          label="无渐隐"
          sublabel="边缘生硬截断"
        />
        <FadeDemo
          id="weak"
          label="Weak"
          sublabel="中心→最远角"
          maskStyle={{
            WebkitMaskImage: "radial-gradient(circle farthest-corner at 50% 50%, black 0%, black 70%, transparent 100%)",
            maskImage: "radial-gradient(circle farthest-corner at 50% 50%, black 0%, black 70%, transparent 100%)",
          }}
        />
        <FadeDemo
          id="medium"
          label="Medium"
          sublabel="中心→最远边"
          maskStyle={{
            WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, black 0%, black 50%, transparent 100%)",
            maskImage: "radial-gradient(circle farthest-side at 50% 50%, black 0%, black 50%, transparent 100%)",
          }}
        />
        <FadeDemo
          id="strong"
          label="Strong"
          sublabel="中心→最近边"
          maskStyle={{
            WebkitMaskImage: "radial-gradient(circle closest-side at 50% 50%, black 0%, black 30%, transparent 100%)",
            maskImage: "radial-gradient(circle closest-side at 50% 50%, black 0%, black 30%, transparent 100%)",
          }}
        />
        <FadeDemo
          id="invert"
          label="Invert"
          sublabel="反转：边缘清晰，中心消失"
          maskStyle={{
            WebkitMaskImage: "radial-gradient(circle closest-side at 50% 50%, transparent 0%, transparent 30%, black 100%)",
            maskImage: "radial-gradient(circle closest-side at 50% 50%, transparent 0%, transparent 30%, black 100%)",
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">径向渐隐 Radial Mask</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            用 CSS <code className="text-xs bg-muted px-1 rounded">mask-image</code> 让点阵靠近边缘时淡出。三档强度对应不同的"消失点"位置，容器越扁长，差异越明显。
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex gap-2">
              <span className="font-medium text-foreground w-16 shrink-0">Weak</span>
              farthest-corner：消失点在最远角，保留最大可视面积
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground w-16 shrink-0">Medium</span>
              farthest-side：消失点在最远边，四角先消失
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground w-16 shrink-0">Strong</span>
              closest-side：消失点在最近边，聚焦中心小范围
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-medium text-sm">与描边的配合</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            有了点阵纹理，模块投影（Box Shadow）通常可以去掉，只留 1px 浅色描边（如 <code className="text-xs bg-muted px-1 rounded">#000 / 0.08</code>），画面干净很多。
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            反转蒙版（Invert Mask）让中心掏空、边缘保留——中央放内容，四周用纹理做装饰。
          </p>
        </div>
      </div>
    </section>
  );
}

function LibCard({ name, description, url }: { name: string; description: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-lg border p-4 space-y-2 transition-colors hover:bg-zinc-50/80 hover:border-zinc-300 block"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm group-hover:text-foreground">{name}</h4>
        <svg className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10" />
        </svg>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}

function ChapterOpenSource() {
  return (
    <section className="space-y-6">
      <ChapterHeader index={7} title="开源组件库" />
      <p className="text-muted-foreground leading-relaxed max-w-prose">
        社区里已有不少点阵/网格背景组件，以下几个是本组件 API 设计时的主要参考。
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <LibCard
          name="Aceternity UI"
          description="Grid and Dot Backgrounds — Next.js + Tailwind CSS 组件，支持明暗模式"
          url="https://ui.aceternity.com/components/grid-and-dot-backgrounds"
        />
        <LibCard
          name="Magic UI"
          description="Dot Pattern — SVG 实现，Tailwind 全自定义，支持 Glow 效果"
          url="https://magicui.design/docs/components/dot-pattern"
        />
        <LibCard
          name="React Bits"
          description="DotGrid — Canvas + GSAP 交互动态点阵，13 个可调参数"
          url="https://www.reactbits.dev/"
        />
        <LibCard
          name="Lightswind"
          description="Grid Dot Backgrounds — 含渐出效果，支持亮/暗模式"
          url="https://lightswind.com/components/grid-dot-backgrounds"
        />
        <LibCard
          name="shadcn/ui Backgrounds"
          description="40+ 动画背景组件合集，Canvas 渲染鼠标交互 Glow"
          url="https://www.shadcn.io/background/dot-pattern"
        />
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="space-y-3 pt-4 border-t">
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">参考来源</h4>
      <ul className="text-xs text-muted-foreground space-y-1">
        <li>视觉心理学：空间混色原理（Partitive Mixing）、格式塔补全、信噪比理论</li>
        <li>屏幕渲染：子像素渲染（Sub-pixel Rendering）、OLED Mura Effect</li>
        <li>工业实践：Linear, Vercel, Figma 等产品的背景纹理实现分析</li>
        <li>项目研究文档：research/点阵背景-结论整理.md、research/Gemini-点阵背景 UI 设计原理与应用.md</li>
      </ul>
    </section>
  );
}

/* ━━ Shared Primitives ━━ */

function ChapterHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-xs font-mono text-muted-foreground tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function PrincipleCard({ title, keyword, description }: { title: string; keyword: string; description: string }) {
  return (
    <div className="rounded-lg border p-5 space-y-2">
      <div className="space-y-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{keyword}</p>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ParamCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-md border bg-white p-3 text-center space-y-1">
      <div className="text-xl font-bold text-zinc-900">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="text-[10px] text-muted-foreground">{note}</div>
    </div>
  );
}

function ShapeCard({ title, personality, scene, detail, visual }: { title: string; personality: string; scene: string; detail: string; visual: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="aspect-4/3 w-full border-b bg-zinc-50/50 p-4">
        <div className="h-full w-full rounded border bg-white overflow-hidden">{visual}</div>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs font-medium text-zinc-500">{personality}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
        <p className="text-[10px] text-muted-foreground">
          <span className="font-medium text-foreground">适用：</span>{scene}
        </p>
      </div>
    </div>
  );
}

