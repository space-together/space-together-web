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

const ClassesPage = async (props: PageProps<"/[lang]/features/classes">) => {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Classes and subjects
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Structure learning the way your timetable already works: cohorts,
            subjects, and materials in one place.
          </p>
          <Button
            href={`/${l}/auth/register`}
            className="mt-8"
            library="daisy"
            variant="primary"
            size="lg"
          >
            Get started free
          </Button>
        </FadeIn>
      </section>

      <div className="mx-auto max-w-4xl">
        <FadeIn delay={0.05}>
          <Card className="border-base-300 border">
            <CardHeader>
              <CardTitle>Academic structure</CardTitle>
              <CardDescription>
                Map subjects and levels to national, TVET, Montessori, or custom
                frameworks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Shared spaces per class with scoped membership</li>
                <li>Resources and assignments visible to the right learners</li>
                <li>Hooks for attendance and grading that match policy</li>
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default ClassesPage;
