"use client";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import { motion } from "framer-motion";

interface HomeFinalCtaProps {
  lang?: Locale;
}

export default function HomeFinalCta({ lang }: HomeFinalCtaProps) {
  const base = lang ? `/${lang}` : "";

  return (
    <section className="site-g-p pb-24">
      <motion.div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-box)] bg-linear-to-br from-primary to-secondary px-6 py-16 text-center text-primary-content shadow-lg md:px-16 md:py-20"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary-content)_0%,transparent_50%)] opacity-10" />
        <h2 className="relative text-3xl font-bold tracking-tight md:text-4xl">
          Ready to bring your school together?
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-base opacity-90 md:text-lg">
          Start free, or talk with us about rollout, training, and enterprise
          needs.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={`${base}/enterprise`}
            variant="outline"
            library="shadcn"
            size="lg"
            className="border-primary-content/50 bg-transparent text-primary-content hover:bg-primary-content/15"
          >
            Request a demo
          </Button>
          <Button
            href={`${base}/auth/register`}
            library="shadcn"
            size="lg"
            variant="secondary"
            className="bg-primary-content text-primary hover:bg-primary-content/90"
          >
            Get started free
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
