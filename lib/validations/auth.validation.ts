"use client"
 
import * as z from "zod"
 
export const loginFormSchema = z.object({
   email: z.string().min(4, {message: 'email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email."),
   password: z.string().min(6, {message: 'minimum six characters'}).max(20, {message: 'maximum 20 characters'})
})

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,20}$/;


export const registerFormSchema = z.object({
  fullname: z.string().min(4, {message: 'Name is too short'}).max(30, {message: 'too long'}),
  email: z.string().min(4, {message: 'Email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email."),
  password: z.string().min(6, {message: 'Minimum six characters'}).max(20, {message: 'Maximum 20 characters'}).regex(passwordRegex, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special charater" }),
  confirmPassword: z.string(),
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
   email: z.string().min(4, {message: 'email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email."), 
 })

 export const resetPasswordFormSchema = z.object({
   password: z.string().min(2, {message: 'Too short'}).max(20, {message: 'too long'}).regex(passwordRegex, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special charater" }),
   confirmPassword: z.string().min(2, {message: 'Too short'}).max(50, {message: 'too long'}),
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