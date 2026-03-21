"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon } from "lucide-react";

export function SecurityHero() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="text-primary bg-primary/10 flex size-20 items-center justify-center rounded-full"
        aria-hidden
      >
        <ShieldCheckIcon className="size-10" strokeWidth={1.25} />
      </motion.div>
      <div>
        <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
          Security & privacy
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-2xl text-lg">
          Space-Together is built so schools can collaborate confidently —
          with sensible defaults for access, visibility, and data handling.
        </p>
      </div>
    </div>
  );
}
