import { useId } from "react";

import { cn } from "@/lib/utils";

type DotPatternProps = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  shape?: "circle" | "square" | "cross";
  mode?: "orthogonal" | "staggered";
  color?: string;
  opacity?: number;
  fade?: boolean;
  className?: string;
  [key: string]: unknown;
};

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  shape = "circle",
  mode = "orthogonal",
  color = "#000000",
  opacity = 0.05,
  fade = false,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const maskId = `${id}-mask`;
  const gradientId = `${id}-gradient`;
  const offset = mode === "staggered" ? { x: width / 2, y: height / 2 } : null;
  const size = cr * 2;
  const strokeWidth = Math.max(cr / 2, 0.5);

  const renderShape = (offsetX = 0, offsetY = 0) => {
    if (shape === "square") {
      return (
        <rect
          x={cx - cr + offsetX}
          y={cy - cr + offsetY}
          width={size}
          height={size}
          fill={color}
          fillOpacity={opacity}
        />
      );
    }

    if (shape === "cross") {
      return (
        <g stroke={color} strokeOpacity={opacity} strokeWidth={strokeWidth}>
          <line
            x1={cx - cr + offsetX}
            y1={cy + offsetY}
            x2={cx + cr + offsetX}
            y2={cy + offsetY}
            strokeLinecap="round"
          />
          <line
            x1={cx + offsetX}
            y1={cy - cr + offsetY}
            x2={cx + offsetX}
            y2={cy + cr + offsetY}
            strokeLinecap="round"
          />
        </g>
      );
    }

    return (
      <circle
        id="pattern-circle"
        cx={cx + offsetX}
        cy={cy + offsetY}
        r={cr}
        fill={color}
        fillOpacity={opacity}
      />
    );
  };

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {renderShape(0, 0)}
          {offset ? renderShape(offset.x, offset.y) : null}
        </pattern>
        {fade ? (
          <>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id={maskId}>
              <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
            </mask>
          </>
        ) : null}
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${id})`}
        mask={fade ? `url(#${maskId})` : undefined}
      />
    </svg>
  );
}
