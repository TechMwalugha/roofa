import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { FaArrowAltCircleDown } from "react-icons/fa";
import NotificationCollapsible from "./collapsibleCards/NotificationCollapsible";
import BookingCollapsible from "./collapsibleCards/BookingCollapsible";
import RentalHistoryCollapsible from "./collapsibleCards/RentalHistoryCollapsible";
import { ObjectId } from "mongoose";

const CollapsibleCon = (
    {
        title,
        content,
        userId
    }:
    {
        title: string,
        content: any[],
        userId: ObjectId
    }
) => {
  return (
<Collapsible className="mb-4">
  <CollapsibleTrigger
  className="flex items-center justify-between border-b-4 w-full text-start p-1 rounded-md uppercase"
   >
    <h4 className="text-base-medium">{title}</h4>
   <FaArrowAltCircleDown size={25} />
   </CollapsibleTrigger>
  <CollapsibleContent className="">
    { title === 'Bookings' && (
        <BookingCollapsible
        />
      )}

    { title === 'Notifications' && (
      <NotificationCollapsible
      userId = {userId}
      content = {content}
      />
    )}

    { title === 'Rental History' && (
          <RentalHistoryCollapsible
          />
        )}
  </CollapsibleContent>
</Collapsible>
  )
}

export default CollapsibleCon
