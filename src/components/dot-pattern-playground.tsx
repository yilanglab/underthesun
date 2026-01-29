import { DotPattern } from "@/registry/ui/dot-pattern";

type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberInput({ label, value, min, step, onChange }: NumberInputProps) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type="number"
        className="h-9 rounded-md border bg-background px-3 text-sm"
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

type DotPatternPlaygroundProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
  cr: number;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onXChange: (value: number) => void;
  onYChange: (value: number) => void;
  onCxChange: (value: number) => void;
  onCyChange: (value: number) => void;
  onCrChange: (value: number) => void;
};

export function DotPatternPlayground({
  width,
  height,
  x,
  y,
  cx,
  cy,
  cr,
  onWidthChange,
  onHeightChange,
  onXChange,
  onYChange,
  onCxChange,
  onCyChange,
  onCrChange,
}: DotPatternPlaygroundProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_260px]">
      <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-background">
        <DotPattern
          width={width}
          height={height}
          x={x}
          y={y}
          cx={cx}
          cy={cy}
          cr={cr}
        />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-md border bg-background px-4 py-2 text-sm">
            DotPattern Playground
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
        <div className="text-sm font-medium">参数调试</div>
        <div className="grid gap-3">
          <NumberInput label="width" value={width} min={4} step={1} onChange={onWidthChange} />
          <NumberInput label="height" value={height} min={4} step={1} onChange={onHeightChange} />
          <NumberInput label="x" value={x} step={1} onChange={onXChange} />
          <NumberInput label="y" value={y} step={1} onChange={onYChange} />
          <NumberInput label="cx" value={cx} step={0.5} onChange={onCxChange} />
          <NumberInput label="cy" value={cy} step={0.5} onChange={onCyChange} />
          <NumberInput label="cr" value={cr} min={0.5} step={0.5} onChange={onCrChange} />
        </div>
      </div>
    </div>
  );
}
