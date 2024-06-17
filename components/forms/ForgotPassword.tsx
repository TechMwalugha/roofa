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
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {  fetchUserForgotPasswordAction, updateUser } from "@/lib/actions/user.actions"
import { generateRandom32ByteString } from "@/lib/utils"


const ForgotPassword = () => {
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: '',
        },
      })

     async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
        form.reset()
        try{
    
          setLoader(true)          
              
            const user = await fetchUserForgotPasswordAction({ email: values.email })

            if(!user) {
              setLoader(false)
                setError('No user found. Please ensure the email is correct.')
                return
            }
            if(!user.isEmailVerified) {
              setLoader(false)
                setError('Email, not verified. Please Login to verify email.')
                return
            }
            if(user.signInType === "google") {
              setLoader(false)
              setError('This email uses google signin. Please login using google.')
              return
            }

            const randomString = generateRandom32ByteString()

                await updateUser({
                    email: user.email,
                    type: 'verificationToken',
                    content: randomString,
                })

                const res = await fetch("api/email", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        subject: 'Password Update',
                        heading: 'Forgot password',
                        content: `click the button below to reset password: 
                        <br /> 
                        <br /> 
                        <br /> 
                        <a 
                        style="background-color: #67C1CA; text-decoration: none; 
                        color:black;  
                        padding: 10px 30px; 
                        font-weight: bold;"
                        href=https://roofa.co.ke/forgotpassword/resetpassword/${randomString}>
                        Click here
                        </a>
                        <br/>
                        <br/>
                        <br/>
                        Or
                        <br/>
                        <br/>
                        paste this url on your browser: 
                        <br/>
                        <br/>
                        https://roofa.co.ke/forgotpassword/resetpassword/${randomString}
                        <br/>
                        <br/>
                        If you did not request this, please ignore this email and your password will remain unchanged.
                        `,
                    }),
                  });
            
          
                  const data = await res.json();
                  setLoader(false)
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
            <div className="fixed top-0 bg-[rgba(0,0,0,0.5)] left-0 right-0 bottom-0 flex items-center justify-center flex-col px-2">
              <div 
              className="bg-white rounded-sm p-5 text-subtle-medium w-full md:w-1/2 flex items-center justify-center flex-col"
              >
              <Image
               src="/assets/login_notification_image.png" 
               height={100}
               width={100}
               alt="Notification icon"
               className="mb-3"
               />
                <p>{error}</p>
                {error === 'Email, not verified. Please Login to verify email.' && ( <Button
                className="shadow-md mt-3 bg-blue"
                onClick={() => router.push(`/login`)}
                >
                  Login
                </Button> 
                )}

            {error === 'This email uses google signin. Please login using google.' && ( <Button
                className="shadow-md mt-3 bg-blue"
                onClick={() => router.push(`/login`)}
                >
                  Login
                </Button> 
                )}

             { ( error === 'No user found. Please ensure the email is correct.' || error === "Check your email, the link has been sent." ) && ( <Button
                className="shadow-md mt-3 bg-blue"
                onClick={() => setError('')}
                >
                  Reload
                </Button> 
                )}
              </div>
            </div>
          )}
          <h1 className="text-center">Forgot passsword?</h1>
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
        <p className="text-center text-body-semibold tracking-wide my-2">Enter the email associated <br/> with your account</p>
        <p className="text-center text-subtle-medium tracking-wide my-2">We will email you a link to <br/> reset your password</p>
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
        <Button 
        type="submit" 
        className="rounded  bg-blue"
        disabled = {loader}
        >
          {!loader && (<h4>Send</h4>)}
          {loader && (
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
          )
          }
          </Button>
        <Link
        href='/login'
        className="mt-4 text-subtle-medium"
        >
            Remember password? <span className="text-blue hover:underline">Login</span>
        </Link>
      </form>
    </Form>
    </div>
  )
}


   

export default ForgotPassword
