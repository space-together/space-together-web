import { ClassRoom, Education, Sector, Subject, User, UserRole } from './../../../prisma/prisma/generated/index.d';
import { classRoomSchema, classRoomSchemaType } from '@/utils/schema/classRoomSchema';
import { educationSchema, educationSchemaType, educationSchemaTypeUpdate, educationSchemaUpdate } from '@/utils/schema/educationSchema';
import { sectorSchema, sectorSchemaType } from '@/utils/schema/sectorSchema';
import { subjectSchema, subjectSchemaType } from '@/utils/schema/subject-schema';
import apiRequest from '../api-request';
import { onboardingSchema, onboardingSchemaTypes } from '@/utils/schema/userSchema';

//------- User --------------
export const getUserByIdApi = (id: string) => apiRequest<void, User>('get', `/users/${id}`)

export const updateUserByUserSession = async (values: onboardingSchemaTypes, id: string, session: string) => {
  const validation = onboardingSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid data" };
  }
  const { image, age, phone, gender, role, } = validation.data;
  return await apiRequest<onboardingSchemaTypes, User>('put', `/users/session/${id}`, {
    image, age, phone, gender, role: role as UserRole
  }, session)
};

// -------- Main Class API ---------
export const createMainClassAPI = (mainClass: classRoomSchemaType) =>
  apiRequest<classRoomSchemaType, ClassRoom>('post', '/classes/room', mainClass);

export const getAllMainClassAPI = () =>
  apiRequest<void, ClassRoom[]>('get', '/classes/room');

export const getMainClassByIdAPI = (id: string) =>
  apiRequest<void, ClassRoom>('get', `/classes/room/${id}`);

export const deleteMainClassAPI = (id: string) =>
  apiRequest<void, void>('delete', `/classes/room/${id}`);

export async function updateMainClassAPI(values: classRoomSchemaType, id: string) {
  const validation = classRoomSchema.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, username, description, symbol, sector, trade, class_room_type } = validation.data;
  const updatedData = {
    name,
    sector_id: sector,
    trade_id: trade,
    class_room_type,
    username,
    description,
    symbol: symbol || null
  };

  return apiRequest<typeof updatedData, ClassRoom>('put', `/classes/room/${id}`, updatedData);
}

// -------- Education API ---------
export const getAllEducationAPI = () =>
  apiRequest<void, Education[]>('get', '/education');

export const deleteEducationAPI = (id: string) =>
  apiRequest<void, void>('delete', `/education/${id}`);

export async function createEducationAPI(values: educationSchemaType) {
  const validation = educationSchema.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, username, description, logo } = validation.data;
  const data = {
    name, username, description, symbol: logo || null
  }
  return apiRequest<typeof data, Education>('post', '/education', data);
}

export async function updateEducationAPI(values: educationSchemaTypeUpdate, id: string) {
  const validation = educationSchemaUpdate.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, username, description, logo } = validation.data;
  const data = {
    name, username, description, symbol: logo || null
  }
  return apiRequest<typeof data, Education>('put', `/education/${id}`, data);
}

// -------- Sector API ---------
export const getAllSectorAPI = () =>
  apiRequest<void, Sector[]>('get', '/school/sector');

export const deleteSectorAPI = (id: string) =>
  apiRequest<void, void>('delete', `/school/sector/${id}`);

export async function createSectorAPI(values: sectorSchemaType) {
  const validation = sectorSchema.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, username, description, logo, education } = validation.data;
  const data = {
    name, username, description, symbol: logo || null, education
  }
  return apiRequest<typeof data, Sector>('post', '/school/sector', data);
}

export async function updateSectorAPI(values: sectorSchemaType, id: string) {
  const validation = sectorSchema.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, username, description, logo, education } = validation.data;
  const data = {
    name, username, description, symbol: logo || null, education
  }
  return apiRequest<typeof data, Sector>('put', `/school/sector/${id}`, data);
}

// -------- Subject API ---------
export const getAllSubjectsAPI = () =>
  apiRequest<void, Subject[]>('get', '/subject');

export const getAllSubjectsByMainClassAPI = (mainClass: string) =>
  apiRequest<void, Sector[]>('get', `/subject/class-room/${mainClass}`);

export const deleteSubjectAPI = (id: string) =>
  apiRequest<void, void>('delete', `/subject/${id}`);

export async function createSubjectAPI(values: subjectSchemaType) {
  const validation = subjectSchema.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, code, purpose, learningHours, symbol } = validation.data;
  const data = {
    name, code, purpose, learningHours, symbol: symbol || null
  }
  return apiRequest<typeof data, Subject>('post', '/subject', data);
}

export async function updateSubjectAPI(values: subjectSchemaType, id: string) {
  const validation = subjectSchema.safeParse(values);
  if (!validation.success) return { error: "Invalid values" };

  const { name, code, purpose, learningHours, symbol } = validation.data;
  const data = {
    name, code, purpose, learningHours, symbol: symbol || null
  }
  return apiRequest<typeof data, Subject>('put', `/subject/${id}`, data);
}
