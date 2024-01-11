"use client"
import { deleteNotificationAction } from "@/lib/actions/notification.action";
import { ObjectId } from "mongoose";
import { MdDeleteOutline } from "react-icons/md";

const DeleteNotificationCard = ({
    notificationId
}: {
    notificationId: string
}) => {

    async function deleteNotificationFun() {
        await deleteNotificationAction(notificationId as unknown as ObjectId)

        alert('deleted successfully')
    }
  return (
    <div 
    className="text-danger cursor-pointer p-2 rounded-full bg-blue w-12 h-12 mt-4 hover:bg-red-500 hover:text-blue"
    onClick={deleteNotificationFun}
    >
      <MdDeleteOutline 
      size={30}
      />
    </div>
  )
}

export default DeleteNotificationCard
