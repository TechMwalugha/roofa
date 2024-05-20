"use client"
 
import * as z from "zod"

const trimString = (u: unknown) => typeof u === "string" ? u.replaceAll(' ','') : u;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.* ).{6,16}$/;
 
export const loginFormSchema = z.object({
  email: z.preprocess(trimString, z.string().min(4, {message: 'Email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email.").email()),
  password: z.preprocess(trimString, z.string().min(8, {message: 'Minimum 8 characters'}).max(16, {message: 'Maximum 16 characters'}).regex(passwordRegex, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special charater" })),
})



export const registerFormSchema = z.object({
  fullname: z.string().min(4, {message: 'Name is too short'}).max(30, {message: 'too long'}),
  email: z.preprocess(trimString, z.string().min(4, {message: 'Email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email.").email()),
  password: z.preprocess(trimString, z.string().min(8, {message: 'Minimum 8 characters'}).max(16, {message: 'Maximum 16 characters'}).regex(passwordRegex, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special charater" })),
  confirmPassword: z.preprocess(trimString, z.string()),
 }).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

 export const forgotPasswordFormSchema = z.object({
  email: z.preprocess(trimString, z.string().min(4, {message: 'Email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email.").email()),
 })

 export const resetPasswordFormSchema = z.object({
  password: z.preprocess(trimString, z.string().min(8, {message: 'Minimum 8 characters'}).max(16, {message: 'Maximum 16 characters'}).regex(passwordRegex, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special charater" })),
  confirmPassword: z.preprocess(trimString, z.string()),
   }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  })

   //image rules
   const MAX_FILE_SIZE = 5 * 1024 * 1024;
   const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


  export const uploadUserImage = z.object({
    profileImage: z
    .any()
  })