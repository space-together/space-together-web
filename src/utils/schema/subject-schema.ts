import z from "zod";

export const subjectSchema = z.object({
 name :z.string().min(1, {
  message : "Name is required"
 }).max(50, {
  message : "Maxlength is 50"
 }),
 code : z.string().min(1, {
  message : "Code is required"
 }).max(12, {
  message : "Maxlength is 12"
 }),
 purpose : z.string().min(1, {
  message : "Purpose is required"
 }).max(80, {
  message : "Maxlength of subject purpose is 80"
 }),
 learningHours : z.string().min(1, {
  message : "learningHours is required"
 }).max(5, {
  message : "Maxlength 5"
 }),
 symbol : z.string()
});

export type subjectSchemaType = z.infer<typeof subjectSchema>;
