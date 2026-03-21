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

const SystemsSchoolStaff = async (
  props: PageProps<"/[lang]/systems/school-staff">,
) => {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <SystemsPageEntrance>
      <div className="site-g-p pb-24">
        <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
          <FadeIn>
            <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
              School staff
            </h1>
            <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
              Operations, permissions, and reporting that keep the institution
              running smoothly behind the scenes.
            </p>
            <Button
              href={`/${l}/auth/register`}
              className="mt-8"
              library="daisy"
              variant="primary"
              size="lg"
            >
              Staff workspace
            </Button>
          </FadeIn>
        </section>

        <div className="mx-auto max-w-4xl">
          <FadeIn delay={0.06}>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>Institutional clarity</CardTitle>
                <CardDescription>
                  One platform for the people who keep schools safe and solvent.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                  <li>Directory and permission models that match policy</li>
                  <li>
                    Operational reporting without exporting ten spreadsheets
                  </li>
                  <li>Enterprise hooks for large or multi-campus groups</li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </SystemsPageEntrance>
  );
};

export default SystemsSchoolStaff;
