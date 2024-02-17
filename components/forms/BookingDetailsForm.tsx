'use client'

import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';


const BookingDetailsForm = ({
  email,
  name,
  rentalId
}: {
  email: string
  name: string
  rentalId: string
}) => {
  const router = useRouter();
  const [transactionResponse, setTransactionResponse] = useState("");
  const [loading, setLoading] = useState<boolean>(false)

  const CloseButton = ({ closeToast }: { closeToast: any}) => (
    <div
    onClick={closeToast}
    >
      <MdOutlineClose size={30} />
    </div>
  )

  const notifyError = (message: string) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: "mwal",
    theme: "dark"
  });

  const notifySuccess = (message: string) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: "mwalsuccess",
    theme: "dark"
  });

    const form = useForm<z.infer<typeof bookingDetailsFormSchema>>({
        resolver: zodResolver(bookingDetailsFormSchema),
        defaultValues: {
            email: email || '',
            fullName: name || '',
            reportingDate: new Date(),
            mpesaPhoneNumber: '',
            identityNumber: '',
            gender: undefined,
        },
      })

     async function onSubmit(values: z.infer<typeof bookingDetailsFormSchema>) {
      setLoading(true)
      
      try{
        const res = await fetch("/api/payments/transact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: values.email,
            fullName: values.fullName,
            reportingDate: values.reportingDate,
            mpesaPhoneNumber: values.mpesaPhoneNumber,
            identityNumber: values.identityNumber,
            gender: values.gender,
            rentalId: rentalId
          })
        });

        const data = await res.json()
        console.log(data)

        if(data.message !== "Request accepted for processing. Complete payment") {
          notifyError('An error occurred. Please try again')
          setLoading(false)
          return 
        }
        // Redirect to payment page with transaction id

        setLoading(false)
        setTransactionResponse(data.id)


      }catch(error: any) {
        throw error.message
      }
  }
  return (
    <div className="md:w-2/4 shadow-count rounded">
      <ToastContainer
      closeButton={CloseButton}
       />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-white p-5 rounded-lg flex flex-col">
          <div className={`w-full h-full bg-[rgba(0,0,0,0.4)] fixed z-10 ${transactionResponse ? 'top-1/2' : '-top-1/2'} left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-3 transition-all ease delay-4000`}>
            <div className="w-1/2 h-1/2 bg-white max-sm:w-full text-center text-small-medium text-sm py-1 px-3 rounded shadow-sm flex items-center justify-center flex-col">
              <div>
                <img src='/assets/success-gif.gif' className='w-24'/>
              </div>
                  <h6>Payment initiated successfully.</h6> 
              <p className='text-subtle-medium lowercase mt-2'>please check your phone and enter the pin to complete the transaction, if you have completed the transaction click the button below. </p>
                <Link 
                href={`/payments/rental-payment/${transactionResponse}`}
                className='bg-blue p-3 rounded mt-4 shadow'
                >
                  Confirm Transaction
                </Link>
            </div>
          </div>
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
                <Input placeholder="lucky@gmail.com" {...field}  className="text-small-semibold" disabled={loading}/>
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
                <Input placeholder="John Doe" {...field} type="string"  className="text-small-semibold" disabled={loading}/>
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
              <FormLabel>Reporting Date <span className="text-subtle-medium italic">*must be within the next 10 days*</span></FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="date" className="text-small-semibold" disabled={loading}/>
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
                <Input placeholder="07*** | 01*** | 2547*** | 2541***" {...field} type="string"  className="text-small-semibold" disabled={loading}/>
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
                <Input placeholder="1234567" {...field} type="string"  className="text-small-semibold" disabled={loading}/>
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

        <div
        className="flex items-center gap-5"
        >
        <FormField
          control={form.control}
          name="gender"
          // defaultValue="female"
          render={({ field }) => (
            <FormItem
            className='flex items-center gap-3'
            >
              <div
              className="flex items-center gap-3"
              >
              <FormLabel>Female</FormLabel>
              <FormControl>
                <Input placeholder="1234567" {...field} type="radio" value="female" disabled={loading}/>
              </FormControl>
              </div>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
            </FormItem>
          )}
        />

       <FormField
          control={form.control}
          name="gender"
          // defaultValue="male"
          render={({ field }) => (
            <FormItem
            >
              <div
              className="flex items-center gap-3"
              >
             <FormLabel>Male</FormLabel>
              <FormControl>
                <Input placeholder="1234567" {...field} type="radio" value="male" disabled={loading}/>
              </FormControl>
              <FormMessage className="text-subtle-medium bg-red-500 p-1 text-center rounded-sm"/>
              </div>
            </FormItem>
          )}
        />
        </div>



        <Button 
        type="submit" 
        className="rounded bg-blue"
        disabled={loading}
        >
          {!loading && 'Book'}
          {loading && (<><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  </svg>
  Processing...</>)}
        </Button>

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
