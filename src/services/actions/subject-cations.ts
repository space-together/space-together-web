"use client";

import {
  subjectSchema,
  subjectSchemaType,
} from "@/utils/schema/subject-schema";
import { db } from "@/lib/db";
import { uploadSymbolToCloudinary } from "../cloudinary-service";

export const createSubjectAction = async (values: subjectSchemaType) => {
  const validation = subjectSchema.safeParse(values);

  if (!validation.success) {
    return { error: "invalid values" };
  }

  const { name, code, symbol, learningHours, purpose } = validation.data;
  try {
    const uploadSymbol = await uploadSymbolToCloudinary(symbol);
    const create = await db.subject.create({
      data: {
        name,
        code,
        symbol : uploadSymbol,
        learningHours : Number(learningHours),
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
