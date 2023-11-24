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