import CreateNotificationForm from "@/components/admin/forms/CreateNotificationForm"
import HorizontalLine from "@/components/shared/utils/HorizontalLine"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createNewNotification } from "@/lib/actions/notification.action"
import { fetchUserByEmail } from "@/lib/actions/user.actions"
import { ObjectId } from "mongoose"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import NotificationCard from "../NotificationCard"
import { TbMessage2Off } from "react-icons/tb"


const NotificationCollapsible = async ({
  userId,
  content,
}: {
  userId: ObjectId
  content: any[]
}) => {

  const session = await getServerSession()

  if(!session) redirect('/')
  

  const user: any = await fetchUserByEmail(session?.user?.email as string)
  return (
    <div
    className="shadow-sm p-4"
    >
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
            <CreateNotificationForm
            userId={userId.toString()} 
            sessionUserId={user._id.toString()}
            />
          </DialogHeader>
        </DialogContent>

        <HorizontalLine />

        <div>
          {content.length > 0 && content.map((message, index) => {
            return (
              <NotificationCard
              key={index}
              notificationId={message._id}
              fromId={message.from._id}
              fromImage={message.from.image}
              fromName={message.from.name}
              fromRole={message.from.role}
              toId={message.to._id}
              toImage={message.to.image}
              toName={message.to.name}
              subject={message.subject}
              message={message.message}
              read={message.read}
              date={message.createdAt}
              owner={message.to.email === user.email ? true : false}
               />
            )
          })}

      {
       content.length <= 0 && (
          <div
          className="flex flex-col items-center justify-center"
          >
            <TbMessage2Off size={30} />
            <p
            className="text-subtle-medium"
            >you have no notifications</p>
          </div>
        )
      }
        </div>
    </Dialog>
    </div>
  )
}

export default NotificationCollapsible
