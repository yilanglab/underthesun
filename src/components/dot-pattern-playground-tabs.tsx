"use client";

import { useMemo, useState } from "react";

import { CodeBlockClient } from "@/components/code-block-client";
import { DotPatternPlayground } from "@/components/dot-pattern-playground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function buildUsageCode(values: {
  width: number;
  height: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
  cr: number;
}) {
  const { width, height, x, y, cx, cy, cr } = values;
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
      />
    </div>
  );
}`;
}

export function DotPatternPlaygroundTabs() {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cx, setCx] = useState(1);
  const [cy, setCy] = useState(1);
  const [cr, setCr] = useState(1);

  const usageCode = useMemo(
    () => buildUsageCode({ width, height, x, y, cx, cy, cr }),
    [width, height, x, y, cx, cy, cr]
  );

  return (
    <Tabs defaultValue="playground" className="w-full">
      <TabsList>
        <TabsTrigger value="playground">Playground</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="playground">
        <DotPatternPlayground
          width={width}
          height={height}
          x={x}
          y={y}
          cx={cx}
          cy={cy}
          cr={cr}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          onXChange={setX}
          onYChange={setY}
          onCxChange={setCx}
          onCyChange={setCy}
          onCrChange={setCr}
        />
      </TabsContent>
      <TabsContent value="code">
        <CodeBlockClient code={usageCode} language="tsx" />
      </TabsContent>
    </Tabs>
  );
}
