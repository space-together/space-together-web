"use server"
import { COOKIE_SESSION_KEY } from "@/env";
import { userSessionType } from "@/models/auth/session-model"
import apiRequest from "@/services/api-request";
import { cookies } from 'next/headers';

export async function setCookie(values: userSessionType) {
    (await cookies()).set(COOKIE_SESSION_KEY, values.token, {
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
