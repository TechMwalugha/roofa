'use client'

import { resetPasswordFormSchema } from "@/lib/validations/auth.validation"
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
import mongoose from "mongoose"
import bcrypt from "bcrypt";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface Params {
    id: mongoose.Schema.Types.ObjectId,
    email: string
}
const ResetPassword = ({ id,  email }: Params) => {


    const [error, setError] = useState("");
    const [seePassword, setSeePassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
      })

     async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
        form.reset()
        try {


            if(values.password !== values.confirmPassword) {
                setError('password do not match')
                return
            }
            
            setLoading(true)
            const res = await fetch("/api/resetPassword", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: values.password,
                }),
              });
        
    
              setLoading(false)
              const data = await res.json();
              
              setError(data.message)
            
        } catch (error: any) {
            
            throw new Error(`An error occurred: ${error}`)
        }
      }


  return (
    <div className="flex items-center justify-center h-screen bg-blue">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      {error && (
            <div className="fixed top-0 bg-[rgba(0,0,0,0.5)] left-0 right-0 bottom-0 flex items-center justify-center flex-col">
              <div 
              className="bg-white rounded-sm p-5 text-subtle-medium w-1/2 flex items-center justify-center flex-col"
              >
              <Image
               src="/assets/login_notification_image.png" 
               height={100}
               width={100}
               alt="Notification icon"
               className="mb-3"
               />
                <p>{error}</p>
                { error === 'password changed successfully. Login below' &&( <Button
                className="shadow-md mt-3 bg-blue"
                onClick={() => router.push('/login')}
                >
                  Login
                </Button>
                )}

                { error !== 'password changed successfully. Login below' &&( <Button
                className="shadow-md mt-3 bg-blue"
                onClick={() => setError('')}
                >
                  Reload
                </Button>
                )}
              </div>
            </div>
          )}
      <h1 className="text-center">Reset Password.</h1>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type={seePassword ? 'text' : 'password'} />
              </FormControl>
              <div 
              className="flex items-center justify-end cursor-pointer"
              onClick={() => {
                setSeePassword((prev) => {
                  return !prev
                })
              }}
              >
                {!seePassword && (<FaEye />)}
                {seePassword && (<FaEyeSlash />)}
              </div>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" {...field} type={seePassword ? 'text' : 'password'} />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <Button 
        type="submit" 
        className="rounded bg-blue"
        disabled={loading}
        >
        {!loading && ("Reset Password")}
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
    </div>
  )
}

export default ResetPassword
