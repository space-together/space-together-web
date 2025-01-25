import { db } from "@/lib/db"

export const getUserByEmail = async (email : string) => {
    try {
        const user = await db.user.findUnique({where : {email}});
        if(user) {
            return user
        }
        return null
    } catch {
        return null
    }
}
export const getUserById = async (id : string) => {
    try {
        const user = await db.user.findUnique({where : {id}});
        return user
    } catch {
        return null
    }
}