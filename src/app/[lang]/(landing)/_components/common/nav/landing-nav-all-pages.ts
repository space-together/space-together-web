interface PageItem {
  label: string;
  href: string;
  description?: string;
  category: string;
}

export const allPages: PageItem[] = [
  // Features - School
  {
    label: "School Members",
    href: `/features/school-members`,
    category: "Features",
  },
  {
    label: "Classes & Subjects",
    href: `/features/classes`,
    category: "Features",
  },
  {
    label: "Collaboration",
    href: `/features/collaboration`,
    category: "Features",
  },
  // Features - Education Systems
  {
    label: "REB Curriculum",
    href: `/features/education-systems#reb`,
    category: "Features",
  },
  {
    label: "TVET",
    href: `/features/education-systems#tvet`,
    category: "Features",
  },
  {
    label: "Montessori",
    href: `/features/education-systems#montessori`,
    category: "Features",
  },
  {
    label: "Custom Systems",
    href: `/features/education-systems#custom`,
    category: "Features",
  },
  // Features - Security & Privacy
  {
    label: "Data Protection",
    href: `/features/security`,
    category: "Features",
  },
  {
    label: "Privacy & Compliance",
    href: `/features/security#privacy`,
    category: "Features",
  },
  // Solutions
  {
    label: "Schools",
    href: `/solutions/schools`,
    description:
      "Connect teachers, students, parents, and staff for better collaboration.",
    category: "Solutions",
  },
  {
    label: "TVET Institutions",
    href: `/solutions/tvet`,
    description:
      "Support technical and vocational education programs efficiently.",
    category: "Solutions",
  },
  {
    label: "Private Schools",
    href: `/solutions/private-schools`,
    description:
      "Streamline management and communication for private institutions.",
    category: "Solutions",
  },
  {
    label: "Rural & Offline Schools",
    href: `/solutions/offline-schools`,
    description: "Ensure learning continuity even in low-connectivity regions.",
    category: "Solutions",
  },
  // Systems
  {
    label: "Students",
    href: `/systems/students`,
    description:
      "Access assignments, track progress, and collaborate with peers.",
    category: "Systems",
  },
  {
    label: "Teachers",
    href: `/systems/teachers`,
    description:
      "Manage classes, distribute resources, and communicate with students.",
    category: "Systems",
  },
  {
    label: "Parents",
    href: `/systems/parents`,
    description:
      "Stay informed about your child's progress and school updates.",
    category: "Systems",
  },
  {
    label: "School Staff",
    href: `/systems/school-staff`,
    description:
      "Oversee operations, manage permissions, and generate reports.",
    category: "Systems",
  },
  // Other Pages
  {
    label: "Enterprise",
    href: `/enterprise`,
    category: "Other",
  },
  {
    label: "Pricing",
    href: `/pricing`,
    category: "Other",
  },
  {
    label: "Why space-together?",
    href: `/resources/why-space-together`,
    category: "Resources",
  },
  {
    label: "Accessibility",
    href: `/accessibility`,
    category: "Resources",
  },
];
