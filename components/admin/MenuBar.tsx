import { menuBarType } from "@/interfaces"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { containsGoogleusercontent } from "@/lib/utils"

const MenuBar = ({title, image, content }: menuBarType) => {

  //check if is a google image
  if(image && !containsGoogleusercontent(image as string)) {
    image = `https://roofa.co.ke/images${image}`
   }

  return (
    <div className="flex items-center justify-center gap-2 ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none border-none">Hey, <b>{title}</b></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {content.map((item: string, index) => <Link key={index} href={`/${item}`} className="capitalize"><DropdownMenuItem >{`${item === 'user/account-settings' ? 'Account' : 'Logout'}`}</DropdownMenuItem> </Link>)}
        </DropdownMenuContent>
    </DropdownMenu>
      <img
       src={`${image}`}
       width={30}
       height={30}
       alt={title}
       className="object-cover rounded-full"
      />
    </div>
  )
}

export default MenuBar
