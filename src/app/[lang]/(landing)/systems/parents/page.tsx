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

const SystemsParents = async (props: PageProps<"/[lang]/systems/parents">) => {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <SystemsPageEntrance>
      <div className="site-g-p pb-24">
        <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
          <FadeIn>
            <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
              Parents
            </h1>
            <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
              Stay close to attendance, grades, and school news with clarity,
              not a flood of disconnected messages.
            </p>
            <Button
              href={`/${l}/auth/register`}
              className="mt-8"
              library="daisy"
              variant="primary"
              size="lg"
            >
              Connect to your school
            </Button>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-4xl">
          <FadeIn delay={0.06}>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>Peace of mind</CardTitle>
                <CardDescription>
                  The right level of detail, at the right time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                  <li>Child-specific views without exposing other learners</li>
                  <li>Official announcements alongside class updates</li>
                  <li>
                    Simple paths to message teachers when it is appropriate
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

export default SystemsParents;
