import { auth } from "@/auth"
import MyImage from "@/components/my-components/myImage";
import { cn } from "@/lib/utils";
import Link from "next/link"

const page = async () => {
  const session = await auth();
  return (
    <div>
      other page {JSON.stringify(session)}
      <div className=" flex gap-4">
        <Link href={`/auth/register`} className=" btn btn-info">Register</Link>
        <Link href={`/auth/login`} className=" btn btn-accent">Login</Link>
        <Link href={`/auth/onboarding`} className=" btn btn-primary">onboarding</Link>
      </div>

      <MyImage
      src={cn(session?.user?.image || "https://img.freepik.com/free-photo/side-view-man-working-nature_23-2151205383.jpg?t=st=1735175421~exp=1735179021~hmac=d51b71c0b0332d608165e2a73a084f858fdc19c6c65d150480281a4bc0fed54a&w=1060")}
      alt="Picture of the author"
    />
    </div>
  )
}

export default page
