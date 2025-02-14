import { auth, signOut } from "@/auth";
import MyImage from "@/components/my-components/myImage";
import SiteLogo from "@/components/site/navbar/site-logo";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { RedirectContents } from "@/utils/context/redirect-content";
import Link from "next/link";

interface props {
  params: Promise<{ lang: Locale }>;
}

const HomePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await auth())?.user;
  return (
    <div className=" min-h-screen p-4">
      <nav className=" flex justify-between w-full">
        <SiteLogo lang={lang} />
        <div className=" flex space-x-2">
          <Link href={`/${lang}/auth/login`}>
            <Button size="sm" variant="info">
              Login
            </Button>
          </Link>
          <Link href={`/${lang}/auth/login`}>
            <Button variant="primary" size="sm">
              Register
            </Button>
          </Link>
        </div>
      </nav>
      {/* body */}
      <div className=" grid place-content-center w-full h-full">
        <div>
          {/* title */}
          <div className=" text-center flex flex-col items-center md:px-80 space-y-2">
            <h1 className=" happy-title-head text-center text-info">
              space-together
            </h1>
            <h2 className=" happy-title-base text-center">
              School Management & Learning System
            </h2>
            <p>
              Space Together is a comprehensive platform designed to manage
              schools, teachers, students, and learning resources efficiently.
              It streamlines class management, subject organization, student
              progress tracking, and communication.
            </p>
          </div>
          {/* still in building */}
          <div className=" mt-2 space-y-2">
            <h3 className=" font-semibold text-xl text-center text-warning">
              We are still building it 😔😔
            </h3>
            <p className=" text-center text-myGray">
              you can use it but when we publish your data will lost,
              application will launched <strong>11/9/2025</strong>
            </p>
            <div className=" flex justify-center mt-4">
              {!!currentUser ? (
                <div className=" space-y-4 flex flex-col items-center">
                  
                  <Link
                    href={`${RedirectContents({
                      lang,
                      role: currentUser.role,
                    })}`}
                  >
                    <MyImage
                    className="size-32"
                    classname=" mask mask-squircle "
                    src={
                      currentUser?.image ||
                        "https://img.freepik.com/free-photo/side-view-man-working-nature_23-2151205383.jpg?t=st=1735175421~exp=1735179021~hmac=d51b71c0b0332d608165e2a73a084f858fdc19c6c65d150480281a4bc0fed54a&w=1060"
                    }
                    alt="Picture of the author"
                  />
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button type="submit" variant="error">
                      Sign out
                    </Button>
                  </form>
                </div>
              ) : (
                <Link href={`/${lang}/auth/register`}>
                  <Button variant="outline">🌼 Test application</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
