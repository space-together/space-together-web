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

const SystemsTeachers = async (
  props: PageProps<"/[lang]/systems/teachers">,
) => {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <SystemsPageEntrance>
      <div className="site-g-p pb-24">
        <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
          <FadeIn>
            <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
              Teachers
            </h1>
            <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
              Run classes, distribute resources, and reach families with context
              — not another generic chat thread.
            </p>
            <Button
              href={`/${l}/auth/register`}
              className="mt-8"
              library="daisy"
              variant="primary"
              size="lg"
            >
              Open teacher workspace
            </Button>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-4xl">
          <FadeIn delay={0.06}>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>Classroom control</CardTitle>
                <CardDescription>
                  Fewer tabs, more signal about who needs help and when.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                  <li>
                    Rosters, subjects, and materials aligned to your timetable
                  </li>
                  <li>Messaging scoped to the right guardians and admins</li>
                  <li>
                    Grading and attendance hooks that match your school policy
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </SystemsPageEntrance>
  );
};

export default SystemsTeachers;
