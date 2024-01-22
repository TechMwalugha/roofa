import Rental from "@/lib/models/rental.model"
import { ObjectId } from "mongoose"
import UnlinkImagesForm from "@/components/admin/forms/UnlinkImagesForm"
import HorizontalLine from "@/components/shared/utils/HorizontalLine"


const page = async ({ params } : { params: { id: string }}) => {

  const rental = await Rental.findById(params.id as unknown as ObjectId)
  .select('title location images')

  if(!rental) return 

  return (
    <div>
      <h3
      className="text-heading3-medium mb-3"
      >{rental.title}</h3>
      <HorizontalLine />
      <div>
        {rental.images.map((image: string, index: number) => {
          return (
            <section
            key={index}
            >
            <UnlinkImagesForm 
            image ={image}
            rentalId={rental._id.toString()}
            />
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default page
