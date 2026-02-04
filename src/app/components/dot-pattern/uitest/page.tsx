"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";

import { DotPattern } from "@/registry/ui/dot-pattern";
import {
  DotPatternParams,
  DotPatternParamsPanel,
} from "@/components/dot-pattern-params-panel";
import { Button } from "@/components/ui/button";

const INITIAL_PARAMS: DotPatternParams = {
  width: 16,
  height: 16,
  x: 0,
  y: 0,
  cx: 1,
  cy: 1,
  cr: 1.5,
  shape: "circle",
  strokeWidth: 1,
  mode: "orthogonal",
  color: "#00142e",
  opacity: 0.05,
  fade: true,
  fadeLevel: "strong",
  fadeReverse: false,
  effect: "glow",
  effectPlaying: true,
  effectEase: "linear",
  effectMaxScale: 1,
  effectMaxOpacity: 0.5,
  effectColor: "#000000",
  effectSize: 150,
  effectDuration: 2.3,
  multiColor: true,
  multiColors: [
    { color: "#ffa200", percent: 10 },
    { color: "#29adff", percent: 40 },
    { color: "#2478ff", percent: 50 },
  ],
  hover: true,
  hoverRadius: 120,
  hoverTargetScale: 1.8,
  hoverTargetOpacity: 0.8,
  hoverColor: "#000000",
  hoverTrail: true,
  hoverTrailDuration: 2,
};

export default function DotPatternUiTestPage() {
  const [params, setParams] = useState<DotPatternParams>(INITIAL_PARAMS);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleParamChange = <K extends keyof DotPatternParams>(
    key: K,
    value: DotPatternParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #f5f9ff 0%, #f0f3fc 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 py-0">
        <nav className="mx-auto flex h-[60px] w-full max-w-[1880px] items-center justify-between bg-[#f5f9ff]">
          <img
            src="/testpage/t-l.png"
            alt="nav left"
            className="h-[60px] w-auto"
          />
          <img
            src="/testpage/t-m.svg"
            alt="nav middle"
            className="h-[60px] w-auto"
          />
          <img
            src="/testpage/t-r.svg"
            alt="nav right"
            className="h-10 w-auto"
          />
        </nav>

        <div className="relative mx-auto mt-0 flex w-full max-w-[1880px] flex-col justify-center overflow-hidden rounded-[20px] bg-white px-20 py-10 min-h-[calc(100vh-60px-20px)] mb-5">
          <DotPattern
            width={params.width}
            height={params.height}
            x={params.x}
            y={params.y}
            cx={params.cx}
            cy={params.cy}
            cr={params.cr}
            shape={params.shape}
            strokeWidth={params.strokeWidth}
            mode={params.mode}
            color={params.color}
            opacity={params.opacity}
            fade={params.fade}
            fadeLevel={params.fadeLevel}
            fadeReverse={params.fadeReverse}
            effect={params.effect}
            effectPlaying={params.effectPlaying}
            effectEase={params.effectEase}
            effectMaxScale={params.effectMaxScale}
            effectMaxOpacity={params.effectMaxOpacity}
            effectColor={params.effectColor}
            effectSize={params.effectSize}
            effectDuration={params.effectDuration}
            multiColor={params.multiColor}
            multiColors={params.multiColors}
            hover={params.hover}
            hoverRadius={params.hoverRadius}
            hoverTargetScale={params.hoverTargetScale}
            hoverTargetOpacity={params.hoverTargetOpacity}
            hoverColor={params.hoverColor}
            hoverTrail={params.hoverTrail}
            hoverTrailDuration={params.hoverTrailDuration}
          />
          <DotPatternParamsPanel
            isOpen={isPanelOpen}
            params={params}
            onParamChange={handleParamChange}
            onReset={() => setParams(INITIAL_PARAMS)}
          />
          <Button
            variant="ghost"
            size="icon"
            className={`fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full border bg-background/80 shadow-md backdrop-blur-sm hover:bg-background ${
              isPanelOpen ? "bg-muted text-foreground" : ""
            }`}
            onClick={() => setIsPanelOpen((prev) => !prev)}
            aria-label="Toggle parameters"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
          <div className="relative z-10 mx-auto flex w-full max-w-[888px] flex-col items-center gap-12">
            <div className="flex items-center gap-4">
              <img
                src="/testpage/logo.svg"
                alt="logo"
                className="h-12 w-auto"
              />
            </div>

            <div className="flex w-full flex-col items-center gap-6">
              <img
                src="/testpage/sayhi.svg"
                alt="say hi"
                className="h-8 w-auto"
              />
              <div className="w-full rounded-[32px] bg-[#f6f7f8] p-3">
                <div className="rounded-[24px] border border-[#495a7a]/10 bg-white px-6 py-6">
                  <div className="flex flex-wrap items-center gap-2 text-[16px] text-[#3e4552]/60">
                    请输入你的投放诉求，@广告资产内容，/常用指令，或使用
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#33373d]/50 text-[10px] text-[#33373d]/60">
                      🔗
                    </span>
                    上传图片/文件
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#49597a]/5 px-3 py-2 text-[12px] text-[#000000]/95">
                        辅助模式
                      </div>
                      <div className="rounded-lg bg-[#49597a]/5 px-3 py-2 text-[12px] text-[#000000]/95">
                        当前账号
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#33373d]/40 text-[#33373d]/60">
                        🔗
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17224e] text-white">
                        ↑
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="text-left text-[14px] text-[#33373d]/60">
                常用提示词示例
              </div>
              <div className="grid w-full grid-cols-3 gap-4">
                {[
                  ["新建广告", "轻松创建 1~N 个广告项目"],
                  ["新建创意", "快速创建 1~N 个广告创意"],
                  ["新建广告和创意", "搭建 1~N 个完整的广告和创意"],
                  ["批量调整", "批量修改与优化多条广告"],
                  ["启停广告", "快速控制一批广告的开启与暂停"],
                  ["敬请期待", "更多提示词，敬请期待"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-xl bg-[#f2f4fa] px-6 py-4"
                  >
                    <div className="text-[14px] font-semibold text-[#262629]/70">
                      {title}
                    </div>
                    <div className="mt-1 text-[14px] text-[#262629]/70">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
