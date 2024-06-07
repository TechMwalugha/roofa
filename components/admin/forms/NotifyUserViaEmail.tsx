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
import sendEmail from "@/lib/emailing/nodemailer.email"

const NotifyUserViaEmail = ({
  email,
  pathToPdf

}: {
  email: string;
  pathToPdf: string;
}) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(() => false);
    const [includePdf, setIncludePdf] = useState(() => false)
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

       
          const res = await sendEmail({
            email: email, 
            subject: `${values.subject}`, 
            heading: `${values.subject}`, 
            content: `${values.message}`,
            pdfFilePath: `${includePdf ? `public/${pathToPdf}` : ''}`,
          })
            
        setLoading(false)
        if(!res) {
          alert('An error occurred, please try again')
          return
        }

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
                <Input 
                placeholder="Booking is confirmed" 
                {...field}
                />
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
                placeholder="Write your message here..... (brief & concise)"
                
                ></textarea>
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

        {
          pathToPdf && (
        <div className="flex items-center gap-5 mb-4 text-subtle-medium"> 
              <label htmlFor="includePdf">Attach pdf receipt?</label>
              <input 
              type="checkbox"
              name="sendCopy"
              id="includePdf"
              onChange={(e) => setIncludePdf(e.target.checked)}
              />
        </div>
          )
        }
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

export default NotifyUserViaEmail
