import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";

interface LandingFooterProps {
  lang: Locale;
}

const LandingFooter = ({ lang }: LandingFooterProps) => {
  const p = (path: string) => `/${lang}${path}`;
  return (
    <footer className="border-base-content/10 border-t bg-base-100/90 backdrop-blur-sm">
      <div className="site-g-p mx-auto flex max-w-6xl flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="text-base-content text-lg font-semibold">
            Space-Together
          </p>
          <p className="text-base-content/70 text-sm leading-relaxed">
            School management and collaboration for students, teachers, parents,
            and administrators — online or offline.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="text-base-content/50 text-xs font-semibold tracking-wide uppercase">
              Product
            </p>
            <MyLink
              href={p("/features/school-members")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Features
            </MyLink>
            <MyLink
              href={p("/pricing")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Pricing
            </MyLink>
            <MyLink
              href={p("/enterprise")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Enterprise
            </MyLink>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base-content/50 text-xs font-semibold tracking-wide uppercase">
              Learn
            </p>
            <MyLink
              href={p("/resources/why-space-together")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Why Space-Together
            </MyLink>
            <MyLink
              href={p("/accessibility")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Accessibility
            </MyLink>
            <MyLink
              href={p("/features/security")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Security
            </MyLink>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base-content/50 text-xs font-semibold tracking-wide uppercase">
              Account
            </p>
            <MyLink
              href={p("/auth/login")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Sign in
            </MyLink>
            <MyLink
              href={p("/auth/register")}
              className="text-base-content/80 hover:text-primary text-sm"
            >
              Get started
            </MyLink>
          </div>
        </div>
      </div>
      <div className="border-base-content/10 border-t py-6">
        <p className="text-base-content/50 site-g-p mx-auto max-w-6xl text-center text-xs">
          © {new Date().getFullYear()} Space-Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
