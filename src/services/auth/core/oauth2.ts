"use server"

import apiRequest from "@/services/api-request";
import { accountProvider } from "./base";
import { redirect } from "next/navigation";

export type Oauth2ProviderUrlsModel = {
    url: string,
    state: string,
    code_verifier: string,
}

export async function oauth2ProviderUrl(provider: accountProvider) {
    const req = await apiRequest<void, Oauth2ProviderUrlsModel>("get", `/auth/oauth2/${provider}`);

    if (!req.data) return { error: req.error }

    redirect(req.data.url)
}