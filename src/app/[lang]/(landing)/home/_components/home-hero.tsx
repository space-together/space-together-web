"use client";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useState } from "react";

interface HomeHeroProps {
  auth?: AuthContext | null;
  lang?: Locale;
}

const HomeHero = ({ auth, lang }: HomeHeroProps) => {
  const [selectedSystem, setSelectedSystem] = useState<string>("students");
  const systems = ["students", "teachers", "parents", "staff"];
  return (
    <div>
      <section
        style={{
          background: ` radial-gradient(125% 125% at 50% 10%,
               var(--color-base-200) 40%,
                var(--color-info) 100%)`,
        }}
        className="relative flex flex-col items-center justify-center  pt-32  text-center overflow-visible shadow-xl/60     shadow-info/50"
      >
        <div className="max-w-4xl">
          <h1 className="mb-6 h1 tracking-tight md:text-5xl">
            A connected learning platform for every <br /> school — even offline
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg opacity-80 md:text-xl">
            Space-Together connects students, teachers, parents, and school
            staff in one collaborative platform for communication, learning, and
            academic continuity online or offline.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={`/${lang}/auth/register`}
              variant={"primary"}
              library="daisy"
              size="lg"
            >
              Get started
            </Button>
            <Button library="daisy" size="lg" variant={"outline"}>
              Find a school
            </Button>
          </div>
        </div>

        <div className=" px-12 w-full mt-20 relative">
          <main className="p-6 backdrop-blur-xl   w-full min-h-screen  border-2 bg-base-300/20 ring ring-info border-white border-b-transparent  pb-0 border-b aspect-video  rounded-t-3xl">
            <div className=" w-full rounded-t-xl bg-base-100 h-full border-base-content/20 border border-b-0">
              <div>Br</div>
            </div>
          </main>
        </div>
      </section>
      <div className=" mt-8 flex items-center flex-col gap-4">
        <div className=" flex border border-base-content/50 p-3 gap-4 rounded-full ">
          {systems.map((system) => (
            <Button
              key={system}
              variant={selectedSystem === system ? "outline" : "ghost"}
              library="daisy"
              className={cn(
                "capitalize  rounded-full hover:bg-linear-to-t hover:from-base-content/5 hover:to-base-content/15",
                selectedSystem === system &&
                  "bg-linear-to-t from-base-content/5 to-base-content/15",
              )}
            >
              {system}
            </Button>
          ))}
        </div>
        <p>
          Manage schools, connect communities, and support learning all in one
          platform.
        </p>
      </div>
    </div>
  );
};

export default HomeHero;
