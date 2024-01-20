"use client"

import { UpdateRentalSchema } from "@/interfaces"
import { FormEvent, useEffect, useState } from "react"
import UpdateRentalAmenitiesCard from "../cards/updateRental/UpdateRentalAmenitiesCard"
import RentalRules from "../cards/RentalRules"
import classNames from "classnames";
import { formatDateString } from "@/lib/utils"
import { updateRental } from "@/lib/actions/rental.action"
import { ObjectId } from "mongoose"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Noto_Serif_Yezidi } from "next/font/google"
import { useRouter } from "next/navigation"
import Link from "next/link"


const RentalFormDetails = ({
    rentalId,
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
    updatedAt,
    allRentals,
    users,
    owner
}: UpdateRentalSchema) => {

    const notify = () => {
        toast.success(`${title} updated successfully`, {
            position: "top-right"
          });
    }

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    
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
        setLoading(true)
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)

        updateRental({
            rentalId: rentalId as unknown as ObjectId,
            title: formData.get('title') === '' ? title : formData.get('title') as string ,
            description: formData.get('description') === "" ? description : formData.get('description') as string,
            rentalType: formData.getAll('rentalType').length < 1 ? rentalType : formData.getAll('rentalType') as string[],
            price: Number(formData.get('price')) < 1000 ? price : Number(formData.get('price')),
            location: formData.get('location') === "" ? location : formData.get('location') as string,
            owner: formData.get('owner') as unknown as  ObjectId,
            amenities: updateAmenities,
            geoLocation: {
                name: formData.get('geoLocationName') === "" ? geoLocation.name : formData.get('geoLocationName') as string,
                address: formData.get('geoLocationAddress') === "" ? geoLocation.address : formData.get('geoLocationAddress') as string,
                latitude: formData.get('geoLocationLatitude') === "" ? geoLocation.latitude :  Number(formData.get('geoLocationLatitude')) ,
                longitude: formData.get('geoLocationLongitude') === "" ? geoLocation.longitude : Number(formData.get('geoLocationLongitude')) 
            },
            rentalRules: updateRentalRules,
            availableRooms: formData.get('availableRooms') === "" ? availableRooms : Number(formData.get('availableRooms')),
            rentalsNear: formData.getAll('rentalsNear').length < 1 ? rentalsNear.map(rental => rental._id as unknown as ObjectId) : formData.getAll('rentalsNear') as unknown as ObjectId[],
            serviceFee: {
                paidBy: formData.get('paidBy') === "" ? serviceFee.paidBy :  formData.get('paidBy') as string,
                amount: formData.get('amount') === "" ? serviceFee.amount : Number(formData.get('amount'))
            },
            rentalStatus: formData.get('rentalStatus') === 'on' ? true : false,
        })

        notify()
        setLoading(false)
        router.refresh()
    }

  return (
   <form onSubmit={handleSubmit} 
   className="bg-white shadow-md rounded-sm p-4"
   >
    <ToastContainer />
    <div
    className="flex items-center justify-between"
    >
       <div>
        <p className="text-subtle-medium mb-2 bg-blue">
                created on: {formatDateString(createdAt.toString())}
        </p>
        <p className="text-subtle-medium bg-warning">
                updated on: {formatDateString(updatedAt.toString())}
        </p>
       </div>

       <div>
            <Link
            href={`/admin/rentals/rental/images/${rentalId}`}
            className="bg-danger p-3 rounded self-start text-white lowercase hover:text-slate-100"
            >
                Images
            </Link>
       </div>
    </div>
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

    {/* rentals Near */}

    <div
    className="flex flex-col justify-center my-5"
    >
        <select 
       name="rentalsNear"
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
       multiple
       >
        <option 
        value="" 
        disabled
        className="text-small-medium pb-2 border-b-2"
        >select rental Near **hold ctrl + click to select multiple**</option>
        {allRentals.map((rental: {_id: string, title: string, location: string}, index: number) => {

            return (
                <option 
                key={index}
                value={rental._id}
                className={classNames({
                    "p-2 rounded-sm shadow-sm cursor-pointer my-1": true,
                    "bg-blue": rentalsNear.some(item => item._id === rental._id),
                })}
                >{rental.title}  {rental.location}</option>
            )
        })}
       </select>
    </div>

    {/* Service fee */}

    <div className="border p-3 mb-2">
      <h3 className="text-subtle-medium text-center mb-3">Service Fee</h3>

      <select 
      name="paidBy" 
      id="paidBy"
      className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
      >
        <option value="" className="text-subtle-medium" disabled>who pays? currently: {serviceFee.paidBy}</option>
        <option 
        value="customer"
        className="p-2 rounded-sm shadow-sm cursor-pointer my-1"
        >
            Customer
        </option>
        <option 
        value="owner"
        className={classNames({
            "p-2 rounded-sm shadow-sm cursor-pointer my-1": true,
        })}
        >
            Owner
        </option>
      </select>

      <input 
       type="number"
       name="amount"
       className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
       placeholder={"Ksh. " + serviceFee.amount.toString()}
       />
    </div>

    <div
      className="w-full p-3 flex items-center gap-3  outline-none border-none rounded shadow-count mb-2"
      >
      <input 
       type="checkbox"
       name="rentalStatus"
       defaultChecked = {rentalStatus} 
       />
       <p>Status</p>
    </div>

    {/* owner */}
    <select 
       name="owner"
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
    //    multiple
       >
        <option 
        value="" 
        disabled
        className="text-small-medium pb-2 border-b-2"
        >update the landlord</option>
        { users.map((user, index) => {

        
          return (
            <option 
            key={user._id} 
            value={user._id}
            className={classNames({
                "lowercase my-2 shadow p-3 rounded cursor-pointer": true,
                "bg-blue": owner === user._id
            })}
            >
            {index}. {user.name},
               {user.email} 
            </option>
          )
        })}
       </select>

    <button
    type="submit"
    className={classNames({
        "bg-blue p-3 w-full rounded-sm hover:text-warning mt-4": true,
        "bg-slate-300": loading
    })}
    disabled = {loading}
    >
        {!loading ? 'Update' : ''}
        {loading && (
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
        )}
    </button>
   </form>
  )
}

export default RentalFormDetails
