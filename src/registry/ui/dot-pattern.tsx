"use client";

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
  fadeReverse?: boolean;
  effect?: "glow" | "scan" | "pulse" | "none";
  effectPlaying?: boolean;
  effectEase?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  effectMaxScale?: number;
  effectMaxOpacity?: number;
  effectColor?: string;
  effectSize?: number;
  effectDuration?: number;

  multiColor?: boolean;
  multiColors?: { color: string; percent: number }[];

  hover?: boolean;
  hoverRadius?: number;
  hoverTargetScale?: number;
  hoverTargetOpacity?: number;
  hoverColor?: string;
  hoverTrail?: boolean;
  hoverTrailDuration?: number;

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
  fadeReverse = false,
  effect = "none",
  effectPlaying = false,
  effectEase = "linear",
  effectMaxScale = 1.8,
  effectMaxOpacity = 0.8,
  effectColor,
  effectSize = 150,
  effectDuration = 1.0,

  multiColor = false,
  multiColors = [],

  hover = false,
  hoverRadius = 120,
  hoverTargetScale = 1.8,
  hoverTargetOpacity = 0.8,
  hoverColor,
  hoverTrail = false,
  hoverTrailDuration = 1.0,

  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const maskId = `${id}-mask`;
  const gradientId = `${id}-gradient`;
  const offset = mode === "staggered" ? { x: width / 2, y: height / 2 } : null;
  const size = cr * 2;
  const currentStrokeWidth = strokeWidth ?? 1;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: -9999, y: -9999 }); // Use ref for performance and to avoid re-renders
  const trailGridRef = useRef<Float32Array | null>(null);
  const lastMousePos = useRef({ x: -9999, y: -9999 });
  const lastMouseTime = useRef(0);
  const mouseSpeed = useRef(0);
  
  // Use passed effect colors or fallback to base color
  const activeEffectColor = effectColor ?? color;
  const activeHoverColor = hoverColor ?? color;

  // Easing helpers for effect timing
  const easeIn = (t: number) => t * t * t;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const getEasedValue = (t: number) => {
    switch (effectEase) {
      case "ease-in":
        return easeIn(t);
      case "ease-out":
        return easeOut(t);
      case "ease-in-out":
        return easeInOut(t);
      default:
        return t;
    }
  };

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
    let lastTime = startTime;

    const render = (timestamp: number) => {
      if (!containerRef.current) return;
      
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
      const dt = (timestamp - lastTime) / 1000; // delta time in seconds
      lastTime = timestamp;

      // Update canvas size if needed (handling DPI)
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== containerWidth * dpr || canvas.height !== containerHeight * dpr) {
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
        // Reset trail grid on resize
        trailGridRef.current = null;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Pre-calculate common values
      const cols = Math.ceil(containerWidth / width);
      const rows = Math.ceil(containerHeight / height);
      const totalDots = cols * rows;

      // Initialize trail grid if needed
      if (hoverTrail && (!trailGridRef.current || trailGridRef.current.length !== totalDots)) {
        trailGridRef.current = new Float32Array(totalDots);
      } else if (!hoverTrail) {
        trailGridRef.current = null;
      }
      
      // Time-based variables for effects
      const time = effectPlaying ? (timestamp - startTime) / 1000 : 0;
      
      // Scan effect variables
      const scanWidth = effectSize; 
      // Scan cycle is effectDuration
      const scanDistance = containerWidth + scanWidth * 2;
      const scanProgress = (time % effectDuration) / effectDuration;
      const easedScanProgress = getEasedValue(scanProgress);
      const scanX = easedScanProgress * scanDistance - scanWidth;

      // Pulse effect variables
      const pulseMaxRadius = Math.max(containerWidth, containerHeight);
      const pulseProgress = (time % effectDuration) / effectDuration;
      const easedPulseProgress = getEasedValue(pulseProgress);
      const pulseRadius = easedPulseProgress * pulseMaxRadius;
      const pulseWidth = effectSize;

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
            // Improve randomness to avoid wave patterns
            // Use a pseudo-random hash based on coordinates
            const randomSeed = Math.abs(Math.sin(i * 12.9898 + j * 78.233) * 43758.5453); 
            const freq = 1 / effectDuration; 
            const phase = randomSeed * Math.PI * 2;
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

          // Hover effect
          if (hover) {
            // Calculate distance to mouse
            const dist = Math.hypot(dotX - mousePosRef.current.x, dotY - mousePosRef.current.y);
            let instantHover = 0;
            
            if (dist < hoverRadius) {
               // Base hover intensity from distance
               instantHover = Math.pow(1 - dist / hoverRadius, 2);
            }

            if (hoverTrail && trailGridRef.current) {
              const dotIndex = i * cols + j;
              // If trail is enabled, we use the grid to store/decay values
              
              // Decay existing value
              // Linear decay: value - (dt / duration)
              // Or exponential: value * Math.pow(fraction, dt)
              // Let's use linear for predictable duration
              let currentTrail = trailGridRef.current[dotIndex] || 0;
              currentTrail = Math.max(0, currentTrail - dt / hoverTrailDuration);

              // Add new input if mouse is close
              // If we have a trail, the intensity is boosted by mouse speed? 
              // User requirement: "intensity depends on mouse speed"
              // Max speed assumption? Say 2000px/s = 1.0 intensity boost
              if (dist < hoverRadius) {
                 const speedFactor = Math.min(mouseSpeed.current / 1000, 1);
                 // Only add if moving? "mouse static produces no effect"
                 if (speedFactor > 0.01) {
                    // Combine distance and speed
                    const newIntensity = instantHover * speedFactor;
                    // "Fast change, slow restore" -> Jump up quickly
                    currentTrail = Math.max(currentTrail, newIntensity);
                 }
              }

              trailGridRef.current[dotIndex] = currentTrail;
              hoverIntensity = currentTrail;

            } else {
              // Standard hover
              hoverIntensity = instantHover;
            }
          }

          // Combine intensities
          if (effectIntensity > 0.01 || hoverIntensity > 0.01) {
             // Calculate properties for Effect
             const effectScale = 1 + effectIntensity * (effectMaxScale - 1);
             const effectOpacity = opacity + (effectMaxOpacity - opacity) * effectIntensity;
             
             // Calculate properties for Hover
             const hoverScale = 1 + hoverIntensity * (hoverTargetScale - 1);
             const hoverOpacity = opacity + (hoverTargetOpacity - opacity) * hoverIntensity;

             // Combine: simple max for geometry
             const currentScale = Math.max(effectScale, hoverScale);
             const currentAlpha = Math.max(effectOpacity, hoverOpacity);
             
             // Color blending
             let finalColor = activeEffectColor;

             if (multiColor && multiColors && multiColors.length > 0) {
                // Multi-Color Mode: Active dots get random color
                // Use Golden Ratio for better distribution than previous 137.5 (which gave 0.5 steps)
                const dotIndex = i * cols + j;
                const phi = 0.618033988749895; 
                const seed = (dotIndex * phi) % 1; 
                
                let cumulative = 0;
                let found = false;
                for (const item of multiColors) {
                   cumulative += item.percent;
                   if (seed * 100 < cumulative) {
                      finalColor = item.color;
                      found = true;
                      break;
                   }
                }
                // Fallback to last color if rounding errors or incomplete percentages
                if (!found && multiColors.length > 0) {
                    finalColor = multiColors[multiColors.length - 1].color;
                }
             } else {
                 // Single Color Mode
                 // Priority: Hover > Effect
                 // Use intensity comparison to determine which color to show
                 // This allows a strong effect (e.g. scan) to remain visible even if hover is weak
                 // But if hover is strong (near mouse), it overrides effect
                 if (hoverIntensity > effectIntensity) {
                    finalColor = activeHoverColor;
                 } else {
                    finalColor = activeEffectColor;
                 }
             }

             ctx.fillStyle = finalColor;
             
             // Apply alpha
             ctx.globalAlpha = currentAlpha;
            
            // Draw shape
            if (shape === "square") {
              const s = size * currentScale;
              ctx.fillRect(dotX - s/2, dotY - s/2, s, s);
            } else if (shape === "cross") {
              const s = size * currentScale;
              const w = currentStrokeWidth * currentScale; 
              
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
  }, [
    width, height, x, y, cx, cy, cr, shape, strokeWidth, mode, color, opacity, 
    effect, effectPlaying, effectEase, effectMaxScale, effectMaxOpacity, effectSize, effectDuration, activeEffectColor,
    hover, hoverRadius, hoverTargetScale, hoverTargetOpacity, activeHoverColor, hoverTrail, hoverTrailDuration,
    multiColor, multiColors, fade, fadeLevel, fadeReverse
  ]);

  // Update mouse position and calculate speed
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const now = performance.now();
    const dt = now - lastMouseTime.current;
    
    if (dt > 0) {
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const dist = Math.hypot(dx, dy);
      // Speed in px/s
      mouseSpeed.current = (dist / dt) * 1000;
    }

    lastMousePos.current = { x, y };
    lastMouseTime.current = now;
    mousePosRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -9999, y: -9999 };
  };

  const getGradientStops = () => {
    // Helper for reverse fade logic
    // Standard: white 1 -> white 0 (center visible)
    // Reverse: white 0 -> white 1 (center invisible, edges visible)
    // Actually, mask: white = visible, transparent = invisible.
    
    // Standard: Center (0%) is visible (white), Edges (100%) invisible (transparent)
    // Reverse: Center (0%) is invisible (transparent), Edges (100%) visible (white)

    const startColor = fadeReverse ? "transparent" : "white"; // Center
    const endColor = fadeReverse ? "white" : "transparent";   // Edge
    // Wait, SVG radial gradient goes from center (offset 0) to r (offset 100 or whatever)
    // If reverse, we want transparent at center, white at edge.

    switch (fadeLevel) {
      case "strong":
        return (
          <>
            <stop offset="0%" stopColor={fadeReverse ? "white" : "white"} stopOpacity={fadeReverse ? 0 : 1} />
            <stop offset="30%" stopColor={fadeReverse ? "white" : "white"} stopOpacity={fadeReverse ? 0 : 1} />
            <stop offset="70%" stopColor={fadeReverse ? "white" : "white"} stopOpacity={fadeReverse ? 1 : 0} />
            <stop offset="100%" stopColor={fadeReverse ? "white" : "white"} stopOpacity={fadeReverse ? 1 : 0} />
          </>
        );
      case "medium":
        return (
          <>
            <stop offset="0%" stopColor="white" stopOpacity={fadeReverse ? 0 : 1} />
            <stop offset="50%" stopColor="white" stopOpacity={fadeReverse ? 0 : 1} />
            <stop offset="90%" stopColor="white" stopOpacity={fadeReverse ? 1 : 0} />
            <stop offset="100%" stopColor="white" stopOpacity={fadeReverse ? 1 : 0} />
          </>
        );
      case "weak":
      default:
        return (
          <>
            <stop offset="0%" stopColor="white" stopOpacity={fadeReverse ? 0 : 1} />
            <stop offset="70%" stopColor="white" stopOpacity={fadeReverse ? 0 : 1} />
            <stop offset="100%" stopColor="white" stopOpacity={fadeReverse ? 1 : 0} />
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
        <style jsx>{`
          canvas {
            mask-image: radial-gradient(circle farthest-corner at 50% 50%, ${fadeReverse ? 'transparent' : 'black'} 0%, ${fadeReverse ? 'transparent' : 'black'} 70%, ${fadeReverse ? 'black' : 'transparent'} 100%);
            -webkit-mask-image: radial-gradient(circle farthest-corner at 50% 50%, ${fadeReverse ? 'transparent' : 'black'} 0%, ${fadeReverse ? 'transparent' : 'black'} 70%, ${fadeReverse ? 'black' : 'transparent'} 100%);
          }
          ${fadeLevel === 'medium' ? `
          canvas {
            mask-image: radial-gradient(circle farthest-side at 50% 50%, ${fadeReverse ? 'transparent' : 'black'} 0%, ${fadeReverse ? 'transparent' : 'black'} 50%, ${fadeReverse ? 'black' : 'transparent'} 100%);
            -webkit-mask-image: radial-gradient(circle farthest-side at 50% 50%, ${fadeReverse ? 'transparent' : 'black'} 0%, ${fadeReverse ? 'transparent' : 'black'} 50%, ${fadeReverse ? 'black' : 'transparent'} 100%);
          }` : ''}
          ${fadeLevel === 'strong' ? `
          canvas {
            mask-image: radial-gradient(circle closest-side at 50% 50%, ${fadeReverse ? 'transparent' : 'black'} 0%, ${fadeReverse ? 'transparent' : 'black'} 30%, ${fadeReverse ? 'black' : 'transparent'} 100%);
            -webkit-mask-image: radial-gradient(circle closest-side at 50% 50%, ${fadeReverse ? 'transparent' : 'black'} 0%, ${fadeReverse ? 'transparent' : 'black'} 30%, ${fadeReverse ? 'black' : 'transparent'} 100%);
          }` : ''}
        `}</style>
      )}
    </div>
  );
}
