'use client'

import { readAllUserNotification } from "@/lib/actions/user.actions"
import { ObjectId } from "mongoose"
import { useRouter } from "next/navigation"

const MarkAllAsReadCard = ({
    userId
}: {
    userId: string
}) => {

    const router = useRouter()

    async function markAllAsReadFun(){
        const confirmWithUser = confirm('Are you sure you\'ve\ read them all?')
        if(confirmWithUser){
        const res = await readAllUserNotification(userId as unknown as ObjectId) 

        alert(res === undefined ? 'successfully read all messages': res)

        router.refresh()
        }
    }
  return (
    <p
        className="text-gray-1 tracking-wider text-subtle-semibold hover:text-black cursor-pointer"
        onClick={markAllAsReadFun}
        >mark all as read</p>
  )
}

export default MarkAllAsReadCard
