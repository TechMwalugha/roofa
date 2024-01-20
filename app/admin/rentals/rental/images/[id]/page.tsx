import Rental from "@/lib/models/rental.model"
import { ObjectId } from "mongoose"
import UnlinkImagesForm from "@/components/admin/forms/UnlinkImagesForm"


const page = async ({ params } : { params: { id: string }}) => {

  const rental = await Rental.findById(params.id as unknown as ObjectId)
  .select('title location images')

  if(!rental) return 

  return (
    <div>
      <div>
        {rental.images.map((image: string, index: number) => {
          return (
            <section
            key={index}
            >
            <UnlinkImagesForm 
            image ={image}
            />
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default page
