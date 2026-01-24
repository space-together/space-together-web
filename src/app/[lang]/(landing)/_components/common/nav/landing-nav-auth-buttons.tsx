import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface LandingNavAuthButtonsProps {
  auth?: AuthContext | null;
  lang: Locale;
}

const LandingNavAuthButtons = ({ auth, lang }: LandingNavAuthButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"ghost"}
        size="sm"
        library="daisy"
        href={`/${lang}/auth/login`}
      >
        Sign in
      </Button>
      <Button
        variant={"outline"}
        library="daisy"
        size="sm"
        href={`/${lang}/auth/register`}
      >
        Sign up
      </Button>
    </div>
  );
};

export default LandingNavAuthButtons;
