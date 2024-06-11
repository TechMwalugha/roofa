import BookingDetails from "@/components/cards/BookingDetails"
import ReviewOrderCard from "@/components/cards/ReviewOrderCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchSingleRental } from "@/lib/actions/rental.action"
import { ObjectId } from "mongoose"
import { redirect } from "next/navigation"



const page = async ({ params } : { params: { id: string }}) => {
  const id =  params.id as any

  const rental = await fetchSingleRental({ id })

  if(!rental.rentalStatus) redirect('/')

  return (
    <Tabs 
    defaultValue="account" 
    className="w-full p-3 flex flex-col">
      <TabsList
      className="flex items-center justify-around bg-black"
      >
        <TabsTrigger value="account">Your Details</TabsTrigger>
        <TabsTrigger value="password">Review Order</TabsTrigger>
      </TabsList>
      <TabsContent 
      value="account"
      className=""
      >
        <BookingDetails
        id={rental._id}
         />
        </TabsContent>
      <TabsContent 
      value="password"
      className="shadow flex items-center justify-center"
      >
        <ReviewOrderCard
        id={rental._id}
        title={rental.title}
        price={rental.price}
        location={rental.location}
        serviceFee={rental.serviceFee}
        image={rental.images[0]}
        />
      </TabsContent>
    </Tabs>
  )
}

export default page
