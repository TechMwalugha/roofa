'use client'

import { loginFormSchema } from "@/lib/validations/auth.validation"
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
import {  signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
      })

     async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        form.reset()
        setError("processing")
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            })

            if(res?.error === 'Email is not verified') router.push(`/verify/${values.email}`)

            if(res?.error) {
                setError(res.error)
                return
            }
            setError(" ")

            // Redirect to the home page after successful authentication
            router.push("/")
            
        } catch (error: any) {
            throw new Error(`An error occurred: ${error.message}`)
        }
      }
  return (
    <div className="flex items-center justify-center h-screen bg-blue">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      {error && error !== "processing" && (
            <div className="bg-red-500 text-white w-full text-center text-small-medium mx-auto text-sm py-1 px-3 rounded-md mt-2">
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
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded  bg-blue">
          
          {error !=="processing" && ("Login")}
          {error === "processing" && (
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
        <Link
        href='/register'
        className="mt-4 text-subtle-medium"
        >
            Don't have an account? <span className="text-blue hover:underline">Sign Up</span>
        </Link>

        <Link
        href='/forgotpassword'
        className="mt-4 text-subtle-medium"
        >
           <span className="text-blue">Forgot password?</span>
        </Link>
      </form>
    </Form>
    </div>
  )
}

export default LoginForm
