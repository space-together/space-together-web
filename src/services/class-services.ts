"use server";

import { db } from "@/lib/db";
import { ClassType } from "../../prisma/prisma/generated";
import { generateCode } from "@/utils/functions/characters";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";

class ClassService {
  async createClass(values: classSchemaType) {
    const validation = classSchema.safeParse(values);
    if (!validation.success) {
      return { error: "Invalid values" };
    }

    const {
      name,
      username,
      description,
      sector,
      class_teacher,
      trade,
      class_room,
      class_type,
    } = validation.data as {
      name: string;
      username: string;
      description: string;
      sector: string;
      trade: string;
      class_room: string;
      class_type: ClassType;
      class_teacher: string;
    };
    
    try {
      const createdClass = await db.class.create({
        data: {
          name,
          username,
          description,
          sectorId: sector,
          classRoomId: class_room,
          tradeId: trade,
          code: generateCode(),
          classType: class_type,
          classTeacher: class_teacher,
        },
      });

      return createdClass
        ? { success: "Class created", data: createdClass }
        : { error: "Failed to create Class" };
    } catch (error) {
      return { error: `Error creating class: [${error}]` };
    }
  }

  async updateClass(id: string, values: classSchemaType) {
    const validation = classSchema.safeParse(values);
    if (!validation.success) {
      return { error: "Invalid values" };
    }

    const {
      name,
      username,
      description,
      sector,
      class_teacher,
      trade,
      class_room,
      class_type,
    } = validation.data as {
      name: string;
      username: string;
      description: string;
      sector: string;
      trade: string;
      class_room: string;
      class_type: ClassType;
      class_teacher: string;
    };

    try {
      const updatedClass = await db.class.update({
        where: { id },
        data: {
          name,
          username,
          description,
          sectorId: sector,
          classRoomId: class_room,
          tradeId: trade,
          classType: class_type,
          classTeacher: class_teacher,
        },
      });

      return updatedClass
        ? { success: "Class updated", data: updatedClass }
        : { error: "Failed to update Class" };
    } catch (error) {
      return { error: `Error updating class: [${error}]` };
    }
  }

  async deleteClass(id: string) {
    try {
      const deletedClass = await db.class.delete({
        where: { id },
      });

      return deletedClass
        ? { success: "Class deleted", data: deletedClass }
        : { error: "Failed to delete Class" };
    } catch (error) {
      return { error: `Error deleting class: [${error}]` };
    }
  }
}

export const classService = new ClassService();
