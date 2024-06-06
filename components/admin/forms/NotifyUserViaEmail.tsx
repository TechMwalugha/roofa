'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import sendEmail from "@/lib/emailing/nodemailer.email"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const NotifyUserViaEmail = ({ email } : { email: string}) => {
    const [loading, setLoading] = useState(() => false)

    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        // send email to user
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

      const res = await sendEmail({
            email: email,
            subject: formData.get('subject') as string,
            heading: formData.get('heading') as string,
            content: formData.get('message') as string,
            pdfFilePath: ''
        })

        setLoading(false)
        if(!res) {
            alert('Email not sent')
            router.refresh()
            return
        }

        alert('Email sent')
        router.refresh()


    }

  return (
    <div>
       <Dialog>
      <DialogTrigger
      className="bg-blue p-2 rounded-md capitalize"
      >
        notify user
      </DialogTrigger>
        <DialogContent
        className="h-5/6 overflow-y-scroll"
        >
          <DialogHeader>
            <DialogTitle>Compose the notification?</DialogTitle>
            <form className="w-full p-3" onSubmit={handleSubmit}>
                <div className="mb-3">
            
                    <input 
                    type="email" 
                    className="w-full cursor-not-allowed shadow-xl p-2 rounded-sm text-center border-none outline-none" 
                    name="email" 
                    required
                    value={email} 
                    readOnly
                    />
                </div>
                <div className="mb-3">
                    <input 
                    type="text" 
                    name="subject" 
                    required
                    className="w-full shadow-xl p-2 rounded-sm text-center border-none outline-none"
                    placeholder="Subject"
                    />
                </div>
                <div className="mb-3">
                    <input 
                    type="text"
                    name="heading" 
                    required
                    className="w-full shadow-xl p-2 rounded-sm text-center border-none outline-none"
                    placeholder="Heading"
                    />
                </div>
                <div className="mb-3">
                    <textarea 
                    name="message" 
                    required
                    rows={7}
                    className="w-full shadow-xl p-2 rounded-sm text-center border-none outline-none" 
                    />
                </div>

                <button 
                type="submit"
                className={`w-full p-2 rounded-sm shadow-sm bg-blue ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={loading}
                >
                    Send
                </button>
            </form>
          </DialogHeader>
        </DialogContent>

    </Dialog>
    </div>
  )
}

export default NotifyUserViaEmail
