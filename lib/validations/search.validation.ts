"use client"
 
import * as z from "zod"
 
export const searchFormSchema = z.object({
searchString: z.string().min(2, {message: 'Too short'}).max(50, {message: 'too long'}),
})

export const personalInfoFormSchema = z.object({
    name: z.string().min(5, { message: "Name can't be that short"}).max(50, { message: 'Name cannot be that long'}),
    email: z.string().email({ message: 'not a valid email'}).min(5, { message: "Name can't be that short"}).max(50, { message: 'Name cannot be that long'}),
})