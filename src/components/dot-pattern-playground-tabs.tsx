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
    mode,
    color,
    opacity,
    fade,
    fadeLevel,
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
        cr={${cr}}
        shape="${shape}"
        mode="${mode}"
        color="${color}"
        opacity={${opacity}}
        fade={${fade}}${
    fade ? `\n        fadeLevel="${fadeLevel}"` : ""
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
