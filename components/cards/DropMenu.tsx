'use client'
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

export default function DropdownMenuDemo() {
  const [position, setPosition] = React.useState("bottom")
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="border-none outline-none no-focus"><RiAccountPinCircleLine size={35}/></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 absolute right-1 custom-scrollbar">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
