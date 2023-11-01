'use client'

import { forgotPasswordFormSchema } from "@/lib/validations/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { fetchUserByEmail, updateUser } from "@/lib/actions/user.actions"
import { generateRandom32ByteString } from "@/lib/utils"


const Page = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: '',
        },
      })

     async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
        form.reset()
        try{
            const user = await fetchUserByEmail(values.email)

            if(!user || !user.isEmailVerified) {
                setError('Email not found')
                return
            }

            const randomString = generateRandom32ByteString()

                await updateUser({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    password: user.password,
                    isEmailVerified: user.isEmailVerified,
                    verificationToken: randomString,
                    role: user.role,
                    accountStatus: user.accountStatus,
                })

                const res = await fetch("api/email", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        subject: 'Password Update',
                        heading: 'Forgot password',
                        content: `click the link to verify email: <a href=http://localhost:3000/forgotpassword/resetpassword/${randomString}>Click here</a>`,
                    }),
                  });
            
          
                  const data = await res.json();
                  
                  setError(data.message)

            // router.push(`/resetpassword/${user.id}`)
        } catch (error: any) {
            throw new Error(`An error occurred: ${error.message}`)
        }
      }
  return (
    <div className="flex items-center justify-center h-screen bg-blue">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      {error && (
          <div className="bg-red-500 text-white w-full text-center text-small-medium mx-auto text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <h1 className="text-center">Forgot passsword?</h1>
        <Link 
        href='/'
        className="mx-auto mb-4"
        >
            <Image 
            src='/assets/roofalogo.png'
            width={80}
            height={80}
            alt='Roofa Logo'
            />
        </Link>
        <p className="text-center text-body-semibold tracking-wide my-2">Enter the email associated <br/> with your account</p>
        <p className="text-center text-subtle-medium tracking-wide my-2">We will email you a link to <br/> reset your password</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="lucky@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded  bg-blue">Send</Button>
        <Link
        href='/login'
        className="mt-4 text-subtle-medium"
        >
            Remember password? <span className="text-blue hover:underline">Login</span>
        </Link>
      </form>
    </Form>
    </div>
  )
}

export default Page
