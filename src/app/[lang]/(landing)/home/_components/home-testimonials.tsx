"use client";

import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  {
    quote:
      "We finally have one place for announcements, grades, and parent questions — without losing context.",
    name: "Jeanne U.",
    role: "Head of School",
    school: "Kigali Community School",
  },
  {
    quote:
      "Offline access means our teachers keep teaching even when the network does not cooperate.",
    name: "Samuel T.",
    role: "IT Lead",
    school: "Eastern Province TVET",
  },
  {
    quote: "Parents see what matters, when it matters. The noise is gone.",
    name: "Amina K.",
    role: "Parent Council",
    school: "Green Hills Academy",
  },
  {
    quote:
      "Students know where to go for assignments and class updates — it feels like a real campus online.",
    name: "David M.",
    role: "Teacher",
    school: "Lakeside Secondary",
  },
] as const;

function Track() {
  const items = [...quotes, ...quotes];
  return (
    <div className="landing-marquee-track flex w-max gap-6">
      {items.map((q, i) => (
        <Card
          key={`${q.name}-${i}`}
          className="border-base-300 bg-base-100 w-[min(100vw-3rem,22rem)] shrink-0 shadow-sm"
        >
          <CardContent className="pt-6">
            <p className="text-base-content/90 text-sm leading-relaxed">
              “{q.quote}”
            </p>
            <div className="border-base-content/10 mt-4 border-t pt-4">
              <p className="text-base-content font-medium">{q.name}</p>
              <p className="text-base-content/60 text-xs">
                {q.role} · {q.school}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function HomeTestimonials() {
  return (
    <section
      className="site-g-p border-base-content/10 border-y bg-base-200/30 py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2
          id="testimonials-heading"
          className="text-base-content text-3xl font-bold tracking-tight md:text-4xl"
        >
          Trusted by school communities
        </h2>
        <p className="text-base-content/70 mt-4 text-lg">
          Voices from leaders, teachers, and families using Space-Together every
          day.
        </p>
      </div>

      <div className="flex overflow-hidden">
        <Track />
      </div>
    </section>
  );
}
