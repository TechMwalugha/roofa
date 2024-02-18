"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import { formatDateString } from "@/lib/utils"
import Link from "next/link"
import { CiNoWaitingSign } from "react-icons/ci";
import { MdCloudDone } from "react-icons/md";
import PaymentCard from "./PaymentCard";

interface BookingTabsInterface {
    fullName: string,
    email: string,
    reportingDate: string,
    identityNumber: string,
    gender: string,
    isBookingSettled: boolean,
    createdAt: string,
    isPaymentMade: {
        isMade: boolean,
        reason: string,
    },
    apartmentTitle: string, 
    apartmentLocation:string,
    apartmentPrice: number,
    apartmentImage: string,
    type: string | null, 
    mpesaReceiptNumber: string | null,
    amount: number | null, 
    paymentMadeOn: string | null, 
    mpesaPhoneNumber: string | null,
    isNotConfirmedBooking: boolean,
    isConfirmedBooking: boolean,
    isSettledBooking: boolean
}

const BookingTabs = ({
    fullName,
    email,
    reportingDate,
    identityNumber,
    gender,
    isBookingSettled,
    createdAt,
    isPaymentMade,
    apartmentTitle,
    apartmentLocation,
    apartmentPrice,
    apartmentImage,
    type, 
    mpesaReceiptNumber, 
    amount, 
    paymentMadeOn, 
    mpesaPhoneNumber,
    isNotConfirmedBooking,
    isConfirmedBooking, 
    isSettledBooking,
}: BookingTabsInterface) => {

    let isNotConfirmedBookingNo = []
    let isConfirmedBookingNo = []
    let isSettledBookingNo = []

    if(isNotConfirmedBooking) {
        isNotConfirmedBookingNo.push(isNotConfirmedBooking)
    }
    if(isConfirmedBooking) {
        isConfirmedBookingNo.push(isConfirmedBooking)
    }
    if(isSettledBooking) {
        isSettledBookingNo.push(isSettledBooking)
    }

    
  return (
    <Tabs 
     defaultValue="confirmed" 
     className="w-full">
         <TabsList
         className="w-full flex justify-between items-center bg-blue"
         >
             <TabsTrigger value="not-confirmed">Not-confirmed</TabsTrigger>
             <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
             <TabsTrigger value="settled">Settled</TabsTrigger>
         </TabsList>
         <TabsContent className="" value="not-confirmed">
         {
                isNotConfirmedBooking && !isBookingSettled && !isPaymentMade.isMade && (
            
                    <div className="">
                        <h5 className="text-subtle-medium text-center">This are the bookings that you booked but did not complete payment.</h5>

                        <Accordion type="single" collapsible>
                        {
                            isNotConfirmedBookingNo.map((b: boolean, index: number) => (
                            <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>{isNotConfirmedBookingNo.length}. {apartmentTitle} booking</AccordionTrigger>
                            <AccordionContent>
                            <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer">
                            <div>
                            <p className="bg-blue p-2 rounded-full w-10 h-10 flex items-center justify-center">{isNotConfirmedBookingNo.length}</p>
                                <h3 className="text-base-semibold text-center underline mb-4">Booking details</h3>

                                <div>
                                    <p className="text-small-regular">Name: <span className="text-danger capitalize ">{fullName}</span></p>
                                    <p className="text-small-regular">Email: <span className="text-danger ">{email}</span></p>
                                    <p className="text-small-regular">Identity Number: <span className="text-danger ">{identityNumber}</span></p>
                                    <p className="text-small-regular">Gender: <span className="text-danger capitalize">{gender}</span></p>
                                    <p className="text-small-regular">Reporting Date: <span className="text-danger ">{formatDateString(reportingDate)}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:flex gap-3">

                        <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer lg:flex-1">

                         <div className="w-full h-36">
                            <img src={`/rentalImages/${apartmentImage}`} alt={`${apartmentTitle} image`} className="w-full h-full object-cover rounded" />
                         </div>
                         <h3 className="text-base-semibold text-center underline my-4">Apartment booked</h3>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Title:</p>
                            <p>{apartmentTitle}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Location:</p>
                            <p>{apartmentLocation}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Price:</p>
                            <p>Ksh. {apartmentPrice}</p>
                         </div>
                       </div>

                       <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer flex items-center justify-center flex-col lg:flex-1">
                         <h5 className="text-center text-danger"><CiNoWaitingSign size={46} /></h5>
                           <h6 className="text-base1-semibold">Booking cannot be settled.</h6>
                           <p className="text-subtle-medium text-center">We're sorry we cannot settle your booking, this is due to you have not made a payment for this booking. <br/> Contact us to complete booking.</p>
                       </div>

                       </div>
                            </AccordionContent>
                        </AccordionItem>
                            ))
                        }

                        
                        </Accordion>

                        
                    </div>
                )
            }

            {
                !isNotConfirmedBooking && (
                    <div className="flex items-center justify-center flex-col">
                        <img src="/assets/reject-button.svg" className="w-24 h-24 object-cover" />
                        <h2 className="text-center text-body1-bold">Sorry you have no booking here</h2>
                        <p className=" text-center text-subtle-medium">You have no bookings, you have no bookings that you did not compete payment.</p>
                        <Link href="/" className="p-2 rounded bg-blue mt-3 shadow-md">Book now</Link>
                    </div>
                    )
            }
         </TabsContent>
         <TabsContent value="confirmed">
            {
                
                isConfirmedBooking && !isBookingSettled && isPaymentMade.isMade && (
                   
                    <div className="">
                        <h5 className="text-subtle-medium text-center">This are the bookings that have been confirmed but no settled.</h5>

                        <Accordion type="single" collapsible>
                            {
                                isConfirmedBookingNo.map((b: boolean, index: number) => (  
                                    <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>{isConfirmedBookingNo.length}. {apartmentTitle} booking</AccordionTrigger>
                                <AccordionContent>
                                <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer">
                            <div>
                            <p className="bg-blue p-2 rounded-full w-10 h-10 flex items-center justify-center">{isConfirmedBookingNo.length}</p>
                                <h3 className="text-base-semibold text-center underline mb-4">Booking details</h3>

                                <div>
                                    <p className="text-small-regular">Name: <span className="text-danger capitalize ">{fullName}</span></p>
                                    <p className="text-small-regular">Email: <span className="text-danger ">{email}</span></p>
                                    <p className="text-small-regular">Identity Number: <span className="text-danger ">{identityNumber}</span></p>
                                    <p className="text-small-regular">Gender: <span className="text-danger capitalize">{gender}</span></p>
                                    <p className="text-small-regular">Reporting Date: <span className="text-danger ">{formatDateString(reportingDate)}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:flex gap-3">

                        <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer lg:flex-1">

                         <div className="w-full h-36">
                            <img src={`/rentalImages/${apartmentImage}`} alt={`${apartmentTitle} image`} className="w-full h-full object-cover rounded" />
                         </div>
                         <h3 className="text-base-semibold text-center underline my-4">Apartment booked</h3>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Title:</p>
                            <p>{apartmentTitle}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Location:</p>
                            <p>{apartmentLocation}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Price:</p>
                            <p>Ksh. {apartmentPrice}</p>
                         </div>
                       </div>

                       <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer flex items-center justify-center flex-col lg:flex-1">
                         <h5 className="text-center text-danger"><CiNoWaitingSign size={46} /></h5>
                           <h6 className="text-base1-semibold">Booking is waiting to be settled.</h6>
                           <p className="text-subtle-medium text-center">Please wait as we process your request, we sent a receipt to your email. If you did not receive the email or you think the booking took long, please feel free to react us </p>
                       </div>

                       </div>

                       {
                        type && type && mpesaReceiptNumber && amount && paymentMadeOn && mpesaPhoneNumber && (
                            <div>
                            <h3 className="text-base-semibold text-center underline my-4">Payment Information</h3>
                            <PaymentCard 
                            type ={type as string}
                            mpesaReceiptNumber = {mpesaReceiptNumber as string}
                            amount ={ amount as number }
                            paymentMadeOn ={paymentMadeOn as string}
                            mpesaPhoneNumber = {mpesaPhoneNumber as string}
                            />
                           </div>    
                        )
                       }
                                </AccordionContent>
                            </AccordionItem>
                                  ))
                            }
                        </Accordion>

                        
                    </div>

                
                )
            }

            {
                !isConfirmedBooking && (
                    <div className="flex items-center justify-center flex-col">
                        <img src="/assets/reject-button.svg" className="w-24 h-24 object-cover" />
                        <h2 className="text-center text-body1-bold">Sorry no confirmed booking found</h2>
                        <p className=" text-center text-subtle-medium">You have no confirmed bookings, it may be your bookings are settled or you made bookings without completing payment.</p>
                        <Link href="/" className="p-2 rounded bg-blue mt-3 shadow-md">Book now</Link>
                    </div>
                    )
            }
         </TabsContent>
         <TabsContent value="settled">
         {
                
                isSettledBooking && isBookingSettled && isPaymentMade.isMade && (
                   
                    <div className="">
                        <h5 className="text-subtle-medium text-center">This are the bookings that have been confirmed but settled.</h5>

                        <Accordion type="single" collapsible>
                            {
                                isSettledBookingNo.map((b: boolean, index: number) => (  
                                    <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>{isSettledBookingNo.length}. {apartmentTitle} booking</AccordionTrigger>
                                <AccordionContent>
                                <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer">
                            <div>
                            <p className="bg-blue p-2 rounded-full w-10 h-10 flex items-center justify-center">{isSettledBookingNo.length}</p>
                                <h3 className="text-base-semibold text-center underline mb-4">Booking details</h3>

                                <div>
                                    <p className="text-small-regular">Name: <span className="text-danger capitalize ">{fullName}</span></p>
                                    <p className="text-small-regular">Email: <span className="text-danger ">{email}</span></p>
                                    <p className="text-small-regular">Identity Number: <span className="text-danger ">{identityNumber}</span></p>
                                    <p className="text-small-regular">Gender: <span className="text-danger capitalize">{gender}</span></p>
                                    <p className="text-small-regular">Reporting Date: <span className="text-danger ">{formatDateString(reportingDate)}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:flex gap-3">

                        <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer lg:flex-1">

                         <div className="w-full h-36">
                            <img src={`/rentalImages/${apartmentImage}`} alt={`${apartmentTitle} image`} className="w-full h-full object-cover rounded" />
                         </div>
                         <h3 className="text-base-semibold text-center underline my-4">Apartment booked</h3>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Title:</p>
                            <p>{apartmentTitle}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Location:</p>
                            <p>{apartmentLocation}</p>
                         </div>

                         <div className="flex items-center justify-between mb-2">
                            <p className="text-small-semibold">Price:</p>
                            <p>Ksh. {apartmentPrice}</p>
                         </div>
                       </div>

                       <div className="mt-5 shadow hover:shadow-count transition-all delay-2000 p-2 rounded cursor-pointer flex items-center justify-center flex-col lg:flex-1">
                         <h5 className="text-center text-green-500"><MdCloudDone size={46} /></h5>
                           <h6 className="text-base1-semibold">Booking is settled.</h6>
                           <p className="text-subtle-medium text-center">Your booking was processed and settled successfully, we thank you for trusting in us. You can make more bookings or refer a friend. </p>
                       </div>

                       </div>

                       {
                        type && type && mpesaReceiptNumber && amount && paymentMadeOn && mpesaPhoneNumber && (
                            <div>
                            <h3 className="text-base-semibold text-center underline my-4">Payment Information</h3>
                            <PaymentCard 
                            type ={type as string}
                            mpesaReceiptNumber = {mpesaReceiptNumber as string}
                            amount ={ amount as number }
                            paymentMadeOn ={paymentMadeOn as string}
                            mpesaPhoneNumber = {mpesaPhoneNumber as string}
                            />
                           </div>    
                        )
                       }
                                </AccordionContent>
                            </AccordionItem>
                                  ))
                            }
                        </Accordion>

                        
                    </div>

                
                )
            }

            {
                !isSettledBooking && (
                    <div className="flex items-center justify-center flex-col">
                        <img src="/assets/reject-button.svg" className="w-24 h-24 object-cover" />
                        <h2 className="text-center text-body1-bold">Sorry no settled booking found</h2>
                        <p className=" text-center text-subtle-medium">You have no settled bookings, it may be your bookings are waiting to be settled or you made bookings without completing payment.</p>
                        <Link href="/" className="p-2 rounded bg-blue mt-3 shadow-md">Book now</Link>
                    </div>
                    )
            }
         </TabsContent>
    </Tabs>
  )
}

export default BookingTabs
