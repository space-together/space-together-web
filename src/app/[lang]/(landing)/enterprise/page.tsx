import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "../_components/motion";
import { EnterpriseContactForm } from "./enterprise-contact-form";

const EnterprisePage = () => {
  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Enterprise
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Multi-campus rollouts, tighter SLAs, custom integrations, and
            procurement-friendly terms for ministries and large networks.
          </p>
        </FadeIn>
      </section>

      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <FadeIn>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>Deployment and scale</CardTitle>
                <CardDescription>
                  Onboarding playbooks, training windows, and staged rollouts
                  across regions.
                </CardDescription>
              </CardHeader>
            </Card>
          </FadeIn>
          <FadeIn delay={0.05}>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>SLA and support</CardTitle>
                <CardDescription>
                  Priority response tiers, named success contacts, and clear
                  escalation paths.
                </CardDescription>
              </CardHeader>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card className="border-base-300 border">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  APIs, exports, and partner workflows mapped to your identity
                  and student information systems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-base-content/80 list-inside list-disc space-y-1 text-sm">
                  <li>SSO and directory alignment</li>
                  <li>Custom reporting pipelines</li>
                  <li>Data residency discussions where required</li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
        <EnterpriseContactForm />
      </div>
    </div>
  );
};

export default EnterprisePage;
