'use client'

import { Button } from "@/components/ui/button"
import sendEmail from "@/lib/emailing/nodemailer.email"

const ResendPdf = ({}) => {

    async function handleResendReceipt({email, receiptNo}: {email: string, receiptNo: string}) {
        const res = await sendEmail({
            email: email,
            subject: "Resend of Booking Receipt",
            heading: "Here is your booking receipt",
            content: "Find the booking receipt attached below, ",
            pdfFilePath: `public/receipts/Roof-${receiptNo}.pdf`
        })
    }
  return (
    <div>
      <Button
      onClick={() => handleResendReceipt}
      >Resend Receipt</Button>
    </div>
  )
}

export default ResendPdf
