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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
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
        setError("processing")
      setEmail(values.email)
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
              const notifyError = () => toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: "mwal",
                theme: "dark"
              });
              if (data.message !== "User registered.") {
                notifyError()
              }
      
            
        } catch (error: any) {
            throw new Error(`An error occurred: ${error.message}`)
        }
      }
  return (
    <div className="flex items-center justify-center h-screen bg-blue">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      {/* {error && error !== "User registered." && (
            <div className="bg-red-500 text-white w-full mx-auto text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )} */}

      <ToastContainer
       />
          {error === "User registered." && (
            <div className="bg-green-200 flex flex-col text-white w-full text-center mx-auto text-sm py-1 px-3 rounded-md mt-2">
              <p className="">{error}</p>
              <Link href={`/verify/${email}`} className="block bg-primary-500 p-1 rounded-md text-small-medium">Verify Email</Link>
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
        <Button type="submit" className="rounded-md bg-blue hover:bg-blue-gray-500">
          {error !=="processing" && ("Register")}
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
        href='/login'
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
