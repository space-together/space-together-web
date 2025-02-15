import { Student, User, Class } from "../../prisma/prisma/generated";

export type studentType = Student & { user: User; class: Class };
