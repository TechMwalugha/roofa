'use client'

import * as z from "zod"

export const CreateNotificationFormSchema = z.object({
    subject: z.string().min(4, {
        message: "The subject is too short"
    }).max(100, {
        message: "The subject is quite long"
    }),
    message: z.string().min(4, {
        message: "The message is too short"
    })
})