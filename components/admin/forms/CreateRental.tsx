"use client"; // Make this component a client component
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";

// import axios from "axios";
import classNames from "classnames";
import ImagePreview from "../cards/ImagePreview";
import Amenities from "../cards/Amenities";
import GeoLocation from "../cards/GeoLocation";
import RentalRules from "../cards/RentalRules";
import { createRental } from "@/lib/actions/rental.action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import RentalOffers from "../cards/RentalOffers";

const FileUploadForm = ({ users, allRentals }: 
  {
    users: any[]
    allRentals: any[]
  }) => {

    //success notifications
    const notifySuccess = (message: string) => {
      toast.success(message, {
          position: 'top-right',
          toastId: 'RentalCreateSuccess'
      })
  }

   //Error notifications
   const notifyError = (message: string) => {
    toast.success(message, {
        position: 'top-right',
        toastId: 'RentalCreateError'
    })
}

  const router = useRouter()
  
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [amenities, setAmenities] = useState<string[]>([""])

  const [rentalOffers, setRentalOffers] = useState<string[]>([""])

  const [geoLocation, setGeoLocation] = useState({
    name: "",
    address: '',
    latitude: 0,
    longitude: 0
  })


  const [rentalRules, setRentalRules] = useState<string[]>([""])

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      
      const _files = Array.from(e.target.files)
      setImages(_files);
  
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUploading(true);
    const formData = new FormData(e.currentTarget);

     
    images.forEach((image, i) => {
      formData.append(image.name, image);
    });
    const res = await fetch('/api/uploadRentalImages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
      body: formData
    })
    const responseData = await res.json();

    if (res.ok) {
      const imageUrls = responseData.data;

      // Perform further actions with imageUrls

      createRental({
        title: formData.get("title") as string,
        apartmentType: formData.get("apartmentType") as "Rental" | "Airbnb",
        description: formData.get("description") as string,
        rentalType: formData.getAll("rentalType") as string[],
        price: formData.get("price") as any,
        location: formData.get("location") as string,
        images: imageUrls,
        owner: formData.get("owner") as any,
        amenities: amenities,
        geoLocation: geoLocation,
        rentalRules: rentalRules,
        rentalOffers: rentalOffers,
        availableRooms: formData.get("availableRooms") as any,
        rentalsNear: formData.getAll("rentalsNear") as any,
        serviceFee: {
          paidBy: formData.get("paidBy") as string,
          amount: formData.get("amount") as any,
        },
        rentalStatus: formData.get("rentalStatus") == 'on' ? true : false,
      
      })

      notifySuccess("Apartment created successfully")

      router.refresh()
    } else {
      // Handle error or provide user feedback

      notifyError('Failed while uploading images. Try again')
    }




      setUploading(false);

  };
  return (
    <form className="w-full shadow-sm p-3" onSubmit={handleSubmit}>
      <ToastContainer />
      <input 
      type="text" 
      name="title" 
      placeholder="Rental title"
      className="w-full p-3 capitalize outline-none border-none rounded shadow-count mb-2"
      required
       />

       {/* Apartment Type */}
       <select 
       name="apartmentType"
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
       required
       >
        <option value="" disabled>Select the type of apartment</option>
        <option value="Rental">Rental</option>
        <option value="Airbnb">Airbnb</option>
       </select>

       {/* Description */}
       <textarea 
       name="description" 
       cols={30} 
       rows={5}
       className="w-full p-3 outline-none border-none rounded shadow-count mb-2 capitalize"
       placeholder="rental description"
       required
       ></textarea>

       <select 
       name="rentalType"
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
       multiple
       required
       >
        <option 
        value="" 
        disabled
        className="text-small-medium pb-2 border-b-2"
        >select rental types **hold ctrl + click to select multiple**</option>
        <option value="single room">Single Room</option>
        <option value="bedsitter">Bedsitter</option>
        <option value="One Bedroom">One Bedroom</option>
        <option value="Two Bedroom">Two Bedroom</option>
        <option value="Three Bedroom">Three Bedroom</option>
        <option value="Four Bedroom">Four Bedroom</option>
        <option value="Five Bedroom">Five Bedroom</option>
       </select>

       <input 
       type="number"
       name="price"
       className="w-full p-3 capitalize outline-none border-none rounded shadow-count mb-2" 
       placeholder="Rent Price"
       min={1000}
       max={50000}
       required
       />
       {/* location */}
       <input 
       type="location"
       name="location"
       className="w-full p-3 capitalize outline-none border-none rounded shadow-count mb-2" 
       placeholder="kisauni, mombasa"
       required
       />
       {/* images */}
      <div className="">
        <div className="flex justify-between">
        <CustomFileSelector
          accept="image/png, image/jpeg, image/jpg, image/avif, image/webp"
          onChange={handleFileSelected}
          />
        </div>
        <ImagePreview images={images} />

      </div>
      {/* owner */}
      <select 
       name="owner"
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
       multiple
       required
       >
        <option 
        value="" 
        disabled
        className="text-small-medium pb-2 border-b-2"
        >select the landlord</option>
        { users.map((user, index) => {
          return (
            <option 
            key={user._id} 
            value={user._id}
            className="lowercase my-2 shadow p-3 rounded cursor-pointer"
            >
            {index}. {user.name},
               {user.email}
            </option>
          )
        })}
       </select>
       {/* amenities*/}
       <Amenities
       amenities={amenities}
       setAmenities={setAmenities}
        />

        {/*GeoLocation */}
      <GeoLocation
      geoLocation={geoLocation}
      setGeoLocation={setGeoLocation}
       />

       <RentalRules
        rentalRules={rentalRules}
        setRentalRules={setRentalRules}
        />

        {/* Rental offers */}
        <RentalOffers 
        rentalOffers = {rentalOffers}
        setRentalOffers = {setRentalOffers}
        />

        {/* available rooms */}
      <input 
       type="text"
       name="availableRooms"
       className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
       placeholder="available rooms e.g 12"
       required
       />

      <select 
             name="rentalsNear"
             className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
             multiple
             >
              <option 
              value="" 
              disabled
              className="text-small-medium pb-2 border-b-2"
              >select rental near **hold ctrl + click to select multiple**</option>
              {allRentals.map((rental: any, index: number) =>{
                return (
                  <option 
                  key={rental._id} 
                  value={rental._id}
                  className="lowercase my-2 shadow p-3 rounded cursor-pointer"
                  >
                  {index}. {rental.title},
                     {rental.location}
                  </option>
                )
              })}
      </select>

      <div>
      {/* <input 
       type="text"
       name="paidBy"
       className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
       placeholder="paid by customer or landlord"
       /> */}
       <select 
       name="paidBy" 
       id=""
       className="w-full capitalize p-3 outline-none border-none rounded shadow-count mb-2"
       >
        <option value="" disabled>Select the commission type:</option>
        <option value="customer">Customer</option>
        <option value="owner">Owner</option>
       </select>

      <input 
       type="number"
       name="amount"
       className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
       placeholder="Service fee amount"
       />
        
      </div>

      <div
      className="w-full p-3 flex items-center gap-3  outline-none border-none rounded shadow-count mb-2"
      >
      <input 
       type="checkbox"
       name="rentalStatus" 
       />
       <p>Status</p>
      </div>

      <button
          type="submit"
          className={classNames({
            "bg-violet-50 w-full text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md":
              true,
            "disabled pointer-events-none opacity-40": uploading,
          })}
          disabled={uploading}
        >
          Upload
        </button>
    </form>
  );
};

export default FileUploadForm;