import { z } from "zod";

export const schemaSignupForm = z
  .object({
    Name: z.string().nonempty("Name is required"),
    Email: z.string().email("Invalid Email").nonempty("Email is required"),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
    ConformPassword: z.string().nonempty("Confirm Password is required"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must read and accept this" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.ConformPassword !== data.Password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["ConformPassword"],
      });
    }
  });
export const schemaloginForm = z.object({
  Email: z.string().email("Invalid Email").nonempty("Email is required"),
  Password: z.string().nonempty("Enter Password"),
});
export const schemaEmailVerifyForm = z.object({
  Email: z.string().email("Invalid Email").nonempty("Email is required"),
});
export const schemaForgetPasswordForm = z.object({
  Email: z.string().email("Invalid Email").nonempty("Email is required"),
});
