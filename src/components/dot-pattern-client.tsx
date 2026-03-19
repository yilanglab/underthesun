"use client";

import { useState } from "react";
import { Maximize2, Copy, Check } from "lucide-react";

import { CodeBlockClient } from "@/components/code-block-client";
import { CollapsibleCodeBlock } from "@/components/collapsible-code-block";
import { DotPatternDesignPrinciples } from "@/components/dot-pattern-design-principles";
import {
  DEFAULT_PARAMS,
  DotPatternParams,
  DotPatternParamsPanel,
} from "@/components/dot-pattern-params-panel";
import { DotPatternPlaygroundTabs } from "@/components/dot-pattern-playground-tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type DotPatternClientProps = {
  dotPatternSource: string;
  utilsSource: string;
  installCli: {
    pnpm: string;
    npm: string;
    yarn: string;
    bun: string;
  };
};

function DesignTabButtons() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyAgentGuide = async () => {
    const url = `${window.location.origin}${window.location.pathname}/agent-guide`;
    const copyText = `${url}\n\n理解学习此组件设计原则`;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
          onClick={handleCopyAgentGuide}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          Agent 指南
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
          onClick={() => {
            const event = new CustomEvent('open-design-presentation');
            window.dispatchEvent(event);
          }}
        >
          <Maximize2 className="h-3.5 w-3.5" />
          全屏演示
        </Button>
      </div>
      
      {showToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-lg border bg-background px-6 py-4 shadow-lg">
            <p className="text-sm font-medium">已复制指南链接，可发送给贵agent学习本设计原则</p>
          </div>
        </div>
      )}
    </>
  );
}

export function DotPatternClient({
  dotPatternSource,
  utilsSource,
  installCli,
}: DotPatternClientProps) {
  const [params, setParams] = useState<DotPatternParams>(DEFAULT_PARAMS);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState("usage");

  const handleParamChange = <K extends keyof DotPatternParams>(
    key: K,
    value: DotPatternParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
  };

  return (
    <div>
      <DotPatternParamsPanel
        isOpen={isPanelOpen}
        params={params}
        onParamChange={handleParamChange}
        onReset={handleReset}
      />

      <Tabs defaultValue="usage" className="space-y-8" onValueChange={(value) => {
        setCurrentTab(value);
        if (value === 'design' && isPanelOpen) {
          setIsPanelOpen(false);
        }
      }}>
        <div className="flex items-center justify-between gap-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="usage">使用 Usage</TabsTrigger>
            <TabsTrigger value="design">设计 Principles</TabsTrigger>
          </TabsList>
          {currentTab === 'design' && <DesignTabButtons />}
        </div>

        <TabsContent value="usage" className="space-y-12">
          <DotPatternPlaygroundTabs
            params={params}
            onTogglePanel={() => setIsPanelOpen((prev) => !prev)}
            isPanelOpen={isPanelOpen}
          />

          <div className="grid gap-8">
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
                      <td className="px-4 py-2">shape</td>
                      <td className="px-4 py-2">enum</td>
                      <td className="px-4 py-2">circle</td>
                      <td className="px-4 py-2">形状：circle / square / cross</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">mode</td>
                      <td className="px-4 py-2">enum</td>
                      <td className="px-4 py-2">orthogonal</td>
                      <td className="px-4 py-2">排列：orthogonal / staggered</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">color</td>
                      <td className="px-4 py-2">string</td>
                      <td className="px-4 py-2">#000000</td>
                      <td className="px-4 py-2">填充颜色</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">opacity</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">0.05</td>
                      <td className="px-4 py-2">透明度 (0-1)</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">fade</td>
                      <td className="px-4 py-2">boolean</td>
                      <td className="px-4 py-2">false</td>
                      <td className="px-4 py-2">是否启用边缘渐隐</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">fadeLevel</td>
                      <td className="px-4 py-2">enum</td>
                      <td className="px-4 py-2">weak</td>
                      <td className="px-4 py-2">渐隐强度：weak / medium / strong</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">effect</td>
                      <td className="px-4 py-2">enum</td>
                      <td className="px-4 py-2">none</td>
                      <td className="px-4 py-2">动效：none / glow / scan / pulse</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">effectPlaying</td>
                      <td className="px-4 py-2">boolean</td>
                      <td className="px-4 py-2">false</td>
                      <td className="px-4 py-2">是否播放效果动画</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">hover</td>
                      <td className="px-4 py-2">boolean</td>
                      <td className="px-4 py-2">false</td>
                      <td className="px-4 py-2">是否启用鼠标交互效果</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">hoverRadius</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">120</td>
                      <td className="px-4 py-2">鼠标交互影响半径</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">hoverTargetScale</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">1.8</td>
                      <td className="px-4 py-2">鼠标悬停时的最大缩放比例</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">hoverTargetOpacity</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">0.8</td>
                      <td className="px-4 py-2">鼠标悬停时的最大不透明度</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">hoverColor</td>
                      <td className="px-4 py-2">string</td>
                      <td className="px-4 py-2">-</td>
                      <td className="px-4 py-2">鼠标悬停时的颜色 (默认同基础颜色)</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">hoverTrail</td>
                      <td className="px-4 py-2">boolean</td>
                      <td className="px-4 py-2">false</td>
                      <td className="px-4 py-2">是否启用鼠标拖尾效果 (强度随速度变化)</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">hoverTrailDuration</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">1.0</td>
                      <td className="px-4 py-2">拖尾效果还原持续时间 (秒)</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">effectMaxScale</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">1.8</td>
                      <td className="px-4 py-2">动效时的最大缩放比例</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">effectMaxOpacity</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">0.8</td>
                      <td className="px-4 py-2">动效时的最大不透明度</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">effectColor</td>
                      <td className="px-4 py-2">string</td>
                      <td className="px-4 py-2">-</td>
                      <td className="px-4 py-2">动效时的颜色 (默认同基础颜色)</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">effectSize</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">150</td>
                      <td className="px-4 py-2">Scan/Pulse 动效的宽度</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">effectEase</td>
                      <td className="px-4 py-2">enum</td>
                      <td className="px-4 py-2">linear</td>
                      <td className="px-4 py-2">动效缓动函数：linear / ease-in / ease-out / ease-in-out</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">effectDuration</td>
                      <td className="px-4 py-2">number</td>
                      <td className="px-4 py-2">1.0</td>
                      <td className="px-4 py-2">动效持续时间（秒）</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">multiColor</td>
                      <td className="px-4 py-2">boolean</td>
                      <td className="px-4 py-2">false</td>
                      <td className="px-4 py-2">是否启用随机多彩模式</td>
                    </tr>
                     <tr className="border-t">
                      <td className="px-4 py-2">multiColors</td>
                      <td className="px-4 py-2">array</td>
                      <td className="px-4 py-2">[]</td>
                      <td className="px-4 py-2">随机色彩配置数组，如 {"[{ color: '#FF0000', percent: 50 }, ...]"}</td>
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
        </TabsContent>

        <TabsContent value="design">
          <DotPatternDesignPrinciples />
        </TabsContent>
      </Tabs>
    </div>
  );
}
