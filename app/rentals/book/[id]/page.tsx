import BookingDetails from "@/components/cards/BookingDetails"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchSingleRental } from "@/lib/actions/rental.action"
import { ObjectId } from "mongoose"



const page = async ({ params } : { params: { id: string }}) => {
  const id =  params.id as any

  const rental = await fetchSingleRental({ id })


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
      className="shadow"
      >
        <BookingDetails
        id={params.id as any}
         />
        </TabsContent>
      <TabsContent 
      value="password"
      className="shadow"
      >Change your password here.</TabsContent>
    </Tabs>
  )
}

export default page
