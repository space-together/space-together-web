import z from "zod";

// ----------------- FULL SECTOR (with id + timestamps) -----------------
export const sectorSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(1, { message: "Sector name is required" })
    .max(50, { message: "Maximum character is 50" }),

  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(50, { message: "Maximum character is 50" }),

  description: z
    .string()
    .max(250, { message: "Maximum character is 250" })
    .optional(),

  logo: z.string().optional(),
  logo_id: z.string().optional(),

  curriculum: z.tuple([z.number(), z.number()]).optional(), // start-end years

  country: z.string().min(1, { message: "Country is required" }),

  type: z.enum(["global", "international", "local"], {
    required_error: "Sector type is required",
  }),
  disable: z.boolean().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type SectorModel = z.infer<typeof sectorSchema>;

export const sectorBaseSchema = sectorSchema.pick({
  name: true,
  username: true,
  description: true,
  logo: true,
  country: true,
  type: true,
  curriculum: true,
  disable: true,
});

export type SectorBase = z.infer<typeof sectorBaseSchema>;
