'use client'

import { useRouter } from "next/navigation"
import { MdOutlineRefresh } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
 
const ReloadBar = () => {
    const router = useRouter()
 
    return (
    //   <button type="button" onClick={() => router.refresh()}>
    //     <MdOutlineRefresh size={30} />
    //   </button>

    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger><MdOutlineRefresh size={30} onClick={() => router.refresh()} /></TooltipTrigger>
            <TooltipContent>
            <p className="text-subtle-medium">click to refresh</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}

export default ReloadBar
