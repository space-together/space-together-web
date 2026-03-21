"use client";

import { FadeIn } from "../../_components/motion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Set up your school",
    body: "Configure structure, roles, and academic programs in one place.",
  },
  {
    title: "Invite your community",
    body: "Onboard teachers, students, parents, and staff with clear access.",
  },
  {
    title: "Collaborate & track",
    body: "Run day-to-day learning with communication and academic signals together.",
  },
] as const;

export default function HomeHowItWorks() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(wrapRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={wrapRef}
      className="site-g-p bg-base-200/40 py-20 md:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
        <h2
          id="how-it-works-heading"
          className="text-base-content text-3xl font-bold tracking-tight md:text-4xl"
        >
          How it works
        </h2>
        <p className="text-base-content/70 mt-4 text-lg">
          From first setup to daily collaboration — a simple path for every
          school.
        </p>
      </FadeIn>

      <div className="relative mx-auto max-w-5xl">
        <svg
          className="text-primary/40 pointer-events-none absolute top-10 right-0 left-0 hidden h-24 w-full md:block"
          viewBox="0 0 900 40"
          fill="none"
          aria-hidden
        >
          <path
            d="M 60 28 C 200 8, 300 8, 450 20 S 700 32, 840 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="520"
            strokeDashoffset={lineInView ? 0 : 520}
            style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
          />
        </svg>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="text-center"
            >
              <div className="bg-primary text-primary-content border-base-100 mx-auto mb-4 flex size-12 items-center justify-center rounded-full border-2 text-lg font-bold shadow-sm">
                {i + 1}
              </div>
              <h3 className="text-base-content text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
