import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { FadeIn } from "../_components/motion";

const sections = [
  {
    id: "school-members",
    title: "School members",
    description:
      "Roles, permissions, and directory structure that mirror your real organization.",
    href: "/features/school-members",
  },
  {
    id: "classes",
    title: "Classes & subjects",
    description:
      "Timetables, cohorts, and subject matter grouped the way teachers teach.",
    href: "/features/classes",
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description:
      "Communication that stays tied to classes, assignments, and school context.",
    href: "/features/collaboration",
  },
  {
    id: "education-systems",
    title: "Education systems",
    description:
      "REB, TVET, Montessori, or custom — map curriculum expectations without rigidity.",
    href: "/features/education-systems",
  },
  {
    id: "security",
    title: "Security & privacy",
    description:
      "Protection for student data with clear, school-friendly privacy posture.",
    href: "/features/security",
  },
] as const;

const FeaturesOverviewPage = async (props: PageProps<"/[lang]/features">) => {
  const { lang } = await props.params;
  const l = lang as Locale;
  const prefix = `/${l}`;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-16 text-center md:py-24">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Features
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Explore how Space-Together connects academic structure, people, and
            communication — without fragmenting your school across apps.
          </p>
          <Button
            href={`${prefix}/auth/register`}
            className="mt-8"
            library="daisy"
            variant="primary"
            size="lg"
          >
            Get started free
          </Button>
        </FadeIn>
      </section>

      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        {sections.map((s, i) => (
          <FadeIn key={s.id} delay={i * 0.05}>
            <Card
              id={s.id}
              className="border-base-300 bg-base-100 scroll-mt-28 border"
            >
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">{s.title}</CardTitle>
                <CardDescription className="text-base">
                  {s.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MyLink
                  href={`${prefix}${s.href}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Learn more →
                </MyLink>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default FeaturesOverviewPage;
