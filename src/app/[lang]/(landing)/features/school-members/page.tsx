import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import { FadeIn } from "../../_components/motion";

export default async function SchoolMembersPage(
  props: PageProps<"/[lang]/features/school-members">,
) {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            School members
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Directory and roles so each person sees what they need.
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
    </div>
  );
}
