"use server"

import { createNewRental } from "@/interfaces"
import { connectToDB } from "../mongoose"
import Rental from "../models/rental.model"
import User from "../models/user.model"
import { FilterQuery, ObjectId, SortOrder } from "mongoose"
import mongoose from "mongoose"
import { join } from "path"
import { unlink } from "fs/promises"

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

export async function fetchAllRentals({
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: {
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
  }) {
    try {
      connectToDB();
  
      // Calculate the number of users to skip based on the page number and page size.
      const skipAmount = (pageNumber - 1) * pageSize;
  
      // Create a case-insensitive regular expression for the provided search string.
      const regex = new RegExp(searchString, "i");

      // Create an initial query object to filter users.
      const query: FilterQuery<typeof Rental> = {};
  
      // If the search string is not empty, add the $or operator to match either name or email fields.
      if (searchString.trim() !== "") {
        query.$or = [
          { title: { $regex: regex } },
          { location: { $regex: regex } },
          { rentalType: { $regex: regex } },
          { amenities: { $regex: regex } },
        ];
      }
  
      // Define the sort options for the fetched users based on createdAt field and provided sort order.
      const sortOptions = { createdAt: sortBy };
  
      const rentalsQuery = Rental.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)
  
      // Count the total number of users that match the search criteria (without pagination).
      const totalRentalsCount = await Rental.countDocuments(query);
  
      const rentals = await rentalsQuery.exec();
  
      // Check if there are more users beyond the current page.
    const isNext = totalRentalsCount > skipAmount + rentals.length;
  
      return { rentals, totalRentalsCount, isNext };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

export async function fetchSingleRental({ id }: { id : ObjectId}) {
  try{
    connectToDB()
    const rental = await Rental.findById(id).populate({
      path: 'owner',
      model: User,
      select: 'name image _id'
    })
    .populate({
      path: 'rentalsNear',
      model: Rental,
      select: 'title location price images'
    })
    if(!rental) {
      throw new Error("Rental not found")
    }
    return rental

  } catch(error: any) {
    throw new Error(`${error.message}`)
  }
}

export async function updateRental({
            rentalId,
            title,
            description,
            rentalType,
            price,
            location,
            owner,
            amenities,
            geoLocation,
            rentalRules,
            availableRooms,
            rentalsNear,
            serviceFee,
            rentalStatus,
}: {
    rentalId: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    rentalType: string[]
    price: number;
    location: string;
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
}) {

  try{
    connectToDB()

    const rental = await Rental.findById(rentalId)

    if(!rental) return

    //TODO: check if the new values are equal to the old values

    rental.title = title
    rental.description = description
    rental.rentalType = rentalType
    rental.price = price
    rental.location = location
    rental.owner = owner
    rental.amenities = amenities
    rental.geoLocation = geoLocation
    rental.rentalRules = rentalRules
    rental.availableRooms = availableRooms
    rental.rentalsNear = rentalsNear
    rental.serviceFee = serviceFee
    rental.rentalStatus = rentalStatus
    console.log("updated successfully.")
    await rental.save()

    
  } catch(error: any) {
    throw new Error(`could not update rental: ${error.messagae}`)
  }
}

export async function deleteRentalImages({ image, rentalId} : { image: string; rentalId: ObjectId}) {
  try {
    connectToDB()

    const rental = await Rental.findById(rentalId)
    .select('images')

    const path = join('/', 'var', 'www', 'html', 'images', 'rentalImages', image)

    if (!rental || !rental.images?.length) {
      throw new Error("Rental not found")
    }

    rental.images = rental.images.filter((img: string) => img !== image)
    await rental.save()

    //delete image completely from the computer
    await unlink(path)

  } catch (error: any) {
    throw new Error(`Unable to fetch rental to delete image: ${error.message}`)
    
  }
}

export async function updateRentalImagesAction({ rentalId, images}: { rentalId: ObjectId, images: string[]}) {
  try {
    connectToDB()

    const rental = await Rental.findById(rentalId).
    select('images')

    if(!rental) throw new Error(`Rental not found!`)

    images.map((image: string) => {
      rental.images?.push(image)
    })

    await rental.save()
  } catch (error: any) {
    throw new Error(`Unable to update images: ${error.message}`)
  }
}

export async function retrieveRentalPrice({ rentalId } : { rentalId: string }) {
  try {
    connectToDB()

    const rental = await Rental.findById(rentalId as unknown as ObjectId).select('price serviceFee')

    if(!rental) return {status: 'error', amount: rental.price + rental.serviceFee.amount}

    if(rental.serviceFee.paidBy === 'customer') return  {status: 'success', amount: rental.price + rental.serviceFee.amount}

    return {
      status: 'success',
      amount: rental.price
    }
    
  } catch (error: any) {
    throw new Error('Unable to fetch the price of the rental. Please try again')
  }

}

export async function fetchRentalImages({ id }: { id: string }) {
  try{
    connectToDB()
    const rentalImages = await Rental.findById(id as unknown as ObjectId)
    .select('title location images')

    if(!rentalImages) return false

    return rentalImages
  } catch(error: any) {
    return false
  }
}