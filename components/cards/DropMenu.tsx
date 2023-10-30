'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
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

export default function DropdownMenuDemo() {
  const { data: session } = useSession()
  const router = useRouter()

  const [position, setPosition] = React.useState("bottom")
  return (
   session ? ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="border-none outline-none no-focus"><RiAccountPinCircleLine size={35}/></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 absolute right-1 custom-scrollbar">
      <DropdownMenuLabel>Account Details</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top" onClick={() => alert('hello')}>Profile</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom" onClick={() => router.push('/api/auth/signout')}>Log Out</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>) : ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="border-none outline-none no-focus"><RiAccountPinCircleLine size={35}/></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 absolute right-1 custom-scrollbar">
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top" onClick={() => router.push('/login')}>Sign In</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom" onClick={() => router.push('/register')}>Register</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>)
  )
}
