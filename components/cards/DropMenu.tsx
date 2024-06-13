'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { containsGoogleusercontent } from '@/lib/utils'
import { fetchUserUnreadMessages } from '@/lib/actions/user.actions'

export default function DropdownMenuDemo() {
  const { data: session } = useSession()
  const [unreadMessages, setUnreadMessages] = React.useState(0)
  
  const router = useRouter()

  const [position, setPosition] = React.useState("bottom")

  let image = session?.user?.image 

  //check if is a google image
  if(image && !containsGoogleusercontent(image as string)) {
   image = `https://roofa.co.ke/images${image}`
  }

  useEffect(() => {
    if(session) {
      fetchNumberOfUnreadMessages(session?.user?.email as string).then((data: any) => {
        setUnreadMessages(data)
      })
    }

  }, [session])

  return (
   session ? ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className=" relative border-none outline-none no-focus">
        <Image
          className="inline-block w-8 h-8 rounded-full object-cover"
          src={image as string}
          alt="profile image"
          width={35}
          height={35}
        />

        {
          unreadMessages > 0 && (
            <span className="absolute top-0 right-1 bg-red-600 w-4 h-4 rounded-full flex items-center justify-center text-white text-subtle-medium">
              {unreadMessages}
            </span>
          )
        }

      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 absolute right-1 custom-scrollbar">
      <DropdownMenuLabel>Account Details</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className='text-small-medium tracking-wider'>
        <DropdownMenuRadioItem value="one" 
        onClick={() => router.push('/user/notifications')}
        className='cursor-pointer hover:bg-gray-200'
        >
          Notifications
          {
            unreadMessages > 0 && (
              <span className='bg-red-600 w-2 h-2 rounded-full'></span>
            )
          }
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="two" 
        onClick={() => router.push('/user/bookings')}
        className='cursor-pointer hover:bg-gray-200'
        >Bookings</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="three" 
        onClick={() => router.push('/user/payments')}
        className='cursor-pointer hover:bg-gray-200'
        >Payments</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="four" 
        onClick={() => router.push('/user/favorites')}
        className='cursor-pointer hover:bg-gray-200'
        >Favorites</DropdownMenuRadioItem>
        <hr className='my-3'/>
        <DropdownMenuRadioItem value="five" 
        onClick={() => router.push('/user/account-settings')}
        className='cursor-pointer hover:bg-gray-200'
        >Account</DropdownMenuRadioItem>
        <hr className='my-3'/>
        <DropdownMenuRadioItem value="six" 
        onClick={() => router.push('/api/auth/signout')}
        className='cursor-pointer hover:bg-gray-200'
        >Log Out</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  ) : ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="border-none outline-none no-focus"><RiAccountPinCircleLine size={35}/></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 absolute right-1 custom-scrollbar">
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top" 
        onClick={() => router.push('/login')}
        className='cursor-pointer hover:bg-gray-200'
        >Log In</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom" 
        onClick={() => router.push('/register')}
        className='cursor-pointer hover:bg-gray-200'
        >Sign Up</DropdownMenuRadioItem>
        <hr className='my-3'/>
        <DropdownMenuRadioItem value="right"
        className='cursor-pointer hover:bg-gray-200'
        >Help Center</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>)
  )
}

async function fetchNumberOfUnreadMessages(email: string) {
  let unreadMessages =  await fetchUserUnreadMessages({ email: email})
  
  return unreadMessages
}
