"use client"
import { deleteNotificationAction } from "@/lib/actions/notification.action";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

const DeleteNotificationCard = ({
    notificationId
}: {
    notificationId: string
}) => {

    const router = useRouter()

    async function deleteNotificationFun() {
      const confirmWithUser = confirm('Are you sure on deleting this message?')
      if(confirmWithUser){
        await deleteNotificationAction(notificationId as unknown as ObjectId)

        alert('deleted successfully')

      router.refresh()
      }

    }
  return (
    <div 
    className="flex items-center text-danger cursor-pointer p-2 rounded-full bg-blue w-8 h-8 mt-4 hover:bg-red-500 hover:text-blue"
    onClick={deleteNotificationFun}
    >
      <MdDeleteOutline 
      size={22}
      />
    </div>
  )
}

export default DeleteNotificationCard
