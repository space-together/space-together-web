"use client";

import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Locale } from "@/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const tiers = [
  {
    name: "Free",
    monthly: "$0",
    annual: "$0",
    blurb: "Start small: core collaboration for a single school pilot.",
    cta: "Get started",
    href: (l: Locale) => `/${l}/auth/register`,
    highlight: false,
  },
  {
    name: "Pro",
    monthly: "$6",
    annual: "$5",
    suffix: " / learner / mo",
    blurb:
      "Full academic tracking, communication, and offline-first workflows.",
    cta: "Start Pro trial",
    href: (l: Locale) => `/${l}/auth/register`,
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    annual: "Custom",
    blurb: "Multi-campus, SLAs, integrations, and compliance packaging.",
    cta: "Contact sales",
    href: (l: Locale) => `/${l}/enterprise`,
    highlight: false,
  },
] as const;

const comparison = [
  { feature: "Role dashboards", free: "✓", pro: "✓", ent: "✓" },
  { feature: "Chat & announcements", free: "Limited", pro: "✓", ent: "✓" },
  { feature: "Offline mode", free: "—", pro: "✓", ent: "✓" },
  { feature: "Multi-school", free: "—", pro: "Add-on", ent: "✓" },
  { feature: "SSO / directory", free: "—", pro: "—", ent: "✓" },
] as const;

export function PricingPageClient({ lang }: { lang: Locale }) {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
          Pricing
        </h1>
        <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
          Simple tiers that grow with your schools. Toggle billing cadence to
          compare.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm transition-colors",
              annual ? "text-base-content/60" : "text-base-content font-medium",
            )}
          >
            Monthly
          </span>
          <Switch
            id="billing-toggle"
            checked={annual}
            onCheckedChange={setAnnual}
            aria-label="Toggle annual billing"
          />
          <span
            className={cn(
              "text-sm transition-colors",
              annual ? "text-base-content font-medium" : "text-base-content/60",
            )}
          >
            Annual
          </span>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={annual ? "annual" : "monthly"}
          initial={{ opacity: 0, rotateX: -8 }}
          animate={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0, rotateX: 8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformPerspective: 1000 }}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={
                t.highlight
                  ? "border-primary bg-base-100 ring-primary/30 border-2 shadow-md ring-2"
                  : "border-base-300 border"
              }
            >
              <CardHeader>
                <CardTitle className="text-xl">{t.name}</CardTitle>
                <CardDescription>{t.blurb}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base-content text-3xl font-bold tabular-nums">
                  {annual ? t.annual : t.monthly}
                  {"suffix" in t && t.suffix ? (
                    <span className="text-base-content/60 text-base font-normal">
                      {t.suffix}
                    </span>
                  ) : null}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  href={t.href(lang)}
                  library="daisy"
                  variant={t.highlight ? "primary" : "outline"}
                  className="w-full"
                >
                  {t.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>

      <section className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-base-content mb-6 text-center text-2xl font-semibold">
          Compare
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="border-base-content/10 hover:bg-transparent">
              <TableHead>Capability</TableHead>
              <TableHead className="text-center">Free</TableHead>
              <TableHead className="text-center">Pro</TableHead>
              <TableHead className="text-center">Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.map((row) => (
              <TableRow key={row.feature} className="border-base-content/10">
                <TableCell className="font-medium">{row.feature}</TableCell>
                <TableCell className="text-center">{row.free}</TableCell>
                <TableCell className="text-center">{row.pro}</TableCell>
                <TableCell className="text-center">{row.ent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-base-content/60 mt-6 text-center text-xs">
          Figures are illustrative for the marketing site — confirm commercial
          terms with our team.{" "}
          <MyLink
            href={`/${lang}/enterprise`}
            className="text-primary hover:underline"
          >
            Enterprise
          </MyLink>
        </p>
      </section>
    </div>
  );
}
