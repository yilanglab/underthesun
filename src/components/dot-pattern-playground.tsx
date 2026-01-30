"use client";

import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DotPattern } from "@/registry/ui/dot-pattern";
import { DotPatternParams } from "@/components/dot-pattern-params-panel";

type DotPatternPlaygroundProps = {
  params: DotPatternParams;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
};

export function DotPatternPlayground({
  params,
  onTogglePanel,
  isPanelOpen,
}: DotPatternPlaygroundProps) {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-lg border bg-background">
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
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="rounded-md border bg-background px-4 py-2 text-sm shadow-sm">
          DotPattern Playground
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-4 top-4 z-20 h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80 ${
          isPanelOpen ? "bg-muted text-foreground" : ""
        }`}
        onClick={onTogglePanel}
      >
        <Settings2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
