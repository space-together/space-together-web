// import { auth, signOut } from "@/auth";
// import MyImage from "@/components/my-components/myImage";
// import SiteLogo from "@/components/site/navbar/site-logo";
// import { Button } from "@/components/ui/button";
// import { Locale } from "@/i18n";
// import { RedirectContents } from "@/utils/context/redirect-content";
// import { toLowerCase } from "@/utils/functions/characters";
// import { ArrowRight, LogOutIcon } from "lucide-react";
// import Link from "next/link";
// import { BsArrowRight } from "react-icons/bs";

// interface props {
//   params: Promise<{ lang: Locale }>;
// }

// const HomePage = async (props: props) => {
//   const params = await props.params;
//   const { lang } = params;
//   const currentUser = (await auth())?.user;
//   return (
//     <div className=" min-h-screen p-4">
//       <nav className=" flex justify-between w-full items-center">
//         <SiteLogo
//           user={
//             !!currentUser
//               ? {
//                   ...currentUser,
//                   name: currentUser.name ?? "",
//                   email: currentUser.email ?? undefined,
//                   image: currentUser.image ?? undefined,
//                 }
//               : undefined
//           }
//           lang={lang}
//         />
//         {!!currentUser ? (
//           <Link
//             href={`${RedirectContents({
//               lang,
//               role: currentUser.role,
//             })}`}
//             className=" group"
//           >
//             <Button variant="info" size="sm">
//               Go in App{" "}
//               <BsArrowRight
//                 size={16}
//                 className=" group-hover:scale-x-125 duration-150"
//               />
//             </Button>
//           </Link>
//         ) : (
//           <div className=" flex space-x-2">
//             <Link href={`/${lang}/auth/login`}>
//               <Button size="sm" variant="info">
//                 Login
//               </Button>
//             </Link>
//             <Link href={`/${lang}/auth/login`}>
//               <Button variant="primary" size="sm">
//                 Register
//               </Button>
//             </Link>
//           </div>
//         )}
//       </nav>
//       {/* body */}
//       <div className=" grid place-content-center w-full h-full">
//         <div>
//           {/* title */}
//           <div className=" text-center flex flex-col items-center md:px-80 space-y-2">
//             <h1 className=" happy-title-head text-center text-info">
//               space-together
//             </h1>
//             <h2 className=" happy-title-base text-center">
//               School Management & Learning System
//             </h2>
//             <p>
//               Space Together is a comprehensive platform designed to manage
//               schools, teachers, students, and learning resources efficiently.
//               It streamlines class management, subject organization, student
//               progress tracking, and communication.
//             </p>
//           </div>
//           {/* still in building */}
//           <div className=" mt-2 space-y-2">
//             <h3 className=" font-semibold text-xl text-center text-warning">
//               We are still building it 😔😔
//             </h3>
//             <p className=" text-center text-myGray">
//               you can use it but when we publish your data will lost,
//               application will launched on <strong>11/9/2025</strong>
//             </p>
//             <div className=" flex justify-center mt-4">
//               {!!currentUser ? (
//                 <div className=" space-y-4 flex flex-col items-center">
//                   <div className=" flex space-x-4 items-center">
//                     <Link
//                       href={`${RedirectContents({
//                         lang,
//                         role: currentUser.role,
//                       })}`}
//                     >
//                       <MyImage
//                         className=" size-44"
//                         role="AVATAR"
//                         src={
//                           currentUser?.image ||
//                           "https://img.freepik.com/free-photo/side-view-man-working-nature_23-2151205383.jpg?t=st=1735175421~exp=1735179021~hmac=d51b71c0b0332d608165e2a73a084f858fdc19c6c65d150480281a4bc0fed54a&w=1060"
//                         }
//                         alt="Picture of the author"
//                       />
//                     </Link>
//                     <div className=" flex flex-col space-y-1">
//                       <div className=" flex ">
//                         <span className=" text-myGray">Name :</span>
//                         <h4 className=" font-medium capitalize">
//                           {currentUser.name}
//                         </h4>
//                       </div>
//                       <div className=" flex ">
//                         <span className=" text-myGray">email :</span>
//                         <h4 className=" font-medium">{currentUser.email}</h4>
//                       </div>
//                       {!!currentUser.username && (
//                         <div className=" flex ">
//                           <span className=" text-myGray">Username :</span>
//                           <h4 className=" font-medium">
//                             {currentUser.username}
//                           </h4>
//                         </div>
//                       )}
//                       <div className=" flex ">
//                         <span className=" text-myGray">User type :</span>
//                         <h4 className=" font-medium capitalize">
//                           {toLowerCase(currentUser.role)}
//                         </h4>
//                       </div>
//                       <Link
//                         href={`${RedirectContents({
//                           lang,
//                           role: currentUser.role,
//                         })}`}
//                         className=" mt-3"
//                       >
//                         <Button variant="ghost" size="sm" className=" group">
//                           Visit site{" "}
//                           <ArrowRight
//                             size={14}
//                             className=" group-hover:scale-x-110 duration-150"
//                           />
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                   <form
//                     action={async () => {
//                       "use server";
//                       await signOut();
//                     }}
//                   >
//                     <Button type="submit" variant="error">
//                       <LogOutIcon /> Sign out
//                     </Button>
//                   </form>
//                 </div>
//               ) : (
//                 <Link href={`/${lang}/auth/register`}>
//                   <Button variant="outline">Test application 🌼</Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
"use client";

import Image from "next/image";

export default function FigureComponent() {
  return (
    <figure className="flex flex-col gap-1 rounded-xl bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5 dark:bg-white/10 dark:inset-ring-white/10">
      <div className="not-prose overflow-auto rounded-lg bg-white outline outline-white/5 dark:bg-gray-950/50 p-8">
        <div className="grid perspective-distant">
          <article className="relative isolate z-10 flex w-full max-w-80 rotate-x-51 rotate-z-43 flex-col justify-end justify-self-center overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 shadow-xl transition-all duration-500 transform-3d">
            <Image
              src="/images/7.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 -z-10 size-full"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div>
            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm text-gray-300">
              <time dateTime="2020-03-16" className="mr-8">
                Mar 16, 2020
              </time>
              <div className="-ml-4 flex items-center gap-x-4">
                <svg
                  viewBox="0 0 2 2"
                  className="-ml-0.5 size-0.5 flex-none fill-white/50"
                >
                  <circle r="1" cx="1" cy="1"></circle>
                </svg>
                <div className="flex gap-x-2.5">
                  <Image
                    src="/images/2.jpg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 flex-none rounded-full bg-white/10"
                  />
                  Michael Foster
                </div>
              </div>
            </div>
            <p className="mt-3 text-lg font-semibold text-white">
              <span className="absolute inset-0"></span>
              Boost your conversion rate
            </p>
          </article>
        </div>
      </div>
    </figure>
  );
}
