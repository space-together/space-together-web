import { userSessionType } from "@/models/auth/session-model";
import apiRequest from "@/services/api-request";
import { accountProvider } from "@/services/auth/core/base";
import { getCurrentUser } from "@/services/auth/core/current-user";
import { getCodeVerifier, setCookie } from "@/services/auth/core/session";
import { RedirectContents } from "@/utils/context/redirect-content";
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

type FetchOauthTokenModel = {
  provider: accountProvider,
  code: string,
  state: string,
  code_verifier?: string,
}

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const { provider: rawProvider } = params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (typeof code !== "string" || typeof state !== "string") {
    return redirect(
      `/auth/login?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`
    );
  }

  const provider = rawProvider.charAt(0).toUpperCase() + rawProvider.slice(1);
  
  const code_verifier = await getCodeVerifier();

  if (!code_verifier) return {error : "Verification token is required"}

  const token: FetchOauthTokenModel = { code, state, provider: provider as accountProvider , code_verifier};
  
  console.log("token : ", token)
  try {
    const fetch_code = await apiRequest<FetchOauthTokenModel, userSessionType>("post", "/auth/oauth2/fetch", token);

    if (!fetch_code.data) {
      // return redirect(`/auth/login?oauthError=${fetch_code.error}`);
      return NextResponse.json({ "error": fetch_code.error })
    }

    await setCookie(fetch_code.data);
    const current_user = await getCurrentUser({ authUser: true });

    return redirect(
      fetch_code.data.redirect
        ? "/auth/onboarding"
        : current_user
          ? RedirectContents({ lang: "en", role: current_user.role ?? "STUDENT" })
          : "/"
    );

  } catch (error) {
    console.error(error);
    return redirect(
      `/auth/login?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`
    );
  }
}


// https://discord.com/oauth2/authorize?client_id=1355320155021774938&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4789%2Fapi%2Foauth%2Fdiscord&scope=identify+email