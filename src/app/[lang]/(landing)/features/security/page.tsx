import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "../../_components/motion";
import { SecurityHero } from "./security-hero";

const FeaturesSecurityPage = () => {
  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 md:py-20">
        <SecurityHero />
      </section>

      <div className="mx-auto grid max-w-4xl gap-8">
        <FadeIn>
          <Card className="border-base-300 border">
            <CardHeader>
              <CardTitle>Data protection</CardTitle>
              <CardDescription>
                Role-based access, audit-friendly structures, and separation
                between school contexts help reduce accidental exposure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Granular roles for admin, teacher, student, and parent views</li>
                <li>School-scoped data so communities stay distinct</li>
                <li>Encryption in transit for standard deployments</li>
              </ul>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.06}>
          <Card id="privacy" className="border-base-300 scroll-mt-28 border">
            <CardHeader>
              <CardTitle>Privacy and compliance posture</CardTitle>
              <CardDescription>
                We design for transparency: clear purposes for data use, minimal
                surprise sharing, and paths to support your local obligations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>WCAG-minded UI patterns across the marketing site and app shell</li>
                <li>Enterprise options for custom DPAs and data processing terms</li>
                <li>Accessibility statement on our accessibility page</li>
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default FeaturesSecurityPage;
