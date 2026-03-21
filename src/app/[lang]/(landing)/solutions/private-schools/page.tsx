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

const SolutionsPrivateSchools = async (
  props: PageProps<"/[lang]/solutions/private-schools">,
) => {
  const { lang } = await props.params;
  const l = lang as Locale;
  const p = (x: string) => `/${l}${x}`;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Private schools
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Premium experience for families, with operational rigor for leaders
            and teachers behind the scenes.
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
              <CardTitle>High-touch communication</CardTitle>
              <CardDescription>
                Parents expect clarity — without overwhelming channels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Polished, branded touchpoints across roles</li>
                <li>Flexible curriculum mapping for Montessori or bespoke models</li>
                <li>Enterprise options for groups of schools</li>
              </ul>
              <MyLink
                href={p("/enterprise")}
                className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
              >
                Enterprise →
              </MyLink>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default SolutionsPrivateSchools;
