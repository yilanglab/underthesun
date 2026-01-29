"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CollapsibleCodeBlockProps = {
  children: ReactNode;
  collapsedHeight?: number;
  className?: string;
};

export function CollapsibleCodeBlock({
  children,
  collapsedHeight = 220,
  className,
}: CollapsibleCodeBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn("transition-[max-height] duration-200", !expanded && "overflow-hidden")}
        style={expanded ? undefined : { maxHeight: `${collapsedHeight}px` }}
      >
        {children}
      </div>
      {!expanded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      )}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
