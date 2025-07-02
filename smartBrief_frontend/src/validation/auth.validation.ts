import { z } from "zod";

export const signupValidationSchema = z
  .object({
    name: z.string({
      required_error: "Please enter your name!",
      invalid_type_error: "Name must be a string",
    }).min(1, "Please enter your name!"),
    email: z.string({
      required_error: "Please enter your email!",
      invalid_type_error: "Email must be a string",
    }).email("Please enter a valid email address!"),
    password: z
      .string({
        required_error: "Please enter a password!",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Please give a strong password with at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });


export const loginValidationSchema = z
  .object({

    email: z.string({
      required_error: "Please enter your email!",
      invalid_type_error: "Email must be a string",
    }).email("Please enter a valid email address!"),
    password: z
      .string({
        required_error: "Please enter a password!",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Please give a strong password with at least 6 characters"),
  })
