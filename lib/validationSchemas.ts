import * as z from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().min(1, { message: "Required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z.string(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" }),
});
