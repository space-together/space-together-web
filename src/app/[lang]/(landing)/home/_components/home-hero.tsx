"use client";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HomeHeroCanvasRoot = dynamic(
  () => import("./home-hero-canvas").then((m) => m.HomeHeroCanvasRoot),
  { ssr: false },
);

interface HomeHeroProps {
  auth?: AuthContext | null;
  lang?: Locale;
}

const HomeHero = ({ lang }: HomeHeroProps) => {
  const base = lang ? `/${lang}` : "";

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-12 text-center md:px-8 md:pt-16">
      <div className="from-base-200/80 via-base-100/40 to-base-100/10 absolute inset-0 -z-20 bg-linear-to-b" />
      <HomeHeroCanvasRoot />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.h1
          className="text-base-content mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          Where Schools Come Together
        </motion.h1>

        <motion.p
          className="text-base-content/80 mx-auto mb-10 max-w-2xl text-lg md:text-xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        >
          One platform for students, teachers, parents, and administrators —
          built for real classrooms, real connectivity, and real academic
          continuity.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
        >
          <Button
            href={`${base}/auth/register`}
            variant="primary"
            library="daisy"
            size="lg"
          >
            Get started free
          </Button>
          <Button
            href={`${base}/resources/why-space-together`}
            library="daisy"
            size="lg"
            variant="outline"
          >
            See how it works
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
