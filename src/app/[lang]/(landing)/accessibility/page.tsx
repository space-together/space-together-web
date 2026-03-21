import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "../_components/motion";

export default function AccessibilityPage() {
  return (
    <div className="site-g-p pb-24">
      <section className="mx-auto max-w-3xl py-14 text-center md:py-20">
        <FadeIn>
          <h1 className="text-base-content text-4xl font-bold tracking-tight md:text-5xl">
            Accessibility
          </h1>
          <p className="text-base-content/70 mx-auto mt-5 max-w-2xl text-lg">
            Keyboard navigation, readable contrast with DaisyUI themes, and
            clear focus states on interactive controls.
          </p>
        </FadeIn>
      </section>

      <div className="mx-auto grid max-w-4xl gap-8">
        <FadeIn>
          <Card className="border-base-300 border">
            <CardHeader>
              <CardTitle>WCAG alignment</CardTitle>
              <CardDescription>
                We treat WCAG 2.2 Level AA as our north star for new marketing
                and product surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-base-content/80 list-inside list-disc space-y-2 text-sm md:text-base">
                <li>Visible focus rings on buttons and links</li>
                <li>Semantic headings on key pages</li>
                <li>Form labels tied to inputs in auth and enterprise flows</li>
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
