"use client"
 
import * as z from "zod"
 
export const searchFormSchema = z.object({
searchString: z.string().min(2, {message: 'Too short'}).max(50, {message: 'too long'}),
})