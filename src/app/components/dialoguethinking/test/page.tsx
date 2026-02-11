"use client";

import * as React from "react";
import Link from "next/link";

import { ThinkingOutput } from "@/components/dialoguethinking/thinking-output";

const sampleChainText = `先快速澄清目标：这次不是直接给投放计划，而是先补齐可执行投放所需的数据字段，保证后续每一步都能落地，不会出现“策略正确但无法投放”的情况。

第一步，确认推广资产与账户侧绑定关系。需要明确本次线索收集对应的推广目标、广告账户、推广产品 ID、线索组件版本、归因窗口设置，以及是否启用自动扩量。这里如果有任一字段缺失，后续出价策略就无法稳定复现。

第二步，拆解地域定向信息。按“主城九区 + 周边区县”做结构化编码，优先整理可直接导入系统的行政区划 code，避免人工勾选造成漏选。主城区优先级更高，预算分配建议先按 7:3 的探索比例，后续根据线索成本和有效率动态微调。

第三步，补全预算与出价框架。至少要拿到日预算上下限、目标转化动作、起始出价、可接受 CPA 区间，以及是否允许分时投放。没有这些参数，系统很难判断学习期波动是否正常，也无法判断是素材问题还是人群问题。

第四步，形成可执行清单并排定顺序：先补“转化定义”，再补“出价口径”，然后锁定“日预算”，最后补“地域编码映射表”。当这四项齐全后，就可以进入正式搭建阶段，先小流量验证，再逐步放量。`;

export default function DialogueThinkingTestPage() {
  const [playKey, setPlayKey] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [showStreamA, setShowStreamA] = React.useState(true);
  const [showStreamB, setShowStreamB] = React.useState(true);

  const handlePlay = () => {
    setStarted(true);
    setPlayKey((prev) => prev + 1);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mb-8 space-y-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          Agent 对话 · 思考输出测试
        </h1>
        <p className="text-sm text-muted-foreground">
          这是一个用于调试「Agent 思考过程可视化」的实验性页面。
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePlay}
            className="rounded-md border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            {started ? "重播" : "播放"}
          </button>
          <span className="text-xs text-muted-foreground">
            点击后开始一轮思考流式输出演示
          </span>
          <button
            type="button"
            onClick={() => setShowStreamA((v) => !v)}
            className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
              showStreamA
                ? "border-foreground/30 bg-foreground/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            流式A
          </button>
          <button
            type="button"
            onClick={() => setShowStreamB((v) => !v)}
            className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
              showStreamB
                ? "border-foreground/30 bg-foreground/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            流式B
          </button>
        </div>

        {started ? (
          <div className="space-y-8">
            {showStreamA ? (
              <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                样式 A（当前效果）
              </p>
              <ThinkingOutput
                key={`classic-${playKey}`}
                bubbleText="思考中"
                chainText={sampleChainText}
                defaultExpanded={false}
                enableStreaming
                streamVariant="classic"
                streamChunkSize={1}
                streamIntervalMs={20}
                autoCollapseOnComplete
              />
              </div>
            ) : null}

            {showStreamB ? (
              <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                样式 B（按行模糊 → 清晰）
              </p>
              <ThinkingOutput
                key={`line-reveal-${playKey}`}
                bubbleText="思考中"
                chainText={sampleChainText}
                defaultExpanded={false}
                enableStreaming
                streamVariant="line-reveal"
                streamIntervalMs={420}
                autoCollapseOnComplete
              />
              </div>
            ) : null}

            {!showStreamA && !showStreamB ? (
              <div className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
                当前已隐藏所有流式样式，请开启“流式A”或“流式B”。
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
            尚未播放，点击上方“播放”按钮开始。
          </div>
        )}
      </div>
    </div>
  );
}

