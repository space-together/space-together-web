"use client";

import { FadeIn } from "../../_components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";

const problems = [
  "Fragmented tools across chat, grading, and admin systems.",
  "Parents lack timely visibility into attendance and progress.",
  "Low connectivity breaks access when schools need it most.",
];

const solutions = [
  "One workspace for every role — aligned to how schools actually run.",
  "Transparent updates, announcements, and academic signals in context.",
  "Offline-first design so learning and operations keep moving.",
];

export default function HomeProblemSolution() {
  return (
    <section className="site-g-p py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
        <FadeIn>
          <Card className="border-error/20 bg-base-100 h-full">
            <CardHeader>
              <div className="text-error mb-2 flex items-center gap-2">
                <AlertTriangleIcon className="size-5" aria-hidden />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  The challenge
                </span>
              </div>
              <CardTitle className="text-2xl">Schools deserve better</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 space-y-3 text-sm md:text-base">
                {problems.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-error shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="border-success/25 bg-base-100 h-full">
            <CardHeader>
              <div className="text-success mb-2 flex items-center gap-2">
                <CheckCircle2Icon className="size-5" aria-hidden />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  The Space-Together way
                </span>
              </div>
              <CardTitle className="text-2xl">Built for continuity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 space-y-3 text-sm md:text-base">
                {solutions.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-success shrink-0">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
