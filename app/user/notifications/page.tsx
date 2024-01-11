import NotificationCard from "@/components/cards/NotificationCard"
import { fetchUserByEmail, fetchUserNotification } from "@/lib/actions/user.actions"
import { getServerSession } from "next-auth"
import Image from "next/image"

const page = async () => {
  const session = await getServerSession()

  if(!session) return 
  const userId = await fetchUserByEmail(session?.user?.email as string)
  const user = await fetchUserNotification(userId._id)

  const numberOfUnreadMessages = user.notifications.map((message: any) => {
    if(!message.read) {
      return message
    }
  })

  return (
  <div className=" md:flex md:items-center md:justify-center">
    <div className="mx-3 md:w-3/4">
      <div
      className="p-3 rounded-sm bg-blue mb-8 flex items-center justify-between"
      >
        <h3
        className="text-base1-semibold flex items-center gap-5"
        >
          Notifications

          <span
          className="bg-warning px-3 py-1 rounded-lg text-small-regular text-white"
          >{numberOfUnreadMessages.length}</span>
        </h3>

        <p
        className="text-gray-1 tracking-wider text-subtle-semibold hover:text-black cursor-pointer"
        >mark all as read</p>
      </div>

      {
        user.notifications.map((message: any, index: number) =>{
          return (
            <NotificationCard
            key={index}
            image={message.from.image}
            name={message.from.name}
            subject={message.subject}
            message={message.message}
            read={message.read}
            date={message.createdAt}
            />
          )
        })
      }
      
    </div>
  </div>
  )
}

export default page
