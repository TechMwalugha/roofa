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
import {  useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import UserInfoAlertBox from "../shared/alerts/UserInfoAlertBox"
import { updateUserProfile } from "@/lib/actions/user.actions"
import { useSession, signOut } from "next-auth/react"

interface Props {
  id: string
  name: string 
  email: string
  image: string
  signInType: 'google' | 'credentials'
  isEmailVerified: boolean
  role: string
  accountStatus: boolean
}
const PersonalInfo = ({
     id,
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

    const { data: session } = useSession()

    
    const form = useForm<z.infer<typeof personalInfoFormSchema>>({
        resolver: zodResolver(personalInfoFormSchema),
        defaultValues: {
            name: name,
            email: email,
        },
      })

     async function onSubmit(values: z.infer<typeof personalInfoFormSchema>) {
        form.reset()

        
        if(session?.user?.name === values.name && session.user?.email === values.email) {
          alert('no change detected!')
          return
        }

        if(session?.user?.email !== values.email) {
          const confirmWithUser = confirm(`Are you sure you want to update your email to: ${values.email}`)

          if(!confirmWithUser) {
            return
          }
        }
        try {
          
          updateUserProfile({
            id: id as any, 
            name: values.name, 
            email: values.email,
            path: path
          })

          signOut()
          
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
        <div className="my-3 ml-auto">
        <UserInfoAlertBox
        signInType = {signInType}
        isEmailVerified = {isEmailVerified}
        role = {role}
        accountStatus = {accountStatus}
         />
        </div>
      
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
              <FormDescription className="text-subtle-medium">Use an address you’ll always have access to.</FormDescription>
              <FormControl>
                <Input placeholder="" {...field} type="email" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
      <p className="text-subtle-medium text-center mb-2 text-red-400">Once you update this data you'll have to login again</p>

        <Button type="submit" className="rounded  bg-blue">Update</Button>
        
      </form>
    </Form>

  )
}

export default PersonalInfo
