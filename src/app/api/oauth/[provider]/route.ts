import { accountProvider } from "@/services/auth/core/base";
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
  ) {
    const { provider: rawProvider } = await params
    const code = request.nextUrl.searchParams.get("code")
    const state = request.nextUrl.searchParams.get("state")
    const changeCapital = rawProvider.charAt(0).toUpperCase() + rawProvider.slice(1)

  
  
    if (typeof code !== "string" || typeof state !== "string") {
      redirect(
        `/auth/login?oauthError=${encodeURIComponent(
          "Failed to connect. Please try again."
        )}`
      )
    }

    const data = {
      code : request.nextUrl.searchParams.get("code"),
      state : request.nextUrl.searchParams.get("state"),
      provide : changeCapital as accountProvider
    }
     
    // redirect("/")
  }