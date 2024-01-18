import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"


const RentalRules = ( { rentalRules, setRentalRules } : { rentalRules: string[], setRentalRules: React.Dispatch<React.SetStateAction<string[]>>}) => {
    function handleAddAmenity() {
        setRentalRules([...rentalRules, ""])
        
    }
    
    function handleRemoveAmenity(index: number) {
        const list = [...rentalRules]
        list.splice(index, 1)

        setRentalRules(list)
    }

    function handleInputChange(e: ChangeEvent, index: number) {
        const {value} = e.target as any

        rentalRules[index] = value

        
    }
  return (
    <div className="border p-3 mb-2">
        <h3 className="text-subtle-medium text-center mb-3">Rental Rules</h3>

       <Button
       type="button"
        onClick={() => handleAddAmenity()}
        className="mb-2"
        >Add Rule</Button>
      {
        rentalRules.map((rule, index) => {
            return (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input 
                        type="text" 
                        placeholder={`${index}. ${rule}`}
                        className="w-full p-3  outline-none border-none rounded shadow-count" 
                        onChange={e=>handleInputChange(e, index)}
                    />
                    { rentalRules.length !== 1 && (
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

export default RentalRules
