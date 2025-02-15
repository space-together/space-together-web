import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";

interface props {
    lang : Locale
}

const AppFooter = ({lang} : props) => {
  return (
    <footer className="footer footer-center text-base-content p-4 border-t border-t-border">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by <Link href={`/${lang}`} className=" font-medium">space-together</Link> - School Management & Learning System
        </p>
      </aside>
    </footer>
  );
};

export default AppFooter;
