import { fetchOneBookingId } from '@/lib/actions/booking.action'
import { fetchOnePayment } from '@/lib/actions/payment.action'
import { checkWhetherIsAgentOrAdmin, formatDateString } from "@/lib/utils"
import Link from "next/link"
import { CiNoWaitingSign } from "react-icons/ci";
import { MdCloudDone } from "react-icons/md";
import React from 'react'
import PaymentCard from '@/components/cards/PaymentCard';
import SettleBookingForm from '@/components/admin/forms/SettleBookingForm';
import NotifyUserViaEmail from '@/components/admin/forms/NotifyUserViaEmail';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const page = async ({ params }: { params: { id: string }}) => {

    let payment
    let pathToPdf = ''

    const booking: any = await fetchOneBookingId({id: params.id})
    
    if(booking?.isPaymentMade?.isMade) {
        payment = await fetchOnePayment({ id: booking.MerchantRequestID })
        pathToPdf=`/receipts/Roof-${payment._id.toString()}.pdf`
    }

  return (
    <div>
        {
            booking && (
                <>
                <div>
                            <h3 className="text-base-semibold text-center underline mb-4">Booking details</h3>
                            <div>
                                <p className="text-small-regular">Name: <span className="text-danger capitalize ">{booking.fullName}</span></p>
                                <p className="text-small-regular">Email: <span className="text-danger ">{booking.email}</span></p>
                                <p className="text-small-regular">Identity Number: <span className="text-danger ">{booking.identityNumber}</span></p>
                                <p className="text-small-regular">Gender: <span className="text-danger capitalize">{booking.gender}</span></p>
                                <p className="text-small-regular">Reporting Date: <span className="text-danger ">{formatDateString(booking.reportingDate)}</span></p>
                            </div>
                </div> 
                
                <div className="lg:flex gap-3">

                        <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer lg:flex-1">

                         <div className="w-full h-36">
                            <img src={`https://roofa.co.ke/images/rentalImages/${booking.apartmentBooked.images[0]}`} alt={`${booking.apartmentBooked.title} image`} className="w-full h-full object-cover rounded" />
                         </div>
                         <h3 className="text-base-semibold text-center underline my-4">Apartment booked</h3>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Title:</p>
                            <p>{booking.apartmentBooked.title}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Location:</p>
                            <p>{booking.apartmentBooked.location}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Price:</p>
                            <p>Ksh. {booking.apartmentBooked.price}</p>
                         </div>
                       </div>

                       <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer flex items-center justify-center flex-col lg:flex-1">
                         <h5 className="text-center text-green-500">
                           {booking.isBookingSettled && booking.isPaymentMade.isMade && ( <MdCloudDone size={46} /> ) }
                           {!booking.isBookingSettled && booking.isPaymentMade.isMade && ( <CiNoWaitingSign size={46} /> ) }
                           {!booking.isBookingSettled && !booking.isPaymentMade.isMade && ( <CiNoWaitingSign size={46} /> ) }
                            </h5>
                           <h6 className="text-base1-semibold">
                           {(!booking.isBookingSettled && !booking.isPaymentMade.isMade) ? 'Booking cannot be settled'  : ''}
                           {(!booking.isBookingSettled && booking.isPaymentMade.isMade) ? 'Booking is waiting to be settled.'  : ''}
                           {(booking.isBookingSettled && booking.isPaymentMade.isMade) ? 'Booking is settled.'  : ''}
                            
                           </h6>
                           <p className="text-subtle-medium text-center">
                           {(!booking.isBookingSettled && !booking.isPaymentMade.isMade) ? 'Kindly reach the customer and check if he can complete the payment.'  : ''}
                           {(!booking.isBookingSettled && booking.isPaymentMade.isMade) ? 'The user is waiting for your approval. Please confirm if the apartment is available, and also confirm if the payment was made.'  : ''}
                           {(booking.isBookingSettled && booking.isPaymentMade.isMade) ? `This booking is settled. and was settled on: ${formatDateString(booking.updatedAt as unknown as string)}`  : ''}
                           </p>
                       </div>

                    </div>

                    {
                        booking.isPaymentMade.isMade &&  payment  && (
                            <div>
                            <h3 className="text-base-semibold text-center underline my-4">Payment Information</h3>
                            <PaymentCard 
                            type ={payment.typeOfPayment as string}
                            mpesaReceiptNumber = {payment.mpesaReceiptNumber as string}
                            amount ={ payment.amount as number }
                            paymentMadeOn ={payment.createdAt as string}
                            mpesaPhoneNumber = {payment.mpesaPhoneNumber as string}
                            />
                           </div>    
                        )
                       }

                        <h3 className='mb-2 bg-slate-300 p-3 text-subtle-medium text-center'>Actions</h3>
                    <div className='flex items-center justify-between'>


                        
             {
                !booking.isBookingSettled && (
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
                        <NotifyUserViaEmail
                            email={booking.email}
                            pathToPdf={pathToPdf}
                        />
                    </DialogHeader>
                    </DialogContent>

            </Dialog>
                )
             }

                         {
                            payment && (
                                <a 
                                href={`/receipts/Roof-${payment._id.toString()}.pdf`}
                                target='_blank'
                                className='shadow-md rounded-sm px-3 py-2'
                                >
                                Receipt
                                </a>
                            )
                         }

                    {
                        !booking.isBookingSettled &&  payment && (
                            <SettleBookingForm
                            id={booking._id.toString()}
                            />
                            )
                            }
                    </div>
               </>
            )
        }

           {
                !booking && (
                    <div className="flex items-center justify-center flex-col">
                        <img src="/assets/reject-button.svg" className="w-24 h-24 object-cover" />
                        <h2 className="text-center text-body1-bold">Sorry no booking found</h2>
                        <p className=" text-center text-subtle-medium">There is no booking with such information found!</p>
                        <Link href="/admin/bookings" className="p-2 rounded bg-blue mt-3 shadow-md">Back</Link>
                    </div>
                    )
            }
    </div>
  )
}

export default page
