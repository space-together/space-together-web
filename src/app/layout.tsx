import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme/themeProviders";
import { ClientThemeWrapper } from "@/context/theme/clientTheme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

export const metadata: Metadata = {
  title: "space-together - School Management & Learning System",
  description:
    "Space Together is a comprehensive platform designed to manage schools, teachers, students, and learning resources efficiently. It streamlines class management, subject organization, student progress tracking, and communication.",
  icons: {
    icon: {
      href: "/logo/1.png",
      url: "/logo/1.png",
    },
  },
  keywords: [
    "School Management",
    "Education System",
    "Learning Platform",
    "Teachers",
    "Students",
    "Classes",
    "Subjects",
    "School Communication",
    "Space Together",
  ],
  authors: [
    { name: "Bruno Rwanda Happyheart", url: "https://github.com/brunorwanda4" },
    { name: "Muganza Jesus", url: "https://github.com/brunorwanda4" },
  ],
  alternates : {
    canonical: '/',
    languages: {
      'en': '/en',
      'rw': '/rw',
    },
  },
  openGraph: {
    title: "space-together - Empowering Education",
    description:
      "An innovative school management and learning system that enhances education through digital tools.",
    url: "https://space-together-web.vercel.app",
    type: "website",
    // images: [
    //   {
    //     url: "/logo/1.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Space Together - School Management & Learning System",
    //   },
    // ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@SpaceTogetherEdu",
  //   title: "space-together - School Management & Learning System",
  //   description:
  //     "A modern education platform for schools, teachers, and students to collaborate efficiently.",
    // images: ["/logo/1.png"],
  // },
  robots: "index, follow",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
      <body className={``}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <SonnerToaster position="top-right" />
            {children}
            <Toaster/>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
