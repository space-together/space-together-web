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

const CollaborationPage = async (props: PageProps<"/[lang]/features/collaboration">) => {
  const { lang } = await props.params;
  const l = lang as Locale;

  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Collaboration
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Chat and announcements that stay anchored to classes and schools —
            so context never gets lost in a generic inbox.
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
              <CardTitle>Contextual communication</CardTitle>
              <CardDescription>
                The right thread for the right group — with sensible defaults
                for minors and guardians.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Class channels with teacher moderation</li>
                <li>School-wide announcements with read receipts where useful</li>
                <li>Notifications that respect focus and school hours</li>
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default CollaborationPage;
