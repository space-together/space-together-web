import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"

const page = async () => {
  const session = await auth();
  return (
    <div>
      other page {JSON.stringify(session)}
      <div className=" flex gap-4">
        <Link href={`/auth/register`} className=" btn btn-info">Register</Link>
        <Link href={`/auth/login`} className=" btn btn-info">Login</Link>
      </div>

      <Image
      src="https://img.freepik.com/free-photo/side-view-man-working-nature_23-2151205383.jpg?t=st=1735175421~exp=1735179021~hmac=d51b71c0b0332d608165e2a73a084f858fdc19c6c65d150480281a4bc0fed54a&w=1060"
      width={500}
      height={500}
      alt="Picture of the author"
    />
    </div>
  )
}

export default page
