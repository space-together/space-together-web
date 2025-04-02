import { removerUserSession } from "@/services/auth/core/session";
import { redirect } from "next/navigation";

export const logout = async () => {
  await removerUserSession();
  return redirect("/auth/login");
};
