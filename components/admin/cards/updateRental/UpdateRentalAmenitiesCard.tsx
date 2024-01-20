import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { MdDelete } from "react-icons/md";


const UpdateRentalAmenitiesCard = ({ updateAmenities, setUpdateAmenities} : {
  updateAmenities: string[];
  setUpdateAmenities: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

  function handleAddAmenity() {
    setUpdateAmenities([...updateAmenities, ""])
  }

  function handleRemoveAmenity(checkIndex: number) {
   const newUpdateAmenities =  updateAmenities.filter((amenity: string, index: number) => index !== checkIndex)
   setUpdateAmenities(newUpdateAmenities)
  }

  function handleInputChange(e: ChangeEvent, index: number) {
    const {value} = e.target as any

    updateAmenities[index] = value
  }


  return (
    <div>
      <h3 className="text-subtle-medium text-center mb-3">Amenities</h3>

      <Button
      onClick={handleAddAmenity}
      type="button"
      >
        Add
      </Button>
      { updateAmenities.map((amenity: string, index: number) => {
        return(
          <div 
          key={index}
          className="flex items-center gap-2"
          >
          <input 
          type="text" 
          onChange={e => handleInputChange(e, index)}
          min={4}
          placeholder={index + 1 + '. ' + amenity}
          className="border-none outline-none shadow-count p-3 rounded-lg capitalize placeholder:text-slate-400 placeholder:italic mt-2 w-full"
          />
          {
            updateAmenities.length !== 1 && (
              <Button
                onClick={() => handleRemoveAmenity(index)}
                >
                <MdDelete />
            	</Button>
            )
          }
          </div>
        )
      })}
    </div>
  )
}

export default UpdateRentalAmenitiesCard
