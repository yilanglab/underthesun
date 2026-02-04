"use client";

import { X, Lock, Unlock, Play, Pause, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function SliderRow({ label, value, min, max, step, onChange }: SliderRowProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value);
    }
  }, [value, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(Number(e.target.value));
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (!isNaN(localValue)) {
      onChange(localValue);
    } else {
      setLocalValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="relative group w-16 text-right h-6 flex items-center justify-end">
          {!isEditing ? (
            <span
              className="block w-full text-xs font-mono tabular-nums cursor-text border border-transparent hover:border-input rounded px-1 h-6 leading-5 box-border"
              onClick={() => setIsEditing(true)}
            >
              {value}
            </span>
          ) : (
            <input
              autoFocus
              type="number"
              className="w-full text-right text-xs bg-background border border-input rounded px-1 h-6 leading-5 box-border outline-none font-mono tabular-nums [&::-webkit-inner-spin-button]:appearance-none"
              value={localValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => onChange(val)}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
      />
    </div>
  );
}

type LinkedSliderRowProps = {
  label1: string;
  value1: number;
  label2: string;
  value2: number;
  min: number;
  max: number;
  max1?: number;
  max2?: number;
  step: number;
  onChange1: (value: number) => void;
  onChange2: (value: number) => void;
  defaultLocked?: boolean;
};

function LinkedSliderRow({
  label1,
  value1,
  label2,
  value2,
  min,
  max,
  max1,
  max2,
  step,
  onChange1,
  onChange2,
  defaultLocked = true,
}: LinkedSliderRowProps) {
  const [isLocked, setIsLocked] = useState(defaultLocked);

  const handleChange1 = (newVal: number) => {
    onChange1(newVal);
    if (isLocked) {
      onChange2(newVal);
    }
  };

  const handleChange2 = (newVal: number) => {
    onChange2(newVal);
    if (isLocked) {
      onChange1(newVal);
    }
  };

  return (
    <div className="relative grid grid-cols-[1fr_24px_1fr] gap-4 items-start">
      <SliderRow
        label={label1}
        value={value1}
        min={min}
        max={max1 ?? max}
        step={step}
        onChange={handleChange1}
      />
      <div className="flex justify-center pt-8">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 text-muted-foreground hover:text-foreground transition-colors",
            isLocked && "bg-muted text-foreground"
          )}
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? (
            <Lock className="h-3 w-3" />
          ) : (
            <Unlock className="h-3 w-3 opacity-50" />
          )}
        </Button>
      </div>
      <SliderRow
        label={label2}
        value={value2}
        min={min}
        max={max2 ?? max}
        step={step}
        onChange={handleChange2}
      />
    </div>
  );
}

type ButtonGroupProps<T extends string> = {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
};

function ButtonGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: ButtonGroupProps<T>) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex p-1 bg-muted/50 rounded-lg">
        {options.map((option) => (
          <button
            key={option.value}
            className={cn(
              "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              value === option.value
                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
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
  strokeWidth: number;
  mode: "orthogonal" | "staggered";
  color: string;
  opacity: number;
  fade: boolean;
  fadeLevel: "weak" | "medium" | "strong";
  
  // Animation - Effects
  effect: "none" | "glow" | "scan" | "pulse";
  effectPlaying: boolean;
  effectEase: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  effectMaxScale: number;
  effectMaxOpacity: number;
  effectColor: string;
  effectSize: number; // for Scan/Pulse width

  // Multi-color
  multiColor: boolean;
  multiColors: { color: string; percent: number }[];

  // Animation - Hover
  hover: boolean;
  hoverRadius: number;
  hoverTargetScale: number;
  hoverTargetOpacity: number;
  hoverColor: string;
  hoverTrail: boolean;
  hoverTrailDuration: number;
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
  strokeWidth: 1,
  mode: "orthogonal",
  color: "#000000",
  opacity: 0.05,
  fade: false,
  fadeLevel: "weak",
  
  effect: "none",
  effectPlaying: false,
  effectEase: "linear",
  effectMaxScale: 1.8,
  effectMaxOpacity: 0.8,
  effectColor: "#000000", 
  effectSize: 150,

  multiColor: false,
  multiColors: [
    { color: "#FF0000", percent: 50 },
    { color: "#0000FF", percent: 50 },
  ],

  hover: false,
  hoverRadius: 120,
  hoverTargetScale: 1.8,
  hoverTargetOpacity: 0.8,
  hoverColor: "#000000",
  hoverTrail: false,
  hoverTrailDuration: 1.0,
};

type DotPatternParamsPanelProps = {
  isOpen: boolean;
  params: DotPatternParams;
  onParamChange: <K extends keyof DotPatternParams>(
    key: K,
    value: DotPatternParams[K]
  ) => void;
  onReset: () => void;
  // This prop was removed in previous iteration but reintroduced in page usage?
  // Let's check how it's used. In dot-pattern-client.tsx, it's NOT passed!
  // But wait, the previous `StrReplace` tried to ADD `onOpenChange` to props but failed.
  // In `dot-pattern-client.tsx`: 
  // <DotPatternParamsPanel
  //   isOpen={isPanelOpen}
  //   params={params}
  //   onParamChange={handleParamChange}
  //   onReset={handleReset}
  // />
  // It does NOT pass onOpenChange. So I should NOT include it in the props interface or usage here to avoid TS errors.
  // The user requested: "去掉面板右上角的关闭按钮，只用icon控制开关"
  // So I should remove onOpenChange from here.
};

export function DotPatternParamsPanel({
  isOpen,
  params,
  onParamChange,
  onReset,
}: DotPatternParamsPanelProps) {
  const maxCx = Math.max(params.width / 2, 0);
  const maxCy = Math.max(params.height / 2, 0);

  useEffect(() => {
    if (params.cx > maxCx) {
      onParamChange("cx", maxCx);
    }
  }, [params.cx, maxCx, onParamChange]);

  useEffect(() => {
    if (params.cy > maxCy) {
      onParamChange("cy", maxCy);
    }
  }, [params.cy, maxCy, onParamChange]);

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
          <div className="flex items-center justify-between border-b p-4 shrink-0 bg-background/50 backdrop-blur-sm">
            <h3 className="font-semibold text-sm">Parameters</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
              {/* Close button removed as requested */}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Tabs defaultValue="basic" className="h-full flex flex-col">
              <div className="px-5 pt-4">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="animation">Animation</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
                <TabsContent value="basic" className="m-0 space-y-8">
                  {/* Appearance Section */}
                  <div className="space-y-5">
                    <ButtonGroup
                      label="Shape"
                      value={params.shape}
                      options={[
                        { label: "Circle", value: "circle" },
                        { label: "Square", value: "square" },
                        { label: "Cross", value: "cross" },
                      ]}
                      onChange={(val) => onParamChange("shape", val)}
                    />

                    <ButtonGroup
                      label="Mode"
                      value={params.mode}
                      options={[
                        { label: "Orthogonal", value: "orthogonal" },
                        { label: "Staggered", value: "staggered" },
                      ]}
                      onChange={(val) => onParamChange("mode", val)}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Fade Edges
                        </span>
                        <input
                          type="checkbox"
                          checked={params.fade}
                          onChange={(e) => onParamChange("fade", e.target.checked)}
                          className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-offset-background"
                        />
                      </div>
                      {params.fade && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <ButtonGroup
                            label=""
                            value={params.fadeLevel}
                            options={[
                              { label: "Weak", value: "weak" },
                              { label: "Medium", value: "medium" },
                              { label: "Strong", value: "strong" },
                            ]}
                            onChange={(val) => onParamChange("fadeLevel", val)}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-border/50" />

                  {/* Style Section */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Color
                      </span>
                      <div className="flex gap-2">
                        <div className="relative h-8 w-8 rounded-md border overflow-hidden shrink-0">
                          <input
                            type="color"
                            className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                            value={params.color}
                            onChange={(e) => onParamChange("color", e.target.value)}
                          />
                          <div
                            className="h-full w-full"
                            style={{ backgroundColor: params.color }}
                          />
                        </div>
                        <input
                          type="text"
                          className="flex-1 h-8 rounded-md border bg-background px-3 text-xs uppercase font-mono"
                          value={params.color}
                          onChange={(e) => onParamChange("color", e.target.value)}
                        />
                      </div>
                    </div>

                     {/* Multi-color Randomizer */}
                     <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                            Random Colors
                        </span>
                        <input
                            type="checkbox"
                            checked={params.multiColor}
                            onChange={(e) => onParamChange("multiColor", e.target.checked)}
                            className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-offset-background"
                        />
                        </div>
                        
                        {params.multiColor && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-3 pl-2 border-l-2 border-muted"
                        >
                            {params.multiColors.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <div className="relative h-6 w-6 rounded-md border overflow-hidden shrink-0">
                                <input
                                    type="color"
                                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                                    value={item.color}
                                    onChange={(e) => {
                                    const newColors = [...params.multiColors];
                                    newColors[index].color = e.target.value;
                                    onParamChange("multiColors", newColors);
                                    }}
                                />
                                <div
                                    className="h-full w-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                </div>
                                <div className="flex-1">
                                    <Slider
                                        value={[item.percent]}
                                        min={0}
                                        max={100}
                                        step={5}
                                        onValueChange={([val]) => {
                                            const newColors = [...params.multiColors];
                                            newColors[index].percent = val;
                                            onParamChange("multiColors", newColors);
                                        }}
                                        className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
                                    />
                                </div>
                                <span className="text-[10px] w-8 font-mono text-right">{item.percent}%</span>
                                {params.multiColors.length > 2 && (
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 text-muted-foreground hover:text-destructive"
                                    onClick={() => {
                                        const newColors = params.multiColors.filter((_, i) => i !== index);
                                        onParamChange("multiColors", newColors);
                                    }}
                                    >
                                    <Trash2 className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                            ))}
                            {params.multiColors.length < 4 && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-7 text-xs"
                                onClick={() => {
                                    const newColors = [...params.multiColors, { color: "#000000", percent: 20 }];
                                    onParamChange("multiColors", newColors);
                                }}
                            >
                                <Plus className="h-3 w-3 mr-1" /> Add Color
                            </Button>
                            )}
                            <div className="text-[10px] text-muted-foreground text-right">
                                Total: {params.multiColors.reduce((acc, curr) => acc + curr.percent, 0)}%
                            </div>
                        </motion.div>
                        )}
                    </div>

                    <SliderRow
                      label="Opacity"
                      value={params.opacity}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={(val) => onParamChange("opacity", val)}
                    />
                  </div>

                  <div className="h-px bg-border/50" />

                  {/* Dimensions Section */}
                  <div className="space-y-6">
                    <LinkedSliderRow
                      label1="Width"
                      value1={params.width}
                      label2="Height"
                      value2={params.height}
                      min={4}
                      max={100}
                      step={1}
                      onChange1={(val) => onParamChange("width", val)}
                      onChange2={(val) => onParamChange("height", val)}
                    />

                    <LinkedSliderRow
                      label1="CX"
                      value1={params.cx}
                      label2="CY"
                      value2={params.cy}
                      min={0}
                      max={Math.max(maxCx, maxCy)}
                      max1={maxCx}
                      max2={maxCy}
                      step={0.5}
                      onChange1={(val) => onParamChange("cx", val)}
                      onChange2={(val) => onParamChange("cy", val)}
                    />

                    <SliderRow
                      label={params.shape === "circle" ? "Radius" : "Size"}
                      value={params.cr}
                      min={0.5}
                      max={10}
                      step={0.5}
                      onChange={(val) => onParamChange("cr", val)}
                    />

                    {params.shape === "cross" && (
                      <SliderRow
                        label="Stroke Width"
                        value={params.strokeWidth}
                        min={0.5}
                        max={5}
                        step={0.5}
                        onChange={(val) => onParamChange("strokeWidth", val)}
                      />
                    )}

                    <LinkedSliderRow
                      label1="X Offset"
                      value1={params.x}
                      label2="Y Offset"
                      value2={params.y}
                      min={-50}
                      max={50}
                      step={1}
                      onChange1={(val) => onParamChange("x", val)}
                      onChange2={(val) => onParamChange("y", val)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="animation" className="m-0 space-y-8">
                  {/* Effects Section */}
                  <div className="space-y-5">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Global Effects
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Effect Type</span>
                        {params.effect !== "none" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onParamChange("effectPlaying", !params.effectPlaying)}
                            title={params.effectPlaying ? "Pause" : "Play"}
                          >
                            {params.effectPlaying ? (
                              <Pause className="h-3 w-3 fill-current" />
                            ) : (
                              <Play className="h-3 w-3 fill-current" />
                            )}
                          </Button>
                        )}
                      </div>
                      <ButtonGroup
                        label=""
                        value={params.effect}
                        options={[
                          { label: "None", value: "none" },
                          { label: "Glow", value: "glow" },
                          { label: "Scan", value: "scan" },
                          { label: "Pulse", value: "pulse" },
                        ]}
                        onChange={(val) => {
                          onParamChange("effect", val);
                          // Auto-play when selecting an effect
                          if (val !== "none") {
                            onParamChange("effectPlaying", true);
                          }
                        }}
                      />
                    </div>

                    {params.effect !== "none" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-5 pt-2"
                      >
                         {(params.effect === "scan" || params.effect === "pulse") && (
                            <ButtonGroup
                            label="Easing"
                            value={params.effectEase}
                            options={[
                                { label: "Linear", value: "linear" },
                                { label: "In", value: "ease-in" },
                                { label: "Out", value: "ease-out" },
                                { label: "In-Out", value: "ease-in-out" },
                            ]}
                            onChange={(val) => onParamChange("effectEase", val)}
                            />
                         )}

                         <div className="space-y-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            Effect Color
                          </span>
                          <div className="flex gap-2">
                            <div className="relative h-8 w-8 rounded-md border overflow-hidden shrink-0">
                              <input
                                type="color"
                                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                                value={params.effectColor}
                                onChange={(e) => onParamChange("effectColor", e.target.value)}
                              />
                              <div
                                className="h-full w-full"
                                style={{ backgroundColor: params.effectColor }}
                              />
                            </div>
                            <input
                              type="text"
                              className="flex-1 h-8 rounded-md border bg-background px-3 text-xs uppercase font-mono"
                              value={params.effectColor}
                              onChange={(e) => onParamChange("effectColor", e.target.value)}
                            />
                          </div>
                        </div>

                        <SliderRow
                          label="Max Opacity"
                          value={params.effectMaxOpacity}
                          min={0}
                          max={1}
                          step={0.05}
                          onChange={(val) => onParamChange("effectMaxOpacity", val)}
                        />
                         <SliderRow
                          label="Max Scale"
                          value={params.effectMaxScale}
                          min={1}
                          max={3}
                          step={0.1}
                          onChange={(val) => onParamChange("effectMaxScale", val)}
                        />
                         {(params.effect === "scan" || params.effect === "pulse") && (
                            <SliderRow
                            label="Effect Size"
                            value={params.effectSize}
                            min={20}
                            max={500}
                            step={10}
                            onChange={(val) => onParamChange("effectSize", val)}
                          />
                         )}
                      </motion.div>
                    )}
                  </div>

                  <div className="h-px bg-border/50" />

                  {/* Hover Section */}
                  <div className="space-y-5">
                     <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Interactive Hover
                    </h4>

                    <div className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm">
                      <span className="text-muted-foreground">Enable Hover</span>
                      <input
                        type="checkbox"
                        checked={params.hover}
                        onChange={(e) => onParamChange("hover", e.target.checked)}
                        className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-offset-background"
                      />
                    </div>

                     {params.hover && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-5 pt-2"
                      >
                         <div className="space-y-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            Hover Color
                          </span>
                          <div className="flex gap-2">
                            <div className="relative h-8 w-8 rounded-md border overflow-hidden shrink-0">
                              <input
                                type="color"
                                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                                value={params.hoverColor}
                                onChange={(e) => onParamChange("hoverColor", e.target.value)}
                              />
                              <div
                                className="h-full w-full"
                                style={{ backgroundColor: params.hoverColor }}
                              />
                            </div>
                            <input
                              type="text"
                              className="flex-1 h-8 rounded-md border bg-background px-3 text-xs uppercase font-mono"
                              value={params.hoverColor}
                              onChange={(e) => onParamChange("hoverColor", e.target.value)}
                            />
                          </div>
                        </div>

                         <SliderRow
                          label="Radius"
                          value={params.hoverRadius}
                          min={20}
                          max={300}
                          step={10}
                          onChange={(val) => onParamChange("hoverRadius", val)}
                        />
                        <SliderRow
                          label="Target Opacity"
                          value={params.hoverTargetOpacity}
                          min={0}
                          max={1}
                          step={0.05}
                          onChange={(val) => onParamChange("hoverTargetOpacity", val)}
                        />
                         <SliderRow
                          label="Target Scale"
                          value={params.hoverTargetScale}
                          min={1}
                          max={3}
                          step={0.1}
                          onChange={(val) => onParamChange("hoverTargetScale", val)}
                        />

                         <div className="h-px bg-border/50 my-4" />

                         <div className="space-y-3">
                           <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                              Motion Trail
                            </span>
                            <input
                              type="checkbox"
                              checked={params.hoverTrail}
                              onChange={(e) => onParamChange("hoverTrail", e.target.checked)}
                              className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-offset-background"
                            />
                          </div>
                           {params.hoverTrail && (
                             <SliderRow
                              label="Trail Duration"
                              value={params.hoverTrailDuration}
                              min={0.1}
                              max={5}
                              step={0.1}
                              onChange={(val) => onParamChange("hoverTrailDuration", val)}
                            />
                           )}
                         </div>

                      </motion.div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
