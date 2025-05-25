import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 6-10 characters long",
      }
    )
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must not exceed 10 characters" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
