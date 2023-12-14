'use client'

import { bookingDetailsFormSchema } from "@/lib/validations/payment.validation"
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
import {  signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { useRouter } from "next/navigation"

const BookingDetailsForm = () => {
    const { data: session } = useSession()
    // console.log(session)


    const [error, setError] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof bookingDetailsFormSchema>>({
        resolver: zodResolver(bookingDetailsFormSchema),
        defaultValues: {
            email: '',
            fullName: '',
            reportingDate: new Date(),
            mpesaPhoneNumber: '',
            identityNumber: '',
            gender: undefined,
        },
      })

     async function onSubmit(values: z.infer<typeof bookingDetailsFormSchema>) {
   
      }
  return (
    <div className="md:w-2/4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg flex flex-col">
      {error && (
            <div className="bg-red-500 text-white w-full text-center text-small-medium mx-auto text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        <Link 
        href='/'
        className="mx-auto mb-4 flex items-center gap-2 text-heading3-bold"
        >
            <Image 
            src='/assets/roofalogo2.png'
            width={80}
            height={80}
            alt='Roofa Logo'
            />
      <h3>Pay</h3>
        </Link>
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
          name="fullName"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} type="string" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

       <FormField
          control={form.control}
          name="reportingDate"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Reporting Date <span className="text-subtle-medium italic">*must be within the next 10 days</span></FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="date" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

       <FormField
          control={form.control}
          name="mpesaPhoneNumber"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>M-pesa Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="07*** | 01*** | 2547*** | 2541***" {...field} type="string" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identityNumber"
          render={({ field }) => (
            <FormItem
            className='mb-2'
            >
              <FormLabel>Identity Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567" {...field} type="string" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          defaultValue="female"
          render={({ field }) => (
            <FormItem
            className='mb-2 flex items-center'
            >
              <FormLabel>Female</FormLabel>
              <FormControl>
                <Input placeholder="1234567" {...field} type="radio" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

       <FormField
          control={form.control}
          name="gender"
          defaultValue="male"
          render={({ field }) => (
            <FormItem
            className='mb-5 flex items-center'
            >
              <FormLabel>Male</FormLabel>
              <FormControl>
                <Input placeholder="1234567" {...field} type="radio" className="" />
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />



        <Button type="submit" className="rounded  bg-blue">Book</Button>

        <h4 className="text-subtle-medium my-5 italic">
            <span className="text-danger">Please note: </span>

            RoofaPay will never ask you for your password , PIN, CVV or full card details over the phone, SMS or email.
        </h4>

        <Image 
        src="/assets/safe-checkout.png"
        width={80}
        height={80}
        className="w-full object-cover"
        alt='Safe checkout Image'
        />
        <p className="text-tiny-medium italic text-center">secured checkout with RoofaPay in partnership with tinypesa</p>
      </form>
    </Form>
    </div>
  )
}

export default BookingDetailsForm
