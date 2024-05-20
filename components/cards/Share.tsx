'use client'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Link from "next/link";
import { IoShareOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti"
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { copyToClipboard, shareOnFacebook, shareOnInstagram, shareOnTwitter, shareOnWhatsApp, shareViaEmail } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
  

const Share = ({ image } : { image: string}) => {
    const path = usePathname()

    const [alertMsg, setAlertMsg] = useState('')

    async function handleCopyToClipBoard() {
        const text = `roofa.co.ke${path}`
        const result = await copyToClipboard(text)

        let removeAlertMsg 
        if(result) {
            setAlertMsg('copied to clipboard')
            removeAlertMsg = setTimeout(() => {
                setAlertMsg('')
            }, 2000)
        } else {
            setAlertMsg('failed to copy. try again')
            removeAlertMsg = setTimeout(() => {
                setAlertMsg('')
            }, 2000)
        }
    }
  return (
    <Dialog>
  <DialogTrigger
  className='flex items-center gap-2 hover:bg-gray-100 p-1 rounded'
  >
    
    <IoShareOutline />
    <span className='underline'>Share</span> 
    </DialogTrigger>

  <DialogContent 
  className="h-3/4 overflow-y-scroll rounded"
  >
    <h2 className="text-heading4-medium">Share this place</h2>

    <img 
    src={`/images/rentalImages/${image}`}
    alt="rental image"
    className="w-20 h-20 object-cover"
    />
    <button 
    className="flex items-center gap-2 border p-3 "
    onClick={handleCopyToClipBoard}
    > <FaRegCopy /> <span className=''>Copy Link</span> 
    </button>

    {/* twitter */}
    <button 
    className="flex items-center gap-2 border p-3 "
    onClick={() => shareOnTwitter('Check out this amazing place on Roofa', `roofa.co.ke${path}`)}
    > <RiTwitterXFill /> <span className=''>Twitter</span> 
    </button>

    {/* WhatsApp */}
    <button 
    className="flex items-center gap-2 border p-3 "
    onClick={() => shareOnWhatsApp('Hello, check out amazing place on Roofa', `roofa.co.ke${path}`)}
    > <FaWhatsapp /> <span className=''>WhatsApp</span> 
    </button>

    {/* Facebook */}
    <button 
    className="flex items-center gap-2 border p-3 "
    onClick={() => shareOnFacebook(`roofa.co.ke${path}`)}
    > <TiSocialFacebookCircular /> <span className=''>Facebook</span> 
    </button>{
    
    /* instagram */}
    <button 
    className="flex items-center gap-2 border p-3 "
    onClick={() => shareOnInstagram(`roofa.co.ke/rentalImages/${image}`, 'A fascinating rental on Roofa')}
    > <FaInstagram /> <span className=''>Instagram</span> 
    </button>

    {/* Email */}
    <button 
    className="flex items-center gap-2 border p-3 "
    onClick={() => shareViaEmail('Magnifient Apartment on Roofa', `Check out this fascinating rental on roofa.co.ke${path}`, ['recipient@example.com'])}
    > <HiOutlineMail /> <span className=''>Email</span> 
    </button>


    {/* Alert message container */}

    {/* { alertMsg && ( */}
        <div className = {`bg-green-500 text-white p-3 mt-3 rounded transition delay-700 absolute left-4 ${alertMsg ? 'top-3' : '-top-[100%]'}`}>
            <p className="text-subtle-medium">{alertMsg}</p>
        </div>
    {/* )} */}
  </DialogContent>
</Dialog>
  )
}

export default Share
