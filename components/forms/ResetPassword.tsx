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

interface Params {
    id: mongoose.Schema.Types.ObjectId,
    email: string
}
const ResetPassword = ({ id,  email }: Params) => {


    const [error, setError] = useState("");

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
            <div className=" text-black w-full text-center text-small-medium mx-auto text-sm py-1 px-3 rounded-md mt-2">
              <p>{error}</p>
              {error === 'password reset successfully.' && <Link href='/login' className="bg-blue w-full rounded p-2 text-center mt-2">Login</Link>}
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
                <Input placeholder="*******" {...field} type="password" />
              </FormControl>
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
                <Input placeholder="*******" {...field} type="password" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded  bg-blue">Reset Password</Button>
      </form>
    </Form>
    </div>
  )
}

export default ResetPassword
