'use client'

import Image from "next/image";
import { Button } from "../ui/button";

export function AuthCallBackAlert (
    { message, setError}
     : 
     { 
        message: string
        setError: React.Dispatch<React.SetStateAction<string>>
     }) 
     {

    return (
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
                <p>{message}</p>
                <Button
                variant="outline"
                className="shadow-md mt-3 bg-blue"
                onClick={() => setError('')}
                >
                  Reload
                </Button>
              </div>
            </div>
    )
}