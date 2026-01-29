"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberInput({ label, value, min, step, onChange }: NumberInputProps) {
  return (
    <label className="grid gap-2 text-sm min-w-0">
      <span className="text-muted-foreground truncate">{label}</span>
      <input
        type="number"
        className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        value={value}
        min={min}
        step={step}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (!Number.isNaN(next)) onChange(next);
        }}
      />
    </label>
  );
}

export type DotPatternParams = {
  width: number;
  height: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
  cr: number;
  shape: "circle" | "square" | "cross";
  mode: "orthogonal" | "staggered";
  color: string;
  opacity: number;
  fade: boolean;
};

export const DEFAULT_PARAMS: DotPatternParams = {
  width: 16,
  height: 16,
  x: 0,
  y: 0,
  cx: 1,
  cy: 1,
  cr: 1,
  shape: "circle",
  mode: "orthogonal",
  color: "#000000",
  opacity: 0.05,
  fade: false,
};

type DotPatternParamsPanelProps = {
  isOpen: boolean;
  params: DotPatternParams;
  onParamChange: <K extends keyof DotPatternParams>(
    key: K,
    value: DotPatternParams[K]
  ) => void;
  onReset: () => void;
};

export function DotPatternParamsPanel({
  isOpen,
  params,
  onParamChange,
  onReset,
}: DotPatternParamsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 340, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 220, mass: 0.6 }}
          className="fixed top-6 bottom-6 z-50 w-80 rounded-xl border bg-background shadow-2xl overflow-hidden flex flex-col"
          style={{
            right: "max(24px, calc(50% - 960px + 24px))",
          }}
        >
          <div className="flex items-center justify-between border-b p-4 shrink-0">
            <h3 className="font-semibold">参数调试</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <div className="grid gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Appearance
                </h4>
                <label className="grid gap-2 text-sm">
                  <span className="text-muted-foreground">Shape</span>
                  <select
                    className="h-9 rounded-md border bg-background pl-3 pr-9 text-sm"
                    value={params.shape}
                    onChange={(event) =>
                      onParamChange(
                        "shape",
                        event.target.value as "circle" | "square" | "cross"
                      )
                    }
                  >
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="cross">Cross</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-muted-foreground">Mode</span>
                  <select
                    className="h-9 rounded-md border bg-background pl-3 pr-9 text-sm"
                    value={params.mode}
                    onChange={(event) =>
                      onParamChange(
                        "mode",
                        event.target.value as "orthogonal" | "staggered"
                      )
                    }
                  >
                    <option value="orthogonal">Orthogonal</option>
                    <option value="staggered">Staggered</option>
                  </select>
                </label>
                <label className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Fade Edges</span>
                  <input
                    type="checkbox"
                    checked={params.fade}
                    onChange={(event) => onParamChange("fade", event.target.checked)}
                    className="h-4 w-4"
                  />
                </label>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-3">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Style
                </h4>
                <label className="grid gap-2 text-sm">
                  <span className="text-muted-foreground">Color</span>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      className="h-9 w-12 cursor-pointer rounded-md border bg-background p-1"
                      value={params.color}
                      onChange={(event) => onParamChange("color", event.target.value)}
                    />
                    <input
                      type="text"
                      className="h-9 flex-1 rounded-md border bg-background px-3 text-sm uppercase"
                      value={params.color}
                      onChange={(event) => onParamChange("color", event.target.value)}
                    />
                  </div>
                </label>
                <NumberInput
                  label="Opacity"
                  value={params.opacity}
                  min={0}
                  step={0.01}
                  onChange={(val) => onParamChange("opacity", val)}
                />
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-3">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dimensions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="Width"
                    value={params.width}
                    min={4}
                    step={1}
                    onChange={(val) => onParamChange("width", val)}
                  />
                  <NumberInput
                    label="Height"
                    value={params.height}
                    min={4}
                    step={1}
                    onChange={(val) => onParamChange("height", val)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="CX"
                    value={params.cx}
                    step={0.5}
                    onChange={(val) => onParamChange("cx", val)}
                  />
                  <NumberInput
                    label="CY"
                    value={params.cy}
                    step={0.5}
                    onChange={(val) => onParamChange("cy", val)}
                  />
                </div>
                <NumberInput
                  label="Radius"
                  value={params.cr}
                  min={0.5}
                  step={0.5}
                  onChange={(val) => onParamChange("cr", val)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="X Offset"
                    value={params.x}
                    step={1}
                    onChange={(val) => onParamChange("x", val)}
                  />
                  <NumberInput
                    label="Y Offset"
                    value={params.y}
                    step={1}
                    onChange={(val) => onParamChange("y", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
