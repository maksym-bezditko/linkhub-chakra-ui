import { checkForEmailExistence, checkForNicknameExistence } from "@/helpers";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine(async (e) => {
        const exists = await checkForEmailExistence(e);

        return !exists;
      }, "This email is already in use, try another one"),
    nickname: z
      .string()
      .max(50, {
        message: "Your username is too long (should be less than 50 symbols)",
      })
      .refine(async (e) => {
        const exists = await checkForNicknameExistence(e);

        return !exists;
      }, "This username is already in use, try another one"),
    firstName: z.string().max(50, {
      message: "Your first name is too long (should be less than 50 symbols)",
    }),
    lastName: z.string().max(50, {
      message: "Your last name is too long (should be less than 50 symbols)",
    }),
    bio: z.string().max(300, {
      message: "Your bio is too long (should be less than 300 symbols)",
    }),
    birthday: z.date(),
    sex: z.enum(["MALE", "FEMALE"]),
    password: z.string().min(6, {
      message: "Password cannot be less than 6 symbols long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Make sure your passwords match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
