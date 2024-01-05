import Image from "next/image"


const NotificationCard = () => {
  return (
    <div
    className="flex items-start gap-4 my-3"
    >
        <div
        className="w-16 h-16"
        >
          <Image 
          src="/userImages/1704375787139_655cf39d7e3a1a8e59b082d7.jpg"
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
                >Emmanuel mwalugha </span> 
                sent you a private message
                <b className="normal-case"> subject</b>
            </h4>
            <p className="text-subtle-medium mb-5">5 days ago</p>

            <section 
            className="border  p-3 rounded-md border-danger hover:bg-blue cursor-pointer transition-all"
            >
            <p
            className="text-subtle-medium font-normal"
            >
                Dear lucky,

            Congratulations! Your booking with Roofa for the apartment Grasslands Apartments has been successfully confirmed.

            Booking Details:
            - Apartment: GrassLands Apartments
            - Check-in Date: 12th may 2024

            Thank you for choosing Roofa for your accommodation needs. We hope you have a wonderful stay in our apartment. If you have any questions or need further assistance, feel free to reach out to our customer support team.

            Safe travels and enjoy your stay!

            Best regards,
            The Roofa Team
            </p>
            </section>
        </div>
      </div>
  )
}

export default NotificationCard
