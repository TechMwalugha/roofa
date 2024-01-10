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
import { redirect } from "next/navigation"


const NotificationCollapsible = async ({
  userId,
  content,
}: {
  userId: ObjectId
  content: any[]
}) => {

  const session = await getServerSession()

  if(!session) redirect('/')
  

  const user = await fetchUserByEmail(session?.user?.email as string)
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
          {content.map((message, index) => {
            return (
              <h3 key={index}>hello</h3>
            )
          })}
        </div>
    </Dialog>
    </div>
  )
}

export default NotificationCollapsible
