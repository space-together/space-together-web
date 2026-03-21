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

const SolutionsOfflineSchools = async (
  props: PageProps<"/[lang]/solutions/offline-schools">,
) => {
  const { lang } = await props.params;
  const l = lang as Locale;
  const p = (x: string) => `/${l}${x}`;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Rural and offline schools
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Learning should not stop when the network does. Space-Together is
            designed for continuity in low-connectivity environments.
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
              <CardTitle>Resilient by design</CardTitle>
              <CardDescription>
                Sync when you are online; keep teaching when you are not.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Offline-first patterns for critical learner and teacher flows</li>
                <li>Lightweight surfaces that work on modest devices</li>
                <li>Clear handoff when connectivity returns</li>
              </ul>
              <MyLink
                href={p("/resources/why-space-together")}
                className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
              >
                Why Space-Together →
              </MyLink>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default SolutionsOfflineSchools;
