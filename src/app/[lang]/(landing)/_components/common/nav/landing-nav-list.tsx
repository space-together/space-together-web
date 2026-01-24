import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface LandingNavListProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNavList = ({ lang }: LandingNavListProps) => {
  const features = [
    {
      title: "School",
      items: [
        { label: "School Members", href: `/${lang}/features/school-members` },
        { label: "Classes & Subjects", href: `/${lang}/features/classes` },
        { label: "Collaboration", href: `/${lang}/features/collaboration` },
      ],
    },
    {
      title: "Education Systems",
      items: [
        {
          label: "REB Curriculum",
          href: `/${lang}/features/education-systems#reb`,
        },
        { label: "TVET", href: `/${lang}/features/education-systems#tvet` },
        {
          label: "Montessori",
          href: `/${lang}/features/education-systems#montessori`,
        },
        {
          label: "Custom Systems",
          href: `/${lang}/features/education-systems#custom`,
        },
      ],
    },
    {
      title: "Security & Privacy",
      items: [
        { label: "Data Protection", href: `/${lang}/features/security` },
        {
          label: "Privacy & Compliance",
          href: `/${lang}/features/security#privacy`,
        },
      ],
    },
  ];

  const solutions = [
    {
      label: "Schools",
      href: `/${lang}/solutions/schools`,
      description:
        "Connect teachers, students, parents, and staff for better collaboration.",
    },
    {
      label: "TVET Institutions",
      href: `/${lang}/solutions/tvet`,
      description:
        "Support technical and vocational education programs efficiently.",
    },
    {
      label: "Private Schools",
      href: `/${lang}/solutions/private-schools`,
      description:
        "Streamline management and communication for private institutions.",
    },
    {
      label: "Rural & Offline Schools",
      href: `/${lang}/solutions/offline-schools`,
      description:
        "Ensure learning continuity even in low-connectivity regions.",
    },
  ];

  const systems = [
    {
      label: "Students",
      href: `/${lang}/systems/students`,
      description:
        "Access assignments, track progress, and collaborate with peers.",
    },
    {
      label: "Teachers",
      href: `/${lang}/systems/teachers`,
      description:
        "Manage classes, distribute resources, and communicate with students.",
    },
    {
      label: "Parents",
      href: `/${lang}/systems/parents`,
      description:
        "Stay informed about your child's progress and school updates.",
    },
    {
      label: "School Staff",
      href: `/${lang}/systems/school-staff`,
      description:
        "Oversee operations, manage permissions, and generate reports.",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent className="p-0 flex flex-row bg-base-100  ">
            <div className="grid grid-cols-3 gap-4  w-fit p-6 pr-0 min-w-140">
              {features.map((group) => (
                <div key={group.title} className="flex flex-col gap-3">
                  <Label className="text-sm font-semibold opacity-80">
                    {group.title}
                  </Label>
                  <div className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <MyLink
                        key={item.label}
                        href={item.href}
                        className="text-sm hover:text-primary"
                      >
                        {item.label}
                      </MyLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-info/30  py-6 pl-4 pr-4 min-w-44 flex flex-col gap-2">
              <div className="space-y-2">
                <MyImage
                  src="/images/web/online-studying.jpg"
                  alt="Online Studying"
                  className="size-20 w-full rounded-[var(--radius-box)]"
                />
                <p className="text-xs opacity-80">
                  Get your start to Collaborate, Learn.
                </p>
              </div>
              <MyLink
                href="/resources/why-space-together"
                className=" text-sm  hover:text-primary"
              >
                Why space-together?
              </MyLink>
              <MyLink
                href="/accessibility"
                className=" text-sm  hover:text-primary"
              >
                Accessibility
              </MyLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* SOLUTIONS */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-base-100 min-w-150 w-fit p-6 grid grid-cols-2  gap-6">
            {solutions.map((item) => (
              <MyLink
                key={item.label}
                href={item.href}
                className="group/item flex flex-col"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium group-hover/item:text-primary duration-150">
                    {item.label}
                  </span>
                  <span className="text-sm opacity-80">{item.description}</span>
                </div>
              </MyLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* SYSTEMS */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Systems</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-base-100 min-w-150 w-fit p-6 grid grid-cols-2  gap-4">
            {systems.map((item) => (
              <MyLink
                key={item.label}
                href={item.href}
                className="group/item flex flex-col"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium group-hover/item:text-primary duration-150">
                    {item.label}
                  </span>
                  <span className="text-sm opacity-80">{item.description}</span>
                </div>
              </MyLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* ENTERPRISE */}
        <NavigationMenuItem>
          <MyLink
            href={`/${lang}/enterprise`}
            className="px-4 py-2 text-sm font-medium hover:text-primary"
          >
            Enterprise
          </MyLink>
        </NavigationMenuItem>

        {/* PRICING */}
        <NavigationMenuItem>
          <MyLink
            href={`/${lang}/pricing`}
            className="px-4 py-2 text-sm font-medium hover:text-primary"
          >
            Pricing
          </MyLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LandingNavList;
