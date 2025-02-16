"use server";

import {
  subjectSchema,
  subjectSchemaType,
} from "@/utils/schema/subject-schema";
import { db } from "@/lib/db";
import { uploadSymbolToCloudinary } from "../cloudinary-service";
import { getSubjectByCode } from "../data/subject-data";

export const createSubjectAction = async (values: subjectSchemaType, classId?: string) => {
  const validation = subjectSchema.safeParse(values);

  if (!validation.success) {
    return { error: "invalid values" };
  }

  const { name, code, symbol, learningHours, purpose } = validation.data;
  try {
    const getCode = await getSubjectByCode(code);
    if (!!getCode) return { error: "Code is leady exit" };

    const uploadSymbol = symbol ? await uploadSymbolToCloudinary(symbol) : null;
    const create = await db.subject.create({
      data: {
        name,
        code,
        classId,
        symbol: uploadSymbol ? uploadSymbol : undefined,
        learningHours: Number(learningHours),
        purpose,
      },
    });

    return create
      ? { success: "subject created", data: create }
      : { error: "Failed to create Class" };
  } catch (error) {
    return {
      error: `Something went wrong to create subject error is  [${error}]`,
    };
  }
};
