"use server"
import { onboardingSchema, onboardingSchemaTypes } from '@/utils/schema/userSchema';

import { db } from "@/lib/db"
import { UserRole } from '../../../../prisma/prisma/generated';

export const onboardingAction = async (value : onboardingSchemaTypes, id : string) => {
    const validation = onboardingSchema.safeParse(value);

    if (!validation.success) {
        return {error : "Invalid data"}
    }
    const {image , age , phone , gender, role} = validation.data;
    const userRole: UserRole = role as UserRole;
    try {
       const user = await db.user.update({
           data : {
               image,
               age,
               phone,
               gender,
               role: userRole,
           },
           where: {id },
       });
   
       if (!user) {
           return {error : "User not found"}
       }
    
   } catch (error ) {
    return {error : `Error updating user [${error}]`}
   }
}