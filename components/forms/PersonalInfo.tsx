'use client'

import { personalInfoFormSchema } from "@/lib/validations/search.validation"
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
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import UploadUserImage from "./UploadUserImage"
import mongoose from "mongoose"

interface Props {
    name: string 
    email: string
    image: string
    signInType: 'google' | 'credentials'
    isEmailVerified: boolean
    role: string
    accountStatus: boolean
}
const PersonalInfo = ({
     name, 
     email,
     image, 
     signInType,
     isEmailVerified,
     role,
     accountStatus,
    }: Props) => {
    const [error, setError] = useState("");
    const router = useRouter();
    const path = usePathname();

    const form = useForm<z.infer<typeof personalInfoFormSchema>>({
        resolver: zodResolver(personalInfoFormSchema),
        defaultValues: {
            name: name,
            email: email,
        },
      })

     async function onSubmit(values: z.infer<typeof personalInfoFormSchema>) {
        form.reset()
        try {
            
            
        } catch (error: any) {
            throw new Error(`An error occurred: ${error.message}`)
        }
      }
  return (

   
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white shadow p-5 rounded-lg flex flex-col">
      {error && (
            <div className="bg-red-500 text-white w-full text-center text-small-medium mx-auto text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <h2 className="text-center">Update your Personal Information here</h2>
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
          name="name"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
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
                <Input placeholder="" {...field} type="email" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

      

        <Button type="submit" className="rounded  bg-blue">Update</Button>
        
      </form>
    </Form>

  )
}

export default PersonalInfo
