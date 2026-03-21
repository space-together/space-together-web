import MyLink from "@/components/common/myLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Locale } from "@/i18n";
import { FadeIn } from "../../_components/motion";

const rows = [
  {
    system: "REB",
    focus: "National curriculum alignment & reporting",
    fit: "Primary & secondary schools following national standards",
  },
  {
    system: "TVET",
    focus: "Trades, competencies, and workplace readiness",
    fit: "Technical institutes and vocational pathways",
  },
  {
    system: "Montessori",
    focus: "Mixed-age environments & developmental pacing",
    fit: "Montessori and progressive models",
  },
  {
    system: "Custom",
    focus: "Your taxonomy, outcomes, and assessment language",
    fit: "Networks with bespoke or hybrid frameworks",
  },
] as const;

const EducationSystemsPage = async (props: PageProps<"/[lang]/features/education-systems">) => {
  const { lang } = await props.params;
  const l = lang as Locale;
  const p = (path: string) => `/${l}${path}`;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Education systems
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Map Space-Together to the way your institution teaches — without
            forcing a one-size curriculum engine.
          </p>
        </FadeIn>
      </section>

      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <FadeIn>
          <Card id="reb" className="border-base-300 scroll-mt-28 border">
            <CardHeader>
              <CardTitle>REB & national curricula</CardTitle>
              <CardDescription>
                Structure subjects, levels, and reporting so leadership can see
                progress in a way families and regulators understand.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MyLink href={p("/features/classes")} className="text-primary text-sm font-medium hover:underline">
                See classes & subjects →
              </MyLink>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Card id="tvet" className="border-base-300 scroll-mt-28 border">
            <CardHeader>
              <CardTitle>TVET pathways</CardTitle>
              <CardDescription>
                Support cohorts, trades, and practical milestones alongside
                classroom communication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MyLink href={p("/solutions/tvet")} className="text-primary text-sm font-medium hover:underline">
                TVET solutions →
              </MyLink>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card id="montessori" className="border-base-300 scroll-mt-28 border">
            <CardHeader>
              <CardTitle>Montessori & progressive models</CardTitle>
              <CardDescription>
                Flexible grouping and pacing so guides stay close to learners
                while parents stay informed.
              </CardDescription>
            </CardHeader>
          </Card>
        </FadeIn>

        <FadeIn delay={0.12}>
          <Card id="custom" className="border-base-300 scroll-mt-28 border">
            <CardHeader>
              <CardTitle>Custom systems</CardTitle>
              <CardDescription>
                Bring your outcomes, rubrics, and language — Space-Together
                stays the collaboration layer on top.
              </CardDescription>
            </CardHeader>
          </Card>
        </FadeIn>

        <FadeIn delay={0.14}>
          <Card className="border-base-300 border">
            <CardHeader>
              <CardTitle>At a glance</CardTitle>
              <CardDescription>
                Compare how each model typically shows up in the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 sm:px-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-base-content/10 hover:bg-transparent">
                    <TableHead>System</TableHead>
                    <TableHead className="hidden md:table-cell">Focus</TableHead>
                    <TableHead>Best fit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.system} className="border-base-content/10">
                      <TableCell className="font-medium">{r.system}</TableCell>
                      <TableCell className="text-base-content/75 hidden md:table-cell">
                        {r.focus}
                      </TableCell>
                      <TableCell className="text-base-content/80">
                        <span className="md:hidden">
                          {r.focus} · {r.fit}
                        </span>
                        <span className="hidden md:inline">{r.fit}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default EducationSystemsPage;
