import { formatDateDifference } from "@/lib/utils"
import Image from "next/image"

interface notificationDetails {
  image: string
  name: string
  subject: string
  message: string
  read: boolean
  date: string
}

const NotificationCard = ({
  image,
  name,
  subject,
  message,
  read,
  date
}: notificationDetails) => {



  return (
    <div
    className="flex items-start gap-4 my-3"
    >
        <div
        className="w-16 h-16"
        >
          <Image 
          src={image}
          width={42}
          height={42}
          alt="Senders image"
          className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="w-full">
            <h4
            className="text-[#7d8da1] text-small-semibold"
            >
                <span
                className="capitalize text-[#111e88] cursor-pointer hover:text-[#8691f4]"
                >{name} </span> 
                sent you a private message
                <b className="normal-case"> {subject}</b>
            </h4>
            <p className="text-subtle-medium mb-5">{formatDateDifference(date as unknown as Date)}</p>

            <section 
            className="border  p-3 rounded-md border-danger hover:bg-blue cursor-pointer transition-all"
            >
            <p
            className="text-subtle-medium font-normal"
            >
                {message}
            </p>
            </section>
        </div>
      </div>
  )
}

export default NotificationCard
