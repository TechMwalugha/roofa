import Image from "next/image"


const RentalTypes = ({ type }: {type: string}) => {
  return (
    <div
    className="border p-6 m-2 rounded flex-auto cursor-pointer hover:bg-gray-100 hover:border-none"
    >
        <Image
        src='/assets/bedroom.png'
        width={30}
        height={30}
        alt="bedroom image"
        className="object-cover w-[70px] h-[70px]"
         />
      <h3
      className="text-heading4-medium capitalize mt-3"
      >{type}</h3>
    </div>
  )
}

export default RentalTypes
