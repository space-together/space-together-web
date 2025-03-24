import { userSessionType } from "@/models/auth/session-model"
const COOKIE_SESSION_KEY = "session-id"

export type Cookies = {
    set: (
        key: string,
        value: string,
        options: {
            secure?: boolean
            httpOnly?: boolean
            sameSite?: "strict" | "lax"
            expires?: number
        }
    ) => void
    get: (key: string) => { name: string; value: string } | undefined
    delete: (key: string) => void
}

export function setCookie(session : userSessionType, cookies: Pick<Cookies, "set">) {
    cookies.set( COOKIE_SESSION_KEY, session.token, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(session.created_at).getTime(),
    })
}