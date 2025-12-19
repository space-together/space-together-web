import { Button } from "@/components/ui/button";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

export default async function SchoolCalendar(
  props: PageProps<"/[lang]/test/pages">,
) {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" px-4 py-4 space-y-4 min-h-screen grid place-content-center w-full">
      <Button
        className="
        relative
        before:content-['']
        before:absolute
        before:left-0
        before:top-0
        before:h-full
        before:w-[2px]

        before:bg-gradient-to-b
        before:from-transparent
        before:via-amber-400
        before:to-transparent
      "
      >
        Button Testing
      </Button>

      <Button
        className="
          relative

          before:content-['']
          before:absolute
          before:left-0
          before:top-1/2
          before:-translate-y-1/2

          before:h-1/2
          before:w-0.5

          before:bg-primary
        "
      >
        Button Testing
      </Button>
    </div>
  );
}
