import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";

interface rentalOffers {
    rentalOffers: string[];
    setRentalOffers: React.Dispatch<React.SetStateAction<string[]>>;
}

const RentalOffers = ({ rentalOffers, setRentalOffers } : rentalOffers) => {

    function handleAddRentalOffer() {
        setRentalOffers([...rentalOffers, ""])
    }

    function handleRemoveRentalOffer(index: number) {
        const list = [...rentalOffers]
        list.splice(index, 1)

        setRentalOffers(list)
    }

    function handleInputChange(e: ChangeEvent, index: number) {
        const {value} = e.target as any

        rentalOffers[index] = value
    }

  return (
    <div className="border p-3 mb-2">
        <h3 className="text-subtle-medium text-center mb-3">Amenities</h3>

       <Button
       type="button"
        onClick={() => handleAddRentalOffer()}
        className="mb-2"
        >Add Offer</Button>
      {
        rentalOffers.map((offer, index) => {
            return (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input 
                        type="text" 
                        placeholder={`${index}. ${offer}`}
                        className="w-full p-3  outline-none border-none rounded shadow-count" 
                        onChange={e=>handleInputChange(e, index)}
                    />
                    { rentalOffers.length !== 1 && (
                        <button 
                        className="p-3 bg-danger rounded"
                        onClick={() => handleRemoveRentalOffer(index)}
                        >remove</button>
                    )}
                </div>
            )
        })
      }
    </div>
  )
}

export default RentalOffers
