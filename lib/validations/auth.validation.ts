"use client"
 
import * as z from "zod"
 
export const loginFormSchema = z.object({
   email: z.string().min(4, {message: 'email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email."),
   password: z.string().min(6, {message: 'minimum six characters'}).max(20, {message: 'maximum 20 characters'})
//    .refine((e) => {
//     const hasUppercase = /[A-Z]/.test(e);
//   const hasLowercase = /[a-z]/.test(e);
//   const hasSpecialCharacter = /[!@#\$%\^&*]/.test(e);

//   // Check if all conditions are met
//    return hasUppercase && hasLowercase && hasSpecialCharacter

//    }, {
//     message: "uppercase, lowercase & special characters"
//    }),
})

export const registerFormSchema = z.object({
    fullname:  z.string().min(4, {message: 'Name is too short'}).max(30, {message: 'too long'}),
    email: z.string().min(4, {message: 'email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email."),
    password: z.string().min(6, {message: 'minimum six characters'}).max(20, {message: 'maximum 20 characters'})
 })

 export const forgotPasswordFormSchema = z.object({
   email: z.string().min(4, {message: 'email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email."), 
 })

 export const resetPasswordFormSchema = z.object({
   password: z.string().min(2, {message: 'Too short'}).max(50, {message: 'too long'}),
   confirmPassword: z.string().min(2, {message: 'Too short'}).max(50, {message: 'too long'}),
   })
