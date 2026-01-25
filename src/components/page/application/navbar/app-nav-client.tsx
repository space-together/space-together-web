"use client";

import { useScrollDirection } from "@/lib/hooks/use-scroll";

interface AppNavClientProps {
  children: React.ReactNode;
}

const AppNavClient = ({ children }: AppNavClientProps) => {
  const isVisible = useScrollDirection(56);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full "
      }`}
    >
      {children}
    </div>
  );
};

export default AppNavClient;
