"use client";

import { cn } from "@/lib/utils";

export function DotPatternDesignPrinciples() {
  return (
    <div className="grid gap-16">
      {/* ── Chapter 1: The Problem ── */}
      <section className="space-y-6">
        <ChapterHeader index={1} title="一个常见的设计问题" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          在白色为主的 UI 界面中，我们常常需要在白底上区分不同的模块区域。最直觉的做法是使用浅灰填充——但它会带来一种微妙的"沉淀感"，让界面变得灰蒙蒙的。
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          点阵图案提供了一种截然不同的思路：<strong className="text-foreground">用"频率"替代"深浅"来塑造层级</strong>。它更符合现代 UI 追求的"数字原生"质感。
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
                    <circle cx="1" cy="1" r="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#p-intro-dot)" />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground">点阵纹理：点的表达，保留大量白底</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter 2: Why it works ── */}
      <section className="space-y-6">
        <ChapterHeader index={2} title="视觉原理：为什么点阵更轻盈？" />
        <div className="grid gap-6 md:grid-cols-3">
          <PrincipleCard
            title="负空间的力量"
            keyword="Negative Space"
            description="点阵保留了大量原始白底。人眼会自动将散点组合为一个整体区域（格式塔），但大脑能感知到白底在"透气"。这种透光性产生了轻盈感。浅灰填充则改变了所有像素，形成一块密闭的视觉质量。"
          />
          <PrincipleCard
            title="空间混色效应"
            keyword="Spatial Mixing"
            description="微观上，深色点与白底形成高对比；宏观上，大脑将其平滑感知为一种"纹理灰"。这种高频纹理比低频的平涂灰色更能勾勒出模块边界——在不增加色块厚重感的前提下，清晰地界定区域。"
          />
          <PrincipleCard
            title="避免"脏"感"
            keyword="Color Purity"
            description="浅灰色（如 #F5F5F5）在低质量或 OLED 显示器上容易发灰、发脏。点阵使用纯黑+低透明度，让底层白色背光穿透，维持了画面的高亮度和色彩纯净度，有效避免"抹布屏"效应。"
          />
        </div>
        <blockquote className="border-l-2 border-zinc-300 pl-4 text-sm text-muted-foreground italic">
          点阵是"高频信号"，覆盖率极低（1-3%），在视网膜上产生的总能量极小，对注意力的占用远低于"低频"的浅灰色块。
        </blockquote>
      </section>

      {/* ── Chapter 3: The Math ── */}
      <section className="space-y-6">
        <ChapterHeader index={3} title="量化控制：覆盖率模型" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          如何精确控制点阵的"深浅"？关键是<strong className="text-foreground">覆盖率（Coverage）</strong>——点面积占单元格面积的比值。它量化了背景对视觉的占用程度。
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
              这是"质感存在但不喧宾夺主"的核心阈值。低于 1% 几乎不可见，高于 3% 开始产生干扰。
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
          <div className="rounded-md border p-4 space-y-2">
            <div className="font-medium">示例 A：精致呼吸感</div>
            <div className="text-muted-foreground">r=0.5px, g=24px → Coverage ≈ 0.14%</div>
            <div className="text-xs text-muted-foreground">极低覆盖率，适合大面积背景</div>
          </div>
          <div className="rounded-md border p-4 space-y-2">
            <div className="font-medium">示例 B：标准纹理</div>
            <div className="text-muted-foreground">r=0.5px, g=16px → Coverage ≈ 0.31%</div>
            <div className="text-xs text-muted-foreground">常规点阵，普适性最强</div>
          </div>
          <div className="rounded-md border p-4 space-y-2">
            <div className="font-medium">示例 C：明显质感</div>
            <div className="text-muted-foreground">r=1px, g=12px → Coverage ≈ 2.18%</div>
            <div className="text-xs text-muted-foreground">视觉权重明显，适合强调区域</div>
          </div>
        </div>
      </section>

      {/* ── Chapter 4: Display Science ── */}
      <section className="space-y-6">
        <ChapterHeader index={4} title="物理显示：为什么用黑色+透明度？" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          参数推荐不是凭空而来。它们结合了屏幕渲染物理特性和视觉心理学的交叉验证。
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <PrincipleCard
            title="像素对齐"
            keyword="Pixel Snapping"
            description="1px 是渲染最清晰、边缘最锐利的基准单位。0.5px 在非 Retina 屏会严重模糊（反走样）。即使在 2x/3x 屏上，1px 依然是最稳定的渲染单位。"
          />
          <PrincipleCard
            title="#000 + Opacity 的物理优势"
            keyword="Backlight Transparency"
            description="使用灰色值（如 #F5F5F5），显示器通过子像素 RGB 组合该颜色。使用纯黑+低透明度，则是让纯白背景光穿透，色彩更纯净。在 OLED 屏上尤为明显。"
          />
          <PrincipleCard
            title="栅格一致性"
            keyword="8pt Grid System"
            description="间距选用 16/24/32px 等 8 的倍数，与布局的 Padding/Margin 形成隐性对齐。这不是随意选择——它让点阵在潜意识中增强整体画面的秩序感。"
          />
        </div>
      </section>

      {/* ── Chapter 5: Shape Language ── */}
      <section className="space-y-6">
        <ChapterHeader index={5} title="形态语言：形状如何改变"性格"" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          形状的选择不只是美学偏好——它会从根本上改变界面传达的<strong className="text-foreground">情绪</strong>和<strong className="text-foreground">引导性</strong>。每种形状都有自己的"视觉性格"。
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <ShapeCard
            title="圆形 Circle"
            personality="柔和 · 轻盈 · 自由"
            scene="创意画布、内容展示、品牌官网"
            detail="无方向性，各向同性最强。人眼不会从圆点中读取出"对齐线"，因此对前景内容的干扰最小。"
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
            detail="提供最强的中心定位感。四个方向的"边缘能量"比圆点更高，能精确暗示交汇坐标，适合做吸附的视觉引导。"
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
            detail="方形具有明确的水平/垂直边缘，会产生更强的"网格暗示"。在需要灵感迸发的自由画布中显得过于死板，但在工程场景中传达精密感。"
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
          <strong>注意：</strong>不对称异形（如三角形）会产生强烈的方向性暗示，破坏背景纹理应有的"各向同性（Isotropic）"，慎用。
        </div>
      </section>

      {/* ── Chapter 6: Layout Modes ── */}
      <section className="space-y-6">
        <ChapterHeader index={6} title="排列模式：秩序感 vs 流动感" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          同样的点，排列方式的改变会瞬间切换设计的"语境"。这是点阵设计中最容易被忽视、但影响巨大的一个维度。
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
                产生明确的水平/垂直导向线，传达<strong>秩序、精密、逻辑严密</strong>的气质。眼睛会自动连接垂直和水平方向的点，形成隐形的"棋盘格线"。适合 SaaS 面板、代码编辑器、数据后台等效率工具。
              </p>
            </div>
          </div>
          <div className="rounded-lg border overflow-hidden">
            <div className="aspect-2/1 bg-white relative border-b">
              <svg className="absolute inset-0 h-full w-full fill-zinc-800/15">
                <pattern id="p-stagger" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.2" />
                  <circle cx="20" cy="20" r="1.2" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#p-stagger)" />
              </svg>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-medium text-sm">交错排列 Staggered</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                每行横移半个间距，点与点形成等边三角形关系。打破了垂直方向的直线连接，将视觉引导分散到 60° 斜向。画面显得更加<strong>柔和、有机、流动</strong>，像一层"织物"或"皮肤"。密度分布也更均匀（六角密排原理）。
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
          交错排列更"高级"，但仅作为装饰性纹理存在——不要尝试让 UI 元素对齐交错点阵，它不承担辅助对齐功能。
        </blockquote>
      </section>

      {/* ── Chapter 7: Edge Treatment ── */}
      <section className="space-y-6">
        <ChapterHeader index={7} title="边缘处理：渐隐与过渡" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          点阵在容器边缘的处理方式决定了整体的精致度。生硬的截断会让纹理"撞"到模块描边，而渐隐（Mask）可以让过渡自然柔和。
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">径向渐隐 Radial Mask</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              使用 CSS <code className="text-xs bg-muted px-1 rounded">mask-image</code> 让点阵靠近边缘时逐渐淡出。本组件提供三档强度控制：
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex gap-2">
                <span className="font-medium text-foreground w-16 shrink-0">Weak</span>
                中心到最远角（farthest-corner）渐变，保留最大可视区域
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-foreground w-16 shrink-0">Medium</span>
                中心到最远边（farthest-side）渐变，边缘柔和过渡
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-foreground w-16 shrink-0">Strong</span>
                中心到最近边（closest-side）渐变，聚焦中心区域
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-sm">与描边的配合</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              点阵提供的纹理区分度通常已经足够。使用点阵背景后，可以弱化或取消模块投影（Box Shadow），仅保留 1px 浅色描边（如 <code className="text-xs bg-muted px-1 rounded">#000 / 0.08</code>），画面会更干净。
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              反转蒙版（Invert Mask）可以实现"中心掏空、边缘保留"的效果——边缘清晰，中心逐渐消失。适合在需要中央内容绝对清晰的场景中使用。
            </p>
          </div>
        </div>
      </section>

      {/* ── Chapter 8: Scaling ── */}
      <section className="space-y-6">
        <ChapterHeader index={8} title="缩放场景：自由画布中的挑战" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          在 Figma、Miro 等无限画布产品中，背景纹理会随缩放级别变化。如果处理不当，会产生三个核心问题。
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <PrincipleCard
            title="莫尔条纹"
            keyword="Moiré Effect"
            description="当点距接近显示器物理像素间距时，采样频率失调会产生波纹、阴影等视觉噪音，引起眩晕。"
          />
          <PrincipleCard
            title="视觉权重失控"
            keyword="Visual Mass Drift"
            description="放大时，精致的"质感点"变成巨大的"圆饼"；缩小时，点变得斑驳或消失，失去空间坐标感。"
          />
          <PrincipleCard
            title="渲染性能"
            keyword="Performance"
            description="大量独立 SVG 或 DOM 节点在缩放时的重绘会导致掉帧。需要做上限保护或降级策略。"
          />
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="bg-muted px-4 py-2 text-sm font-medium">
            推荐策略：分级细节（LOD）
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 font-medium">缩放区间</th>
                <th className="px-4 py-2 font-medium">表现形式</th>
                <th className="px-4 py-2 font-medium">策略</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">&lt; 20%</td>
                <td className="px-4 py-2">无纹理 / 纯色</td>
                <td className="px-4 py-2 text-muted-foreground">降噪，强调整体轮廓</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">20% – 200%</td>
                <td className="px-4 py-2">1px 点阵</td>
                <td className="px-4 py-2 text-muted-foreground">保持物理 1px，间距随缩放</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">&gt; 200%</td>
                <td className="px-4 py-2">细十字线</td>
                <td className="px-4 py-2 text-muted-foreground">提示用户进入高精度编辑</td>
              </tr>
            </tbody>
          </table>
        </div>
        <blockquote className="border-l-2 border-zinc-300 pl-4 text-sm text-muted-foreground italic">
          核心原则：点不应随缩放而"肥胖"。始终保持屏幕物理尺寸恒定（如 1px 或 1.5px），是维持高级感的关键。
        </blockquote>
      </section>

      {/* ── Chapter 9: Decision Guide ── */}
      <section className="space-y-6">
        <ChapterHeader index={9} title="决策指南：如何选择？" />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          没有"最好"的点阵配置——只有最匹配场景的配置。以下是基于设计目标的快速决策矩阵。
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-5 space-y-3 bg-blue-50/30 border-blue-200/50">
            <div className="text-sm font-medium">偏展示 / 内容阅读</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              追求轻盈、不干扰阅读
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Tag>圆形</Tag>
              <Tag>交错排列</Tag>
              <Tag>低透明度</Tag>
              <Tag>边缘渐隐</Tag>
            </div>
          </div>
          <div className="rounded-lg border p-5 space-y-3 bg-amber-50/30 border-amber-200/50">
            <div className="text-sm font-medium">偏精密 / 工具导向</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              强调对齐、坐标感、专业工具属性
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Tag>十字 / 方形</Tag>
              <Tag>正交排列</Tag>
              <Tag>极低透明度</Tag>
            </div>
          </div>
          <div className="rounded-lg border p-5 space-y-3 bg-emerald-50/30 border-emerald-200/50">
            <div className="text-sm font-medium">自由画布场景</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              需要适配缩放，保持恒定视觉权重
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Tag>固定 1px</Tag>
              <Tag>分级 LOD</Tag>
              <Tag>非比例缩放</Tag>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 font-medium">样式</th>
                <th className="px-4 py-2 font-medium">视觉语言</th>
                <th className="px-4 py-2 font-medium">核心功能</th>
                <th className="px-4 py-2 font-medium">典型案例</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">点阵 Dots</td>
                <td className="px-4 py-2">轻盈、透气、现代</td>
                <td className="px-4 py-2 text-muted-foreground">区分模块，增加质感</td>
                <td className="px-4 py-2 text-muted-foreground">Linear, Notion, Raycast</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">十字 Cross</td>
                <td className="px-4 py-2">精准、工业、点位</td>
                <td className="px-4 py-2 text-muted-foreground">坐标定位，辅助吸附</td>
                <td className="px-4 py-2 text-muted-foreground">Figma, Spline</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">方格 Grid</td>
                <td className="px-4 py-2">严谨、结构、空间</td>
                <td className="px-4 py-2 text-muted-foreground">空间度量，逻辑组织</td>
                <td className="px-4 py-2 text-muted-foreground">Blender, 流程图工具</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── References ── */}
      <section className="space-y-3 pt-4 border-t">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">参考来源</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>视觉心理学：空间混色原理（Partitive Mixing）、格式塔补全、信噪比理论</li>
          <li>屏幕渲染：子像素渲染（Sub-pixel Rendering）、OLED Mura Effect</li>
          <li>工业实践：Linear, Vercel, Figma 等产品的背景纹理实现分析</li>
          <li>项目研究文档：research/点阵背景-结论整理.md、research/Gemini-点阵背景 UI 设计原理与应用.md</li>
        </ul>
      </section>
    </div>
  );
}

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

function PrincipleCard({
  title,
  keyword,
  description,
}: {
  title: string;
  keyword: string;
  description: string;
}) {
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

function ShapeCard({
  title,
  personality,
  scene,
  detail,
  visual,
}: {
  title: string;
  personality: string;
  scene: string;
  detail: string;
  visual: React.ReactNode;
}) {
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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600">
      {children}
    </span>
  );
}
