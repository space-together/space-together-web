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
import { FadeIn } from "../../_components/motion";

const SolutionsSchools = async (props: PageProps<"/[lang]/solutions/schools">) => {
  const { lang } = await props.params;
  const l = lang as Locale;
  const p = (x: string) => `/${l}${x}`;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Schools
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Connect teachers, students, parents, and staff with one operating
            layer for communication and academics.
          </p>
          <Button
            href={p("/auth/register")}
            className="mt-8"
            library="daisy"
            variant="primary"
            size="lg"
          >
            Get started free
          </Button>
        </FadeIn>
      </section>

      <div className="mx-auto grid max-w-4xl gap-6">
        <FadeIn>
          <Card className="border-base-300 border">
            <CardHeader>
              <CardTitle>What you gain</CardTitle>
              <CardDescription>
                Fewer silos between administration and classrooms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Role dashboards tuned to how schools actually run day to day</li>
                <li>Announcements and chat scoped to classes and cohorts</li>
                <li>Academic signals parents can understand without extra apps</li>
              </ul>
              <MyLink
                href={p("/features/collaboration")}
                className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
              >
                Collaboration features →
              </MyLink>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default SolutionsSchools;
