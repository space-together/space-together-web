"use client";

import { StaggerChildren, staggerItemVariants } from "../../_components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Building2Icon,
  GraduationCapIcon,
  MessageCircleIcon,
  RadarIcon,
  Share2Icon,
  UsersIcon,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useRef } from "react";

const features = [
  {
    title: "Multi-school",
    description:
      "Operate multiple campuses with clear structure and shared standards.",
    Icon: Building2Icon,
  },
  {
    title: "Role-based access",
    description:
      "Dashboards and permissions tuned for admin, teacher, student, and parent.",
    Icon: UsersIcon,
  },
  {
    title: "Communication",
    description:
      "Chat, announcements, and notifications that stay tied to real classes.",
    Icon: MessageCircleIcon,
  },
  {
    title: "Academic tracking",
    description:
      "Attendance, grades, and reports with a consistent view across stakeholders.",
    Icon: GraduationCapIcon,
  },
  {
    title: "Offline support",
    description:
      "Keep critical workflows available when connectivity is unreliable.",
    Icon: RadarIcon,
  },
  {
    title: "Data portability",
    description:
      "Students carry academic context forward as they grow and move.",
    Icon: Share2Icon,
  },
] as const;

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = (x / r.width - 0.5) * 2;
    const py = (y / r.height - 0.5) * 2;
    el.style.transform = `perspective(1000px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.35s ease-out",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

export default function HomeFeaturesGrid() {
  return (
    <section className="site-g-p py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-base-content text-3xl font-bold tracking-tight md:text-4xl">
          Everything schools need to collaborate
        </h2>
        <p className="text-base-content/70 mt-4 text-lg">
          A focused set of capabilities designed around daily school life — not
          generic productivity noise.
        </p>
      </div>

      <StaggerChildren className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, Icon }) => (
          <motion.div key={title} variants={staggerItemVariants}>
            <TiltCard className="h-full">
              <Card className="bg-base-100 h-full border-base-300">
                <CardHeader>
                  <Icon
                    className="text-primary mb-2 size-9"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base-content/75 text-sm leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}
