import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme/themeProviders";
import { ClientThemeWrapper } from "@/context/theme/clientTheme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

export const metadata: Metadata = {
  title: "space-together-site",
  description:
    "website for space-together for controller other space-together application",
  icons: {
    icon: {
      href: "/logo/1.png",
      url: "/logo/1.png",
    },
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
