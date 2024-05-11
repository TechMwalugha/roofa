'use client'

import { Button } from "@/components/ui/button"
import { settleBookingAction } from "@/lib/actions/booking.action"
import { ObjectId } from "mongoose"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SettleBookingForm = ({ id }: { id: string }) => {
    const [loading, setLoading]  = useState<boolean>(false)

    const router = useRouter()

    async function completeBooking(id: string) {
      setLoading(true)
    const res = await settleBookingAction({ id: id as unknown as ObjectId})

    if(res) {
        alert(`Updated Successfully`)

        router.refresh()
    } else {
      alert(`An error occurred please try again later`)
    }

    setLoading(false)
    }
  return (
    <div className="flex items-center justify-center mt-10">
      <Button
      onClick={() => completeBooking(id)}
      disabled = {loading}
      >
        {!loading ? 'Settle Booking' : ''}
            {loading && (
              <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
      </Button>
    </div>
  )
}

export default SettleBookingForm
