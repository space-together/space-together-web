"use client";

import { FadeIn } from "../../_components/motion";
import { motion } from "framer-motion";
import { Globe2Icon, LanguagesIcon, WifiOffIcon } from "lucide-react";

const highlights = [
  {
    title: "Offline-first",
    body: "Critical workflows stay usable when bandwidth is thin or unstable.",
    Icon: WifiOffIcon,
  },
  {
    title: "Multilingual-ready",
    body: "Communicate in the languages your community actually speaks.",
    Icon: LanguagesIcon,
  },
  {
    title: "REB-aligned paths",
    body: "Structure academics around national expectations without losing flexibility.",
    Icon: Globe2Icon,
  },
] as const;

export default function HomeAfricaFirst() {
  return (
    <section className="site-g-p relative py-20 md:py-28">
      <div className="from-primary/15 via-secondary/10 to-base-100 pointer-events-none absolute inset-0 -z-10 bg-linear-to-br opacity-90" />
      <div className="border-base-content/5 absolute inset-2 -z-10 rounded-[var(--radius-box)] border bg-[radial-gradient(ellipse_at_30%_20%,var(--color-primary)_0%,transparent_55%),radial-gradient(ellipse_at_70%_80%,var(--color-secondary)_0%,transparent_50%)] opacity-40" />

      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 className="text-base-content text-3xl font-bold tracking-tight md:text-4xl">
          Africa-first, globally capable
        </h2>
        <p className="text-base-content/75 mt-4 text-lg">
          Space-Together is designed for schools where connectivity, language,
          and national curricula all need to work together — not compete.
        </p>
      </FadeIn>

      <motion.div
        className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {highlights.map(({ title, body, Icon }) => (
          <div
            key={title}
            className="border-base-300 bg-base-100/80 rounded-[var(--radius-box)] border p-6 shadow-sm backdrop-blur-sm"
          >
            <Icon
              className="text-primary mb-3 size-8"
              strokeWidth={1.5}
              aria-hidden
            />
            <h3 className="text-base-content text-lg font-semibold">{title}</h3>
            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
              {body}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
