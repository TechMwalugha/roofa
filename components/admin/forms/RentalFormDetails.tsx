"use client"

import { UpdateRentalSchema } from "@/interfaces"
import { FormEvent, useState } from "react"
import UpdateRentalAmenitiesCard from "../cards/updateRental/UpdateRentalAmenitiesCard"
import RentalRules from "../cards/RentalRules"


const RentalFormDetails = ({
    title,
    description,
    rentalType,
    price,
    location,
    images,
    amenities,
    geoLocation,
    rentalRules,
    availableRooms,
    rentalsNear,
    serviceFee,
    bookings,
    rentalStatus,
    createdAt,
    updatedAt
}: UpdateRentalSchema) => {
    const [updateAmenities, setUpdateAmenities] = useState(() => {
        if(amenities){
            return amenities
        }
        return []
    })

    const [updateRentalRules, setUpdateRentalRules] = useState(() => {
        if(rentalRules){
            return rentalRules
        }
        return []
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

    }

  return (
   <form onSubmit={handleSubmit} 
   className="bg-white shadow-md rounded-sm p-4"
   >
    <div
    className="flex flex-col justify-center my-5"
    >
        <label 
        htmlFor="title"

        >
            Rental Title:
         </label>
        <input 
        type="text" 
        min={4}
        id="title"
        name="title"
        placeholder={title}
        className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2"
        />
    </div>

    <div
    className="flex flex-col justify-center my-5"
    >
        <label 
        htmlFor="description"

        >
            Description:
         </label>
        <textarea
        rows={20}
        cols={30}
        id="description"
        name="description"
        placeholder={description}
        className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2"
        ></textarea>
    </div>

    <div
    className="flex flex-col justify-center my-5"
    >
        <label 
        htmlFor="price"

        >
            Price:
         </label>
        <input 
        type="number" 
        min={4}
        id="price"
        name="price"
        placeholder={'KsH. ' + price.toString()}
        className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2"
        />
    </div>

    <div
    className="flex flex-col justify-center my-5"
    >
        <select 
       name="rentalType"
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
       multiple
       >
        <option 
        value="" 
        disabled
        className="text-small-medium pb-2 border-b-2"
        >select rental types **hold ctrl + click to select multiple**</option>
        <option value="single room" className={rentalType?.includes('single room') ? 'bg-blue' : ''}>Single Room</option>
        <option value="bedsitter" className={rentalType?.includes('bedsitter') ? 'bg-blue' : ''}>Bedsitter</option>
        <option value="One Bedroom" className={rentalType?.includes('One Bedroom') ? 'bg-blue' : ''}>One Bedroom</option>
        <option value="Two Bedroom" className={rentalType?.includes('Two Bedroom') ? 'bg-blue' : ''}>Two Bedroom</option>
        <option value="Three Bedroom" className={rentalType?.includes('Three Bedroom') ? 'bg-blue' : ''}>Three Bedroom</option>
        <option value="Four Bedroom" className={rentalType?.includes('Four Bedroom') ? 'bg-blue' : ''}>Four Bedroom</option>
        <option value="Five Bedroom" className={rentalType?.includes('Five Bedroom') ? 'bg-blue' : ''}>Five Bedroom</option>
       </select>
    </div>

    {/* Location */}

    <div
    className="flex flex-col justify-center my-5"
    >
        <label 
        htmlFor="location"

        >
            Location:
         </label>
        <input 
        type="text" 
        min={4}
        id="location"
        name="location"
        placeholder={location}
        className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2"
        />
    </div>


    {/* Amenities */}
    <UpdateRentalAmenitiesCard 
    updateAmenities={updateAmenities}
    setUpdateAmenities={setUpdateAmenities}
    />

    {/* GeoLocation */}
    <div>
    <h3 className="text-subtle-medium text-center my-3">Geolocation</h3>
        <div>
            <label 
            htmlFor="geoLocationName"

            >
                Geo-location Name:
            </label>
            <input 
            type="text" 
            min={4}
            id="geoLocationName"
            name="geoLocationName"
            placeholder={geoLocation.name}
            className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2 w-full"
            />
        </div>

        <div className="mt-2">
            <label 
            htmlFor="geoLocationAddress"

            >
                Geo-location Address:
            </label>
            <input 
            type="text" 
            min={4}
            id="geoLocationAddress"
            name="geoLocationAddress"
            placeholder={geoLocation.address}
            className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2 w-full"
            />
        </div>

        <div className="mt-2">
            <label 
            htmlFor="geoLocationLatitude"

            >
                Geo-location Latitude:
            </label>
            <input 
            type="text" 
            min={4}
            id="geoLocationLatitude"
            name="geoLocationLatitude"
            placeholder={geoLocation.latitude.toString()}
            className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2 w-full"
            />
        </div>

        <div className="mt-2">
            <label 
            htmlFor="geoLocationLongitude"

            >
                Geo-location Longitude:
            </label>
            <input 
            type="text" 
            min={4}
            id="geoLocationLongitude"
            name="geoLocationLongitude"
            placeholder={geoLocation.longitude.toString()}
            className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2 w-full"
            />
        </div>
    </div>

    {/* Rental Rules */}
    <RentalRules 
    rentalRules={updateRentalRules}
    setRentalRules={setUpdateRentalRules}
    />

<div
    className="flex flex-col justify-center my-5"
    >
        <label 
        htmlFor="availableRooms"

        >
            Available Rooms:
         </label>
        <input 
        type="number" 
        min={4}
        id="availableRooms"
        name="availableRooms"
        placeholder={availableRooms.toString()}
        className="border-none outline-none shadow-count p-3 rounded-lg placeholder:text-slate-400 placeholder:italic mt-2"
        />
    </div>
    <button
    type="submit"
    className="bg-blue p-3 w-full rounded-sm hover:text-warning mt-4"
    >
        Update
    </button>
   </form>
  )
}

export default RentalFormDetails
