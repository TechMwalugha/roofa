import mongoose from "mongoose"

export type menuBarType = {
    title: string,
    image: string,
    content: string[]
}

export interface updateUserProps {
    id: mongoose.Schema.Types.ObjectId
    name: string
    email: string 
    image: string 
    password: string
    isEmailVerified: boolean 
    verificationToken: string 
    role: string 
    accountStatus: boolean
}
export interface GeoLocation {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

export interface createNewRental {
    title: string;
    description: string;
    rentalType: string[]
    price: number;
    location: string;
    images: string[];
    owner: mongoose.Schema.Types.ObjectId;
    amenities: string[];
    geoLocation: {
            name: string,
            address: string,
            latitude: number,
            longitude: number
    };
    rentalRules: string[];
    availableRooms: number;
    rentalsNear: mongoose.Schema.Types.ObjectId[];
    serviceFee: {
        paidBy: string;
        amount: number;
    };
    rentalStatus: boolean;

}