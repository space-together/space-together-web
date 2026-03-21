"use client";

import {
  CountUp,
  StaggerChildren,
  staggerItemVariants,
} from "../../_components/motion";
import { motion } from "framer-motion";

const stats = [
  { label: "Schools connected", value: 480, suffix: "+" },
  { label: "Active students", value: 62000, suffix: "+" },
  { label: "Teachers onboarded", value: 5200, suffix: "+" },
  { label: "Countries", value: 12, suffix: "" },
] as const;

export default function HomeSocialProof() {
  return (
    <section className="site-g-p border-base-content/10 border-y bg-base-100/60 py-16 backdrop-blur-sm">
      <StaggerChildren className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItemVariants}
            className="text-center"
          >
            <p className="text-primary text-3xl font-semibold tabular-nums md:text-4xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-base-content/70 mt-2 text-sm font-medium">
              {s.label}
            </p>
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}
