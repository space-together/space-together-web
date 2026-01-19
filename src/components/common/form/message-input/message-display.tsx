"use client";

import { cn } from "@/lib/utils";

interface MessageDisplayProps {
  content: string;
  className?: string;
}

export default function MessageDisplay({
  content,
  className,
}: MessageDisplayProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none break-words dark:prose-invert",
        "text-foreground leading-relaxed",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_a]:link-primary [&_a]:underline hover:[&_a]:text-primary",
        "[&_span[contenteditable='false']]:cursor-pointer",
        "overflow-y-auto ",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
