import MarkAllAsReadCard from "@/components/cards/MarkAllAsReadCard";
import NotificationCard from "@/components/cards/NotificationCard"
import { fetchUserByEmail, fetchUserNotification } from "@/lib/actions/user.actions"
import { getServerSession } from "next-auth"
import { TbMessage2Off } from "react-icons/tb";

const page = async () => {
  const session = await getServerSession()

  if(!session) return 
  const userId = await fetchUserByEmail(session?.user?.email as string)
  const user = await fetchUserNotification(userId._id)

  // console.log(userId._id)

    let numberOfUnreadMessages = 0
  user.notifications.forEach((message: any) => {

    if(!message.read) {
      numberOfUnreadMessages =+ 1
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
          >{numberOfUnreadMessages}</span>
        </h3>

        <MarkAllAsReadCard
        userId={userId._id.toString()}
        />
      </div>

      {
       user.notifications.length > 0 && user.notifications.map((message: any, index: number) =>{

          return (
            <NotificationCard
            key={index}
            notificationId={message._id}
            fromId={message.to._id}
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
            owner={message.to.email == user.email ? true : false}
            />
          )
        })
      }

      {
        user.notifications.length <= 0 && (
          <div
          className="flex flex-col items-center justify-center h-screen"
          >
            <TbMessage2Off size={30} />
            <p
            className="text-subtle-medium"
            > No notifications</p>
          </div>
        )
      }
      
    </div>
  </div>
  )
}

export default page
