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
import Link from "next/link"
import { AiOutlineDelete} from 'react-icons/ai'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { deleteUser } from "@/lib/actions/user.actions"



const DeleteAccountForm = ({id}: { id: string}) => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session } = useSession() as any

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: '',
        },
      })

     async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
        form.reset()
        try {

            if(session?.user?.email !== values.email) {
                setError('Email does match.')
                return 
            } 
            if(session?.user?.id !== id) {
                setError('Unable to delete account')

                signOut()
                return
            }

            deleteUser(id as any)
            signOut()

            
        } catch (error: any) {
            throw new Error(`An error occurred: ${error.message}`)
        }
      }
  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col bg-white shadow-md">
      {error && (
            <div className="bg-red-500 text-white w-full text-center text-small-medium mx-auto text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

        <div className="flex items-center mx-auto my-5 justify-center bg-blue rounded-full w-14 h-14">
            <AiOutlineDelete className="text-6x text-red-500" size={35}/>
        </div>

        <h2 className="text-center text-regular-medium capitalize text-red-700 tracking-wider mb-5">Delete account</h2>
        <p className="text-center text-tiny-medium text-red-500 mb-5">WARNING: this is permanent<br/> and it cannot be undone!</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Confirm Email</FormLabel>
              <FormControl>
                <Input placeholder="lucky@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="rounded  bg-blue">Delete</Button>
        <Link
        href='/'
        className="mt-4 text-subtle-medium"
        >
            Go back? <span className="text-blue hover:underline">Home</span>
        </Link>
      </form>
    </Form>
  )
}

export default DeleteAccountForm
