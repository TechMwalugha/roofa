import mongoose, { ObjectId } from "mongoose"
import { string } from "zod"

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

export interface createNewNotification {
    from: mongoose.Schema.Types.ObjectId;
    to: mongoose.Schema.Types.ObjectId;
    subject: string;
    message: string;
}

export interface UpdateRentalSchema {
    rentalId: string;
    title: string;
    description: string;
    rentalType: string[];
    price: number;
    location: string;
    images: string[];
    amenities: string[];
    geoLocation: {
        name: string,
        address: string,
        latitude: number,
        longitude: number
    };
    rentalRules: string[];
    availableRooms: number;
    rentalsNear: {
        _id: string;
        title: string;
        location: string;
    }[];
    serviceFee: {
        paidBy: 'customer' | 'owner';
        amount: number;
    };
    bookings: [];
    rentalStatus: boolean;
    createdAt: Date ;
    updatedAt: Date ; 
    allRentals: {
        _id: string;
        title: string;
        location: string;
    }[];
    users: {
        _id: string;
        name: string;
        email: string;
        image: string;
    }[];
    owner: string
}

export interface createPaymentInterface {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResultCode: string;
    ResultDesc: string;
    amount: number;
    mpesaReceiptNumber: string;
    transactionDate: Date;
    mpesaPhoneNumber: string;
    typeOfPayment: string;
}

export interface createBookingInterface {
    MerchantRequestID: string;
    apartmentBooked: ObjectId;
    email: string;
    fullName: string;
    reportingDate: Date;
    identityNumber: string;
    gender: 'Male' | 'Female';
}