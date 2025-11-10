import { z } from "zod";

export const IZodSchema = z.object({
  firstName: z.string().min(2, "Firstname is required"),

  lastName: z.string().min(2, "lastname is required"),

  email: z.string().email("Invalid email"),

  // mobile: z
  //   .number()
  //   .min(10, "Mobile must be 10 digits")
  //   .max(10, "Mobile must be 10 digits"),

  mobile: z
    .string()
    .regex(/^\d*$/, "Only numbers are allowed") // allows only digits
    .min(10, "Mobile must be 10 digits")
    .max(10, "Mobile must be 10 digits"),

  // username: z
  //   .string()
  //   .lowercase("Username is must be in lowercase")
  //   .min(6, "username must be greater than 6 characters")
  //   .regex(/^[A-Za-z]+$/, "username cannot contain numbers"),
  username: z
    .string()
    .min(6, "Username must be at least 6 characters") // optional, adjust as needed
    .regex(
      /^[a-z]+$/,
      "Username must contain only lowercase letters and no numbers or special characters"
    ),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
    .regex(/(?=.*[a-z])/, "Password must contain at least 1 lowercase letter")
    .regex(/(?=.*[0-9])/, "Password must contain at least 1 number")
    .regex(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least 1 special character"
    ),

  age: z
    .string()
    .regex(/^\d*$/, "Only numbers are allowed") // allows only digits
    .min(1, "age must be 1 digits")
    .max(3, "age must be 2 digits"),

  isActive: z.boolean(),
  userType: z.enum(["user", "admin", "employee"], "Select user type"),
});
