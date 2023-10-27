'use client'

import { registerFormSchema } from "@/lib/validations/auth.validation"
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
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
        },
      })

     async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        form.reset()
        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.fullname,
                    email: values.email,
                    password: values.password,
                }),
              });
        
      
              const data = await res.json();
              
              setError(data.message)
      
            
        } catch (error: any) {
            throw new Error(`An error occurred: ${error.message}`)
        }
      }
  return (
    <div className="flex items-center justify-center h-screen bg-blue">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      {error && (
            <div className="bg-red-500 text-white w-fit mx-auto text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
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
      <button 
      type="button"  
      onClick={() => signIn('google')}
      className="flex items-center justify-center p-3 gap-3 my-3 rounded bg-blue"
      > 
      < FcGoogle size={20} /> Login with Google
      </button>
      <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Full Name:</FormLabel>
              <FormControl>
                <Input placeholder="Lucky Kibe" {...field} />
              </FormControl>
              <FormMessage className="text-tiny-medium"/>
            </FormItem>
          )}
        />
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
              <FormMessage className="text-tiny-medium"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage className="text-subtle-medium" />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full">Login</Button>
        <Link
        href='/register'
        className="mt-4 text-subtle-medium"
        >
            Have an account? <span className="text-blue">Sign In</span>
        </Link>
      </form>
    </Form>
    </div>
  )
}

export default RegisterForm
