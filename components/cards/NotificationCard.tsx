import { formatDateDifference } from "@/lib/utils"
import Image from "next/image"

import { ObjectId } from "mongoose"
import NotificationToolTip from "./NotificationToolTip"
import DeleteNotificationCard from "./DeleteNotificationCard"

interface notificationDetails {
  notificationId: ObjectId
  fromId: ObjectId
  fromImage: string
  fromName: string
  fromRole: string
  toId: ObjectId
  toImage: string
  toName: string
  subject: string
  message: string
  read: boolean
  date: string
  owner: boolean
}

const NotificationCard = ({
  notificationId,
  fromId,
  fromImage,
  fromName,
  fromRole,
  toId,
  toImage,
  toName,
  subject,
  message,
  read,
  date,
  owner
}: notificationDetails) => {

  let isRoofaAgent: boolean = false

  if(fromRole === 'admin' || fromRole === 'roofa-agent') {
    isRoofaAgent = true
  }


  return (
    <div
    className={`flex items-start gap-4 my-3 ${!read ? 'bg-slate-100 p-3' : ''}`}
    >
        <div
        className="w-16 h-16 relative"
        >
          <Image 
          src={fromImage}
          width={42}
          height={42}
          alt="Senders image"
          className="w-full h-full object-cover rounded-full"
          />
          {isRoofaAgent && owner && (<p className="bg-warning flex items-center justify-center w-8 h-8 absolute -top-3 -right-3 p-2 rounded-full text-tiny-medium">{fromRole}</p>)}
        </div>

        <div className="w-full">
            <h4
            className="text-[#7d8da1] text-small-semibold"
            >
                <span
                className="capitalize text-[#111e88] cursor-pointer hover:text-[#8691f4]"
                >{fromName}  </span> 
                {'sent you a private message'}
                <b className="normal-case"> {subject}</b>
            </h4>
            <p className="text-subtle-medium mb-5">{formatDateDifference(date as unknown as Date)}</p>

            {!owner && ( <section 
            className="border  p-3 rounded-md border-danger hover:bg-blue cursor-pointer transition-all"
            >
            <p
            className="text-subtle-medium font-normal"
            >
                {message}
            </p>

            <span
            className="flex items-center mt-4 text-subtle-medium lowercase"
            >sent to: <Image
            src={toImage} 
            width={30}
            height={30}
            alt ={`sent user image`}
            className="object-cover rounded-full w-6 h-6 mx-3"
            />
            <p>{toName}</p>
            </span>
            </section> )}

          {owner && (
          <NotificationToolTip 
          notificationId={notificationId.toString()}
          message={message}
          read={read}
          />
          )}

          <DeleteNotificationCard
          notificationId={notificationId.toString()}
          fromId={fromId.toString()}
          toId={toId.toString()}
           />
        </div>
      </div>
  )
}

export default NotificationCard
