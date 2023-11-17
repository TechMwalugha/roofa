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

const MenuBar = ({title, image, content }: menuBarType) => {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none border-none">Hey, <b>{title}</b></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {content.map((item, index) => <DropdownMenuItem key={index}>{item}</DropdownMenuItem>)}
        </DropdownMenuContent>
    </DropdownMenu>
      <Image 
       src={image}
       width={30}
       height={30}
       alt={title}
       className="object-cover rounded-full"
      />
    </div>
  )
}

export default MenuBar
