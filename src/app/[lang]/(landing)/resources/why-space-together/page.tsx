import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import { FadeIn } from "../../_components/motion";

export default async function ResourcesWhySpaceTogetherPage(
  props: PageProps<"/[lang]/resources/why-space-together">,
) {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <article className="site-g-p pb-24">
      <header className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Why Space-Together
          </h1>
          <p className="text-base-content/70 mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            Schools mix curricula, languages, and uneven connectivity.
            Space-Together is built for that reality: offline-first patterns,
            role-native dashboards, and communication tied to academic context.
          </p>
        </FadeIn>
      </header>
      <div className="mx-auto max-w-2xl pb-12 text-center">
        <Button
          href={`/${l}/auth/register`}
          library="daisy"
          variant="primary"
          size="lg"
        >
          Start your school
        </Button>
      </div>
    </article>
  );
}
