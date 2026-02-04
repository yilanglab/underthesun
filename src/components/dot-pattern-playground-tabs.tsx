"use client";

import { useMemo } from "react";

import { CodeBlockClient } from "@/components/code-block-client";
import { DotPatternPlayground } from "@/components/dot-pattern-playground";
import { DotPatternParams } from "@/components/dot-pattern-params-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function buildUsageCode(values: DotPatternParams) {
  const {
    width,
    height,
    x,
    y,
    cx,
    cy,
    cr,
    shape,
    strokeWidth,
    mode,
    color,
    opacity,
    fade,
    fadeLevel,
    effect,
    effectPlaying,
    effectMaxScale,
    effectMaxOpacity,
    effectColor,
    effectSize,
    effectEase,
    effectDuration,
    multiColor,
    multiColors,
    hover,
    hoverRadius,
    hoverTargetScale,
    hoverTargetOpacity,
    hoverColor,
    hoverTrail,
    hoverTrailDuration,
  } = values;
  return `import { DotPattern } from "@/registry/ui/dot-pattern";

export function DotPatternDemo() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-white">
      <DotPattern
        width={${width}}
        height={${height}}
        x={${x}}
        y={${y}}
        cx={${cx}}
        cy={${cy}}
        cr={${cr}}${
    shape === "cross" && strokeWidth !== 1
      ? `\n        strokeWidth={${strokeWidth}}`
      : ""
  }
        shape="${shape}"
        mode="${mode}"
        color="${color}"
        opacity={${opacity}}
        fade={${fade}}${
    fade ? `\n        fadeLevel="${fadeLevel}"` : ""
  }${
    effect !== "none" ? `\n        effect="${effect}"` : ""
  }${
    effect !== "none" && effectPlaying ? `\n        effectPlaying={true}` : ""
  }${
    effect !== "none" && effectMaxScale !== 1.8 ? `\n        effectMaxScale={${effectMaxScale}}` : ""
  }${
    effect !== "none" && effectMaxOpacity !== 0.8 ? `\n        effectMaxOpacity={${effectMaxOpacity}}` : ""
  }${
    effect !== "none" && effectColor !== color ? `\n        effectColor="${effectColor}"` : ""
  }${
    (effect === "scan" || effect === "pulse") && effectSize !== 150 ? `\n        effectSize={${effectSize}}` : ""
  }${
    (effect === "scan" || effect === "pulse") && effectEase !== "linear" ? `\n        effectEase="${effectEase}"` : ""
  }${
    effect !== "none" && effectDuration !== 1.0 ? `\n        effectDuration={${effectDuration}}` : ""
  }${
    multiColor ? `\n        multiColor={true}` : ""
  }${
    multiColor && multiColors && multiColors.length > 0
      ? `\n        multiColors={${JSON.stringify(multiColors)}}`
      : ""
  }${
    hover ? `\n        hover={true}` : ""
  }${
    hover && hoverRadius !== 120 ? `\n        hoverRadius={${hoverRadius}}` : ""
  }${
    hover && hoverTargetScale !== 1.8 ? `\n        hoverTargetScale={${hoverTargetScale}}` : ""
  }${
    hover && hoverTargetOpacity !== 0.8 ? `\n        hoverTargetOpacity={${hoverTargetOpacity}}` : ""
  }${
    hover && hoverColor !== color ? `\n        hoverColor="${hoverColor}"` : ""
  }${
    hover && hoverTrail ? `\n        hoverTrail={true}` : ""
  }${
    hover && hoverTrail && hoverTrailDuration !== 1.0 ? `\n        hoverTrailDuration={${hoverTrailDuration}}` : ""
  }
      />
    </div>
  );
}`;
}

type DotPatternPlaygroundTabsProps = {
  params: DotPatternParams;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
};

export function DotPatternPlaygroundTabs({
  params,
  onTogglePanel,
  isPanelOpen,
}: DotPatternPlaygroundTabsProps) {
  const usageCode = useMemo(() => buildUsageCode(params), [params]);

  return (
    <Tabs defaultValue="playground" className="w-full">
      <TabsList>
        <TabsTrigger value="playground">Playground</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="playground">
        <DotPatternPlayground
          params={params}
          onTogglePanel={onTogglePanel}
          isPanelOpen={isPanelOpen}
        />
      </TabsContent>
      <TabsContent value="code">
        <CodeBlockClient code={usageCode} language="tsx" />
      </TabsContent>
    </Tabs>
  );
}
