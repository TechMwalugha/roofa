'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { readNotificationAction } from "@/lib/actions/notification.action"
import { ObjectId } from "mongoose"

const NotificationToolTip = ({
    notificationId, 
    message,
    read
}: {
    notificationId: string
    message: string
    read: boolean
}) => {

   async function readNotification() {
       await readNotificationAction(notificationId as unknown as ObjectId)

       alert('message updated as read')
      }

  return (
    <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
               className="border p-3 rounded-md border-danger hover:bg-blue cursor-pointer transition-all"
               onClick={readNotification}
              >
                <p
                  className="text-subtle-medium font-normal"
                >
                 {message}
                </p>
              </TooltipTrigger>
              {!read && (<p className="sm:hidden text-subtle-medium">click the message to mark as read</p>)}
              <TooltipContent>
                <p
                className="text-subtle-medium"
                >
                    {read ? "this message is read" : "click me to mark as read"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
  )
}

export default NotificationToolTip
