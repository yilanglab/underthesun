 "use client";

 import * as React from "react";
import Image from "next/image";
 import { cn } from "@/lib/utils";

function splitTextIntoMeasuredLines(text: string, maxWidth: number): string[] {
  if (!text) return [];
  if (maxWidth <= 0) return [text];
  if (typeof document === "undefined") return [text];

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return [text];

  context.font = '400 14px "PingFang SC","Helvetica Neue",Arial,sans-serif';

  const lines: string[] = [];
  const sourceLines = text.split("\n");

  sourceLines.forEach((sourceLine, index) => {
    if (sourceLine.length === 0) {
      // Preserve explicit blank lines from source text.
      lines.push("");
    } else {
      let currentLine = "";
      for (const char of sourceLine) {
        const candidate = currentLine + char;
        if (context.measureText(candidate).width <= maxWidth || currentLine === "") {
          currentLine = candidate;
        } else {
          lines.push(currentLine);
          currentLine = char;
        }
      }
      if (currentLine) lines.push(currentLine);
    }

    // Preserve a single newline between two non-empty source lines.
    const hasNext = index < sourceLines.length - 1;
    const nextLine = hasNext ? sourceLines[index + 1] : undefined;
    if (hasNext && sourceLine.length > 0 && nextLine && nextLine.length > 0) {
      lines.push("");
    }
  });

  return lines;
}

 export type ThinkingOutputProps = {
  /** 气泡标题，如“思考中” */
  bubbleText?: string;
  /** 图标路径（public 下） */
  bubbleIconSrc?: string;
  /** 完成态图标路径（public 下） */
  completedIconSrc?: string;
  /** 完整思维链文本 */
  chainText: string;
  /** 是否默认展开 */
  defaultExpanded?: boolean;
  /** 是否启用流式输出 */
  enableStreaming?: boolean;
  /** 每次输出字符数 */
  streamChunkSize?: number;
  /** 每次输出间隔（毫秒） */
  streamIntervalMs?: number;
  /** 流式输出样式 */
  streamVariant?: "classic" | "line-reveal";
  /** 思维链容器宽度（默认 720） */
  chainWidth?: number;
  /** 气泡最大宽度（默认 360） */
  bubbleMaxWidth?: number;
  /** 生成完成后是否自动完全收起 */
  autoCollapseOnComplete?: boolean;
  /** 生成完成回调 */
  onComplete?: () => void;
  /** 自定义 className */
  className?: string;
 };

 export function ThinkingOutput({
  bubbleText = "思考中",
  bubbleIconSrc = "/mtl/Artboard%201%20(1).gif",
  completedIconSrc = "/mtl/Frame%202119900916.svg",
  chainText,
  defaultExpanded = false,
  enableStreaming = true,
  streamChunkSize = 2,
  streamIntervalMs = 22,
  streamVariant = "classic",
  chainWidth = 720,
  bubbleMaxWidth = 360,
  autoCollapseOnComplete = true,
  onComplete,
  className,
 }: ThinkingOutputProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [displayedText, setDisplayedText] = React.useState("");
  const [streamCursor, setStreamCursor] = React.useState(0);
  const [completed, setCompleted] = React.useState(!enableStreaming);
  const [lineItems, setLineItems] = React.useState<
    { text: string; blurred: boolean }[]
  >([]);
  const lineCursorRef = React.useRef(0);
  const chainInnerRef = React.useRef<HTMLDivElement | null>(null);
  const chainViewportRef = React.useRef<HTMLDivElement | null>(null);
  const [collapsedTranslateY, setCollapsedTranslateY] = React.useState(0);
  const [lineWrapWidth, setLineWrapWidth] = React.useState(0);
  const measuredLines = React.useMemo(
    () =>
      streamVariant === "line-reveal"
        ? splitTextIntoMeasuredLines(
            chainText,
            lineWrapWidth > 0 ? lineWrapWidth : Math.max(chainWidth - 56, 1)
          )
        : [],
    [chainText, chainWidth, lineWrapWidth, streamVariant]
  );

  React.useLayoutEffect(() => {
    if (!chainViewportRef.current) return;
    const element = chainViewportRef.current;
    const updateWidth = () => setLineWrapWidth(element.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setExpanded(defaultExpanded);
    setCompleted(!enableStreaming);
    setLineItems([]);
    lineCursorRef.current = 0;
    if (!enableStreaming) {
      setDisplayedText(chainText);
      setStreamCursor(chainText.length);
      return;
    }
    setDisplayedText("");
    setStreamCursor(0);
  }, [chainText, defaultExpanded, enableStreaming]);

  React.useEffect(() => {
    if (!enableStreaming || completed) return;
    if (streamVariant === "classic") {
      const timer = window.setInterval(() => {
        setStreamCursor((prev) => {
          const next = Math.min(prev + streamChunkSize, chainText.length);
          setDisplayedText(chainText.slice(0, next));
          if (next >= chainText.length) {
            setCompleted(true);
            onComplete?.();
          }
          return next;
        });
      }, streamIntervalMs);
      return () => window.clearInterval(timer);
    }

    if (!measuredLines.length) return;
    const timer = window.setInterval(() => {
      const currentIndex = lineCursorRef.current;
      if (currentIndex >= measuredLines.length) return;

      const incomingLine = measuredLines[currentIndex];
      const nextLineIndex = currentIndex + 1;
      const done = nextLineIndex >= measuredLines.length;

      setLineItems((prevItems) => {
        const items = [...prevItems];
        if (items.length) {
          items[items.length - 1] = {
            ...items[items.length - 1],
            blurred: false,
          };
        }
        const isBreakOnly = incomingLine.length === 0;
        items.push({ text: incomingLine, blurred: isBreakOnly ? false : !done });
        return items;
      });

      lineCursorRef.current = nextLineIndex;

      if (done) {
        setCompleted(true);
        onComplete?.();
      }
    }, Math.max(streamIntervalMs, 380));
    return () => window.clearInterval(timer);
  }, [
    chainText,
    completed,
    enableStreaming,
    measuredLines,
    onComplete,
    streamVariant,
    streamChunkSize,
    streamIntervalMs,
  ]);

  React.useEffect(() => {
    if (completed && autoCollapseOnComplete) {
      setExpanded(false);
    }
  }, [autoCollapseOnComplete, completed]);

  React.useLayoutEffect(() => {
    if (expanded) {
      setCollapsedTranslateY(0);
      return;
    }
    if (completed) return;
    if (!chainInnerRef.current) return;
    const contentHeight = chainInnerRef.current.scrollHeight;
    const visibleHeight = 78;
    setCollapsedTranslateY(Math.max(contentHeight - visibleHeight, 0));
  }, [chainText, completed, displayedText, expanded, lineItems]);

  const shouldFullyCollapse = completed && autoCollapseOnComplete && !expanded;
  const bubbleLabel = completed ? "思考过程" : bubbleText;
  const arrowTextColor = completed
    ? "text-[rgba(51,55,61,0.58)]"
    : "text-[rgba(38,38,41,0.72)]";

  return (
    <section
      className={cn("space-y-1.5", className)}
      aria-label="thinking output"
    >
       <button
         type="button"
        onClick={() => setExpanded((v) => !v)}
         className={cn(
          "group flex max-w-(--bubble-max-width) items-center gap-1 rounded-[4px_20px_20px_20px] bg-transparent px-5 py-2 text-left transition-colors hover:bg-[rgba(73,90,122,0.03)]"
         )}
        style={
          {
            "--bubble-max-width": `${bubbleMaxWidth}px`,
          } as React.CSSProperties
        }
        aria-expanded={expanded}
       >
        <span className="inline-flex items-center gap-[5px]">
          <span className="inline-flex h-[18px] w-[18px] items-center justify-center">
            <Image
              src={completed ? completedIconSrc : bubbleIconSrc}
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px] object-contain"
            />
          </span>
          {!completed ? (
            <span
              className="relative inline-block text-[16px] leading-6"
              style={{
                fontFamily: '"PingFang SC","Helvetica Neue",Arial,sans-serif',
                textAlign: "justify",
                fontWeight: 400,
                fontStyle: "normal",
                whiteSpace: "pre",
              }}
            >
              <span className="text-[#BABCC1]">
                {bubbleLabel}
                ...
              </span>
              <span
                className="pointer-events-none absolute inset-0 select-none bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0%, transparent 34%, rgba(0,33,99,0.65) 44%, #002163 50%, rgba(0,33,99,0.65) 56%, transparent 66%, transparent 100%)",
                  backgroundSize: "220% 100%",
                  backgroundRepeat: "no-repeat",
                  animation: "thinkingScanPulse 1840ms linear infinite",
                  WebkitBackgroundClip: "text",
                  backgroundPosition: "140% 50%",
                }}
                aria-hidden
              >
                {bubbleLabel}
                ...
              </span>
            </span>
          ) : (
            <span
              className="text-[16px] leading-6 text-[rgba(51,55,61,0.58)]"
              style={{
                fontFamily: '"PingFang SC","Helvetica Neue",Arial,sans-serif',
                textAlign: "justify",
                fontWeight: 400,
                fontStyle: "normal",
              }}
            >
              {bubbleLabel}
            </span>
          )}
        </span>

        <span
          className={cn(
            "ml-auto inline-flex h-5 w-5 items-center justify-center transition-all duration-200",
            arrowTextColor,
            expanded
              ? "rotate-180 opacity-100"
              : completed
                ? "rotate-0 opacity-100"
                : "rotate-0 opacity-0 group-hover:opacity-100"
          )}
          aria-hidden
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={cn(
          "flex w-(--chain-width) items-start gap-4 overflow-hidden pl-7 pr-2 transition-[max-height,opacity] duration-300 ease-out",
          shouldFullyCollapse
            ? "max-h-0 opacity-0"
            : expanded
              ? "max-h-[1000px] opacity-100"
              : "max-h-[78px] opacity-100"
        )}
        style={
          {
            "--chain-width": `${chainWidth}px`,
          } as React.CSSProperties
        }
      >
        <span
          className="shrink-0 bg-[rgba(73,90,122,0.16)]"
          style={{ width: 1, minHeight: 78, alignSelf: "stretch" }}
          aria-hidden
        />
        <div
          ref={chainViewportRef}
          className={cn(
            "relative w-full self-stretch overflow-hidden",
            expanded ? "max-h-[420px]" : shouldFullyCollapse ? "h-0" : "h-[78px]"
          )}
        >
          {!expanded && !completed ? (
            <span
              className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-6"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 100%)",
              }}
              aria-hidden
            />
          ) : null}
          <div
            ref={chainInnerRef}
            className="w-full"
            style={{
              transform: !expanded ? `translateY(-${collapsedTranslateY}px)` : undefined,
              transition: "transform 120ms linear",
            }}
          >
            {streamVariant === "classic" ? (
              <p
                className={cn(
                  "w-full whitespace-pre-wrap wrap-break-word text-justify text-[14px] leading-[22px]",
                  "text-[rgba(38,38,41,0.72)]"
                )}
                style={{ fontFamily: '"PingFang SC","Helvetica Neue",Arial,sans-serif' }}
              >
                {enableStreaming ? displayedText : chainText}
                {enableStreaming && !completed && streamCursor < chainText.length ? (
                  <span className="ml-0.5 inline-block h-[14px] w-px animate-pulse bg-[rgba(38,38,41,0.72)] align-middle" />
                ) : null}
              </p>
            ) : (
              <div>
                {(enableStreaming
                  ? lineItems
                  : splitTextIntoMeasuredLines(
                      chainText,
                      lineWrapWidth > 0 ? lineWrapWidth : Math.max(chainWidth - 56, 1)
                    ).map((text) => ({ text, blurred: false }))
                ).map(
                  (item, idx) => (
                    <p
                      key={idx}
                      className={cn(
                        "w-full whitespace-pre-wrap wrap-break-word text-justify text-[14px] leading-[22px] text-[rgba(38,38,41,0.72)]",
                        "transition-[opacity,filter] duration-250 ease-out",
                        item.blurred
                          ? "opacity-20 filter-[blur(3px)] animate-[lineRevealEnter_260ms_ease-out_forwards]"
                          : "opacity-100 filter-[blur(0px)]"
                      )}
                      style={{ fontFamily: '"PingFang SC","Helvetica Neue",Arial,sans-serif' }}
                    >
                      {item.text || "\u00A0"}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes thinkingScanPulse {
          0% {
            background-position: 140% 50%;
          }
          100% {
            background-position: -140% 50%;
          }
        }

        @keyframes lineRevealEnter {
          0% {
            opacity: 0;
            filter: blur(3px);
          }
          100% {
            opacity: 0.2;
            filter: blur(3px);
          }
        }
      `}</style>
    </section>
  );
}

