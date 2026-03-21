"use client";

import MyImage from "@/components/common/myImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  {
    id: "schools",
    label: "Schools",
    bullets: [
      "Unified operations across staff, classes, and communication.",
      "Visibility into engagement without tool sprawl.",
      "Scales from single schools to multi-campus networks.",
    ],
    image: "/images/web/online-studying.jpg",
    alt: "Students collaborating online",
  },
  {
    id: "teachers",
    label: "Teachers",
    bullets: [
      "Classroom workflows with assignments and learner context.",
      "Reach families with timely, relevant updates.",
      "Less admin friction, more time for teaching.",
    ],
    image: "/images/web/online-studying.jpg",
    alt: "Teaching and learning",
  },
  {
    id: "students",
    label: "Students",
    bullets: [
      "Clear view of work, progress, and school announcements.",
      "Collaborate with peers in a safe, school-scoped space.",
      "Stay productive even when connectivity dips.",
    ],
    image: "/images/web/online-studying.jpg",
    alt: "Student learning",
  },
  {
    id: "parents",
    label: "Parents",
    bullets: [
      "Stay aligned with attendance, grades, and school news.",
      "Fewer fragmented channels — everything in context.",
      "Support learners with timely, trustworthy information.",
    ],
    image: "/images/web/online-studying.jpg",
    alt: "Parent engagement",
  },
] as const;

export default function HomeUseCases() {
  const [active, setActive] = useState<string>(tabs[0].id);

  return (
    <section
      className="site-g-p py-20 md:py-28"
      aria-labelledby="use-cases-heading"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2
          id="use-cases-heading"
          className="text-base-content text-3xl font-bold tracking-tight md:text-4xl"
        >
          Built for every role
        </h2>
        <p className="text-base-content/70 mt-4 text-lg">
          Switch perspectives to see how Space-Together supports your community.
        </p>
      </div>

      <Tabs
        value={active}
        onValueChange={setActive}
        className="mx-auto max-w-5xl"
      >
        <TabsList
          variant="boxed"
          className="bg-base-200/80 border-base-content/10 mx-auto mb-10 flex w-full max-w-xl flex-wrap justify-center border p-1"
        >
          {tabs.map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              library="daisy"
              className="min-w-[6rem] flex-1"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((t) => (
          <TabsContent key={t.id} value={t.id} className="outline-none">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              <div className="border-base-300 bg-base-100 overflow-hidden rounded-[var(--radius-box)] border shadow-sm">
                <MyImage
                  src={t.image}
                  alt={t.alt}
                  className="aspect-[4/3] w-full"
                  classname="object-cover"
                />
              </div>
              <ul className="text-base-content/85 space-y-4 text-left text-base">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-primary mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
