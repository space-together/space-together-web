import z from "zod";

export const CreateSchoolSchema = z.object({
    name: z.string().min(1, {
        message: "name is required",
    }).max(80, {
        message: "Maximum characters are 80",
    }),
    logo: z.string().min(1, { message: " School Logo is required" }),
    type : z.enum(["PUBLIC", "PRIVATE" , "INTERNATIONAL"]),
    crriculum : z.enum(["REB", "TVET"]),
    education_levels : z.array(z.enum(["PRIMARY","SECONDARY","TVET"])),
    school_members : z.array(z.enum(["BOYS_ONLY","GIRLS_ONLY","MIXED"])),
   accreditation_number : z.string().min(1, {
    message : "school Accreditation number is required"
   }),
   affiliation : z.enum(["GOVERNMENT", "RELIGIOUS","NGO", "INDEPENDENT"]),
   description : z.string().min(1, {
    message : "Description of your school is required"
   })
})

export type CreateSchoolTypes = z.infer<typeof CreateSchoolSchema>