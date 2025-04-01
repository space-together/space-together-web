"use server"
import { CODE_VERIFIER_COOKIE_KEY, COOKIE_EXPIRATION_SECONDS, COOKIE_SESSION, COOKIE_SESSION_KEY, } from "@/env";
import { userSessionType } from "@/models/auth/session-model"
import apiRequest from "@/services/api-request";
import { cookies } from 'next/headers';

export async function setCookie(values: userSessionType) {
    const saveCookies = await cookies();
    saveCookies.set(COOKIE_SESSION_KEY, values.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(values.created_at).getTime(), // 1 week
        maxAge: new Date(values.created_at).getTime(), // 1 week
    });
    saveCookies.set(COOKIE_SESSION, values.session_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(values.created_at).getTime(), // 1 week
        maxAge: new Date(values.created_at).getTime(), // 1 week
    });
}

export async function getUserFromSession() {
    const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value;
    if (sessionId == null) return null;

    return getUserSessionById(sessionId)
}

async function getUserSessionById(sessionId: string) {
    const session = await apiRequest<void, userSessionType>("get", "/auth/session", undefined, sessionId);
    return session?.data ? session.data : null
}

export async function removerUserSession() {
    const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value
    if (sessionId == null) return null
    const session = await apiRequest<void, userSessionType>("post", "/auth/session/delete", undefined, sessionId);
    if (session == null) return null;
    (await cookies()).delete(COOKIE_SESSION_KEY);
}

export async function removeUserSessionInClient() {
    (await cookies()).delete(COOKIE_SESSION_KEY);
}

export async function updateUserSessionExpires() {
    const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value
    if (sessionId == null) return null
    await apiRequest<void, userSessionType>("post", "/auth/session", undefined, sessionId);
}

// // store verifier code oauth
// export async function createStateOauth(state: string) {
//     (await cookies()).set(Oauth_State_Provider, state, {
//         secure: true,
//         httpOnly: true,
//         sameSite: "lax",
//         expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
//     })
// }

// store verifier code oauth
export async function createCodeVerifier(code: string) {
    (await cookies()).set(CODE_VERIFIER_COOKIE_KEY, code, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
    })
}

// get verifier code

export async function getCodeVerifier() {
    const codeVerifier = (await cookies()).get(CODE_VERIFIER_COOKIE_KEY)?.value
    if (codeVerifier == null) return null
    return codeVerifier
}
