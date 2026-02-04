import { useId, useRef, useEffect, useState } from "react";

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
  strokeWidth?: number;
  mode?: "orthogonal" | "staggered";
  color?: string;
  opacity?: number;
  fade?: boolean;
  fadeLevel?: "weak" | "medium" | "strong";
  effect?: "glow" | "scan" | "pulse" | "none";
  effectPlaying?: boolean;
  hover?: boolean;
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
  strokeWidth,
  mode = "orthogonal",
  color = "#000000",
  opacity = 0.05,
  fade = false,
  fadeLevel = "weak",
  effect = "none",
  effectPlaying = false,
  hover = false,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const maskId = `${id}-mask`;
  const gradientId = `${id}-gradient`;
  const offset = mode === "staggered" ? { x: width / 2, y: height / 2 } : null;
  const size = cr * 2;
  const currentStrokeWidth = strokeWidth ?? 1;

  // Canvas ref for effects
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    // Only run canvas logic if effects are enabled or hover is on
    if (effect === "none" && !hover) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (timestamp: number) => {
      if (!containerRef.current) return;
      
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
      
      // Update canvas size if needed (handling DPI)
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== containerWidth * dpr || canvas.height !== containerHeight * dpr) {
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Pre-calculate common values
      const cols = Math.ceil(containerWidth / width);
      const rows = Math.ceil(containerHeight / height);
      
      // Time-based variables for effects
      const time = effectPlaying ? (timestamp - startTime) / 1000 : 0;
      
      // Scan effect variables
      const scanSpeed = 200; // px per second
      const scanWidth = 150; // width of scan band
      const scanX = (time * scanSpeed) % (containerWidth + scanWidth * 2) - scanWidth;

      // Pulse effect variables
      const pulseSpeed = 100; // px per second
      const pulseMaxRadius = Math.max(containerWidth, containerHeight);
      const pulseRadius = (time * pulseSpeed) % pulseMaxRadius;
      const pulseWidth = 200;

      // Draw dots
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let dotX = j * width + cx + x;
          let dotY = i * height + cy + y;

          // Apply staggered offset
          if (mode === "staggered" && i % 2 === 1) {
            dotX += width / 2;
          }

          // Skip if outside container
          if (dotX < -width || dotX > containerWidth + width || dotY < -height || dotY > containerHeight + height) continue;

          // Calculate effect intensity (0 to 1)
          let effectIntensity = 0;
          let hoverIntensity = 0;

          // Glow effect: Random-looking pulse for each dot
          if (effect === "glow") {
            // Deterministic "random" based on position
            const seed = (i * cols + j) * 123.45;
            const freq = 0.5 + (seed % 1); // 0.5 to 1.5 Hz
            const phase = seed % (Math.PI * 2);
            // Oscillate between 0 and 1
            effectIntensity = (Math.sin(time * Math.PI * 2 * freq + phase) + 1) / 2;
          }

          // Scan effect: Vertical band moving right
          if (effect === "scan") {
            const dist = Math.abs(dotX - scanX);
            if (dist < scanWidth) {
              // Smooth falloff from center of scan band
              effectIntensity = Math.pow(1 - dist / scanWidth, 2);
            }
          }

          // Pulse effect: Ring expanding from center
          if (effect === "pulse") {
            const centerX = containerWidth / 2;
            const centerY = containerHeight / 2;
            const dist = Math.hypot(dotX - centerX, dotY - centerY);
            const distFromRing = Math.abs(dist - pulseRadius);
            
            if (distFromRing < pulseWidth) {
              effectIntensity = Math.pow(1 - distFromRing / pulseWidth, 2);
            }
          }

          // Hover effect: Radius around mouse
          if (hover) {
            const dist = Math.hypot(dotX - mousePos.x, dotY - mousePos.y);
            const hoverRadius = 120;
            if (dist < hoverRadius) {
              hoverIntensity = Math.pow(1 - dist / hoverRadius, 2);
            }
          }

          // Combine intensities
          // We only render the dot if there's some intensity (overlay approach)
          // OR if we want to redraw base dots. 
          // Strategy: The SVG pattern draws the base (faint) dots.
          // Canvas draws the "active" state on top (brighter/larger/colored).
          
          const totalIntensity = Math.min(effectIntensity + hoverIntensity, 1);
          
          if (totalIntensity > 0.01) {
            const currentScale = 1 + totalIntensity * 0.8; // Max 1.8x scale
            const currentAlpha = opacity + (1 - opacity) * totalIntensity * 0.8; // Boost opacity significantly
            
            ctx.fillStyle = color;
            ctx.globalAlpha = currentAlpha;
            
            // Draw shape
            if (shape === "square") {
              const s = size * currentScale;
              ctx.fillRect(dotX - s/2, dotY - s/2, s, s);
            } else if (shape === "cross") {
              const s = size * currentScale;
              const w = currentStrokeWidth * currentScale; // Scale stroke too? Maybe just size. Let's scale stroke slightly
              
              ctx.beginPath();
              // Vertical
              ctx.rect(dotX - w/2, dotY - s/2, w, s);
              // Horizontal
              ctx.rect(dotX - s/2, dotY - w/2, s, w);
              ctx.fill();
            } else {
              // Circle
              ctx.beginPath();
              ctx.arc(dotX, dotY, cr * currentScale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      ctx.restore();
      if (effectPlaying || hover) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (effectPlaying || hover) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      // Draw once if paused but effect is enabled (to show static state) or hovered
      render(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, x, y, cx, cy, cr, shape, strokeWidth, mode, color, opacity, effect, effectPlaying, hover, mousePos]);

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -9999, y: -9999 });
  };

  const getGradientStops = () => {
    switch (fadeLevel) {
      case "strong":
        return (
          <>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0" />
          </>
        );
      case "medium":
        return (
          <>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="90%" stopColor="white" stopOpacity="0" />
          </>
        );
      case "weak":
      default:
        return (
          <>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </>
        );
    }
  };

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
        <g stroke={color} strokeOpacity={opacity}>
          <line
            x1={cx - cr + offsetX}
            y1={cy + offsetY}
            x2={cx + cr + offsetX}
            y2={cy + offsetY}
            strokeLinecap="round"
            strokeWidth={currentStrokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={cx + offsetX}
            y1={cy - cr + offsetY}
            x2={cx + offsetX}
            y2={cy + cr + offsetY}
            strokeLinecap="round"
            strokeWidth={currentStrokeWidth}
            vectorEffect="non-scaling-stroke"
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
    <div 
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
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
                {getGradientStops()}
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
      {/* Canvas for effects overlay */}
      {(effect !== "none" || hover) && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ mask: fade ? `radial-gradient(circle at center, black 0%, black 30%, transparent 70%)` : undefined }} // Simple CSS mask for canvas fade approximation if needed, or rely on SVG mask covering it? 
          // SVG mask is on the rect fill, not the whole div. The canvas sits on top.
          // To match fade on canvas, we'd need to clear canvas pixels or use CSS mask.
          // For now let's apply a CSS mask similar to the SVG one if fade is true.
        />
      )}
      {fade && (effect !== "none" || hover) && (
        // Apply CSS mask to container div if fade is on? No, that would fade bg too.
        // We need to fade the canvas.
        <style jsx>{`
          canvas {
            mask-image: radial-gradient(circle at 50% 50%, black 0%, black ${fadeLevel === 'strong' ? '30%' : fadeLevel === 'medium' ? '50%' : '70%'}, transparent ${fadeLevel === 'strong' ? '70%' : fadeLevel === 'medium' ? '90%' : '100%'});
            -webkit-mask-image: radial-gradient(circle at 50% 50%, black 0%, black ${fadeLevel === 'strong' ? '30%' : fadeLevel === 'medium' ? '50%' : '70%'}, transparent ${fadeLevel === 'strong' ? '70%' : fadeLevel === 'medium' ? '90%' : '100%'});
          }
        `}</style>
      )}
    </div>
  );
}
