import { GeoLocation } from "@/interfaces"
import { ChangeEvent } from "react";


const GeoLocation = ({ geoLocation, setGeoLocation }: { geoLocation: GeoLocation, setGeoLocation: React.Dispatch<React.SetStateAction<{
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}>>}) => {

    function handleInputChange(e: ChangeEvent) {
        const {name, value} = e.target as any

        setGeoLocation(prevGeoLocation => ({
            ...prevGeoLocation,
            [name]: value
        }));

    }


  return (
    <div className="border p-3 mb-2">
        <h3 className="text-subtle-medium text-center mb-3">GeoLocation</h3>
      <input 
      type="text" 
      name="name"
      placeholder="name" 
      className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
      onChange={(e) => handleInputChange(e)}
      />

      <input 
      type="text" 
      name="address"
      placeholder="address" 
      className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
      onChange={(e) => handleInputChange(e)}
      />

      <input 
      type="text" 
      name="latitude"
      placeholder="latitude" 
      className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
      onChange={(e) => handleInputChange(e)}
      />

      <input 
      type="text" 
      name="longitude"
      placeholder="longitude" 
      className="w-full p-3  outline-none border-none rounded shadow-count mb-2" 
      onChange={(e) => handleInputChange(e)}
      />
    </div>
  )
}

export default GeoLocation
