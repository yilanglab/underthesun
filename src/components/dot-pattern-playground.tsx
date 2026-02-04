"use client";

import { Settings2, Figma } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const createPatternPng = (scale: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = params.width * scale;
    canvas.height = params.height * scale;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Draw background (transparent by default, so we don't need to clear or fill)
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    // Calculate dimensions
    const cr = params.cr;
    const cx = params.cx;
    const cy = params.cy;
    const size = cr * 2;
    const strokeWidth = params.strokeWidth || 1;

    ctx.fillStyle = params.color;
    ctx.strokeStyle = params.color;
    ctx.globalAlpha = params.opacity;

    // Helper to render shape
    const renderShape = (offsetX: number, offsetY: number) => {
      ctx.save();
      ctx.translate(offsetX, offsetY);

      if (params.shape === "square") {
        ctx.fillRect(cx - cr, cy - cr, size, size);
      } else if (params.shape === "cross") {
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.beginPath();
        // Vertical line
        ctx.moveTo(cx, cy - cr);
        ctx.lineTo(cx, cy + cr);
        
        // Horizontal line
        ctx.moveTo(cx - cr, cy);
        ctx.lineTo(cx + cr, cy);
        
        ctx.stroke();
      } else {
        // Circle
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // Draw main shape
    renderShape(0, 0);

    // Draw offset shape if staggered
    if (params.mode === "staggered") {
      renderShape(params.width / 2, params.height / 2);
    }

    // Trigger download
    const link = document.createElement("a");
    link.download = `dot-pattern-${params.width}x${params.height}@${scale}x.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

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
        effect={params.effect}
        effectPlaying={params.effectPlaying}
        effectMaxScale={params.effectMaxScale}
        effectMaxOpacity={params.effectMaxOpacity}
        effectColor={params.effectColor}
        effectSize={params.effectSize}
        effectEase={params.effectEase}
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
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
        <div className="rounded-md border bg-background px-4 py-2 text-sm shadow-sm">
          DotPattern Playground
        </div>
      </div>
      
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <TooltipProvider delayDuration={0}>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  >
                    <Figma className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>纹理下载</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-20">
              <DropdownMenuItem onClick={() => createPatternPng(1)}>
                1x
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => createPatternPng(2)}>
                2x
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => createPatternPng(4)}>
                4x
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => createPatternPng(8)}>
                8x
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80 ${
                  isPanelOpen ? "bg-muted text-foreground" : ""
                }`}
                onClick={onTogglePanel}
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>参数调试</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
