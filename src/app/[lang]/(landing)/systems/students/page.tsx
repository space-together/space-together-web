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
import { SystemsPageEntrance } from "../systems-page-shell";

const SystemsStudents = async (
  props: PageProps<"/[lang]/systems/students">,
) => {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <SystemsPageEntrance>
      <div className="site-g-p pb-24">
        <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
          <FadeIn>
            <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
              Students
            </h1>
            <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
              Assignments, progress, and class context in one student-first
              workspace — including when you are offline.
            </p>
            <Button
              href={`/${l}/auth/register`}
              className="mt-8"
              library="daisy"
              variant="primary"
              size="lg"
            >
              Join your school
            </Button>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-4xl">
          <FadeIn delay={0.06}>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>Dashboard highlights</CardTitle>
                <CardDescription>
                  Everything a learner needs without hunting across apps.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                  <li>Upcoming work with clear due dates and attachments</li>
                  <li>Class and school announcements in one feed</li>
                  <li>Progress snapshots you can share at home</li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </SystemsPageEntrance>
  );
};

export default SystemsStudents;
