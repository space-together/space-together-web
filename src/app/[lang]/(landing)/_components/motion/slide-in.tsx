"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type SlideInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  from?: "left" | "right" | "bottom" | "top";
  distance?: number;
};

const axis = {
  left: { x: -48, y: 0 },
  right: { x: 48, y: 0 },
  bottom: { x: 0, y: 48 },
  top: { x: 0, y: -48 },
} as const;

export function SlideIn({
  className,
  delay = 0,
  duration = 0.55,
  from = "bottom",
  distance,
  children,
  ...props
}: SlideInProps) {
  const d = distance ?? (from === "left" || from === "right" ? 48 : 40);
  const base = axis[from];
  const initial = {
    opacity: 0,
    x: base.x ? (base.x > 0 ? d : -d) : 0,
    y: base.y ? (base.y > 0 ? d : -d) : 0,
  };
  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
