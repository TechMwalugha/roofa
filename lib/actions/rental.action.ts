"use server"

import { createNewRental } from "@/interfaces"
import { connectToDB } from "../mongoose"
import Rental from "../models/rental.model"
import  fs  from "fs"

export async  function createRental({
            title,
            description,
            rentalType,
            price,
            location,
            images,
            owner,
            amenities,
            geoLocation,
            rentalRules,
            availableRooms,
            rentalsNear,
            serviceFee,
            rentalStatus,
}: createNewRental) {
    try {
         connectToDB()
        const rental = new Rental({
            title,
            description,
            rentalType,
            price,
            location,
            images,
            owner,
            amenities,
            geoLocation,
            rentalRules,
            availableRooms,
            rentalsNear,
            serviceFee,
            rentalStatus,
        })
        await rental.save()

    } catch (error: any) {
        throw new Error(`Unable to create new rental: ${error.message}`)
    }
}