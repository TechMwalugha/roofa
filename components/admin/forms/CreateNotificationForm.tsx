'use client'

import { CreateNotificationFormSchema } from "@/lib/validations/Notification.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ObjectId } from "mongoose"
import { createNewNotification } from "@/lib/actions/notification.action"

const CreateNotificationForm = ({
  userId,
  sessionUserId
}: {
  userId: string
  sessionUserId: string
}) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(() => false);
    const router = useRouter();


    const form = useForm<z.infer<typeof CreateNotificationFormSchema>>({
        resolver: zodResolver(CreateNotificationFormSchema),
        defaultValues: {
            subject: '',
            message: '',
        },
      })

     async function onSubmit(values: z.infer<typeof CreateNotificationFormSchema>) {
        // form.reset()
         setLoading(true)
       
          createNewNotification({
            from: sessionUserId as unknown as ObjectId,
            to: userId as unknown as ObjectId,
            subject: values.subject,
            message: values.message,
          })
            
        setLoading(false)

        alert("Message sent successfully")
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Malicious activity on your account" {...field} />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >

              <FormControl>
                <textarea 
                {...field} 
                cols={15} 
                rows={15}
                className="w-full border p-3 rounded"
                placeholder="your message goes here..."
                ></textarea>
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded  bg-blue">
          
          {!loading && ("Send")}
          {loading && (
            <h2 className="flex gap-2 items-center">
            <svg
              className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg> Processing...
            </h2>
          )}
        </Button>
        
     
      </form>
    </Form>

  )
}

export default CreateNotificationForm