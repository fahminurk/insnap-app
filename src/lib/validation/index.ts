import * as z from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(2, { message: "Too short" }),
  name: z.string().min(2, { message: "Too short" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
