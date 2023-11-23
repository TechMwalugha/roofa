import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"


const Amenities = () => {
    const [amenities, setAmenities] = useState<string[]>([""])

    function handleAddAmenity() {
        setAmenities([...amenities, ""])
        
    }
    function handleRemoveAmenity(index: number) {
        const list = [...amenities]
        list.splice(index, 1)

        setAmenities(list)
    }

    function handleInputChange(e: ChangeEvent, index: number) {
        const {value} = e.target as any

        amenities[index] = value

        console.log(amenities)
    }
  return (
    <div className="border p-3 mb-2">
        <h3 className="text-subtle-medium text-center">Amenities</h3>

       <Button
        onClick={() => handleAddAmenity()}
        className="mb-2"
        >Add Amenity</Button>
      {
        amenities.map((amenity, index) => {
            return (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input 
                        type="text" 
                        placeholder={`${index}.`}
                        className="w-full p-3  outline-none border-none rounded shadow-count" 
                        onChange={e=>handleInputChange(e, index)}
                    />
                    { amenities.length !== 1 && (
                        <button 
                        className="p-3 bg-danger rounded"
                        onClick={() => handleRemoveAmenity(index)}
                        >remove</button>
                    )}
                </div>
            )
        })
      }
    </div>
  )
}

export default Amenities
