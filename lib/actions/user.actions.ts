"use server"
import { connectToDB } from '@/lib/mongoose'
import User from '../models/user.model'
import mongoose, { ObjectId, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'
import sendEmail from '../emailing/nodemailer.email'
import { FilterQuery } from 'mongoose'
import { updateUserProps } from '@/interfaces'

interface createUserProps {
    name: string,
    email: string,
    image: string,
    password: string | '',
    signInType: 'google' | 'credentials',
    isEmailVerified: boolean,
}


export async function createUser({
    name,
    email,
    image,
    password,
    signInType,
    isEmailVerified,
}: createUserProps) {
    try {
       connectToDB()

        const user = new User({
            name: name,
            email: email,
            image: image,
            password: password,
            signInType: signInType,
            isEmailVerified: isEmailVerified,
        })

      await user.save()

      return user

    } catch(error: any) {
        throw new Error(`Failed to create user: ${error.message}`)
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        connectToDB()
        const user = await User.findOne({ email: email })

        return user

    } catch (error: any) {
        throw new Error(`Unable to fetch user: ${error.message}`)
    }
}

export async function fetchUserByToken(token: string) {
    try {
        connectToDB()
        const user: any = await User.findOne({ verificationToken: token })

        return user

    } catch (error: any) {
        throw new Error(`Unable to fetch user: ${error.message}`)
    }
}

export async function updateUser(
    {id, name, email, image, password, isEmailVerified, verificationToken, role, accountStatus}: updateUserProps
    ) {
    try {
        connectToDB()

        const user = await User.findById(id)

        if(!user) return null

        user.name = name
        user.email = email
        user.image = image
        user.password = password
        user.isEmailVerified = isEmailVerified
        user.verificationToken = verificationToken
        user.role = role
        user.accountStatus = accountStatus
        
        await user.save()


    } catch (error: any) {
        throw new Error(`Unable to update user: ${error.message}`)
    }
}

export async function fetchUserById(id: mongoose.Schema.Types.ObjectId) {
    try {
        connectToDB()

        const user = await User.findById(id)

        return user
    } catch (error: any) {
        throw new Error("An error occured: " + error.message)
    }
}

export async function deleteUser(userId: mongoose.Schema.Types.ObjectId) {
    try {
        connectToDB()
        console.log(userId)

        const user = await User.findById(userId)
        console.log(user)
        
    
        const deletedUser = await User.findOneAndDelete({ 
            _id: userId
        });

        console.log(deletedUser)
        
    } catch (error: any) {
        throw new Error(`An error occurred: ${error.message}`)
    }
}

export async function updateUserImage({ id, newFileName}: { id: mongoose.Schema.Types.ObjectId, newFileName: string}) {
    try {
        connectToDB()

        const user = await User.findById(id)

        user.image = `/userImages/${newFileName}`

        await user.save()
        
    } catch (error: any) {
        throw new Error(`an error occurred: ${error.message}`)
        
    }
}

export async function updateUserProfile(
    {id, name, email, path}:
    {
        id: mongoose.Schema.Types.ObjectId
        name: string,
        email: string,
        path: string
    }) {

        connectToDB()

        try {
            const user = await User.findById(id)

            if(!user) return 

            user.name = name
            user.email = email

            
            await user.save()
            
            revalidatePath(path)

            
        } catch (error: any) {
            throw new Error('an error occurred while updating data. Try again')
        }
}
export async function fetchAllUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
  }: {
    userId: string;
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
      const query: FilterQuery<typeof User> = {
        _id: { $ne: userId }, // Exclude the current user from the results.
      };
  
      // If the search string is not empty, add the $or operator to match either name or email fields.
      if (searchString.trim() !== "") {
        query.$or = [
          { name: { $regex: regex } },
          { email: { $regex: regex } },
        ];
      }
  
      // Define the sort options for the fetched users based on createdAt field and provided sort order.
      const sortOptions = { createdAt: sortBy };
  
      const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize)
  
      // Count the total number of users that match the search criteria (without pagination).
      const totalUsersCount = await User.countDocuments(query);
  
      const users = await usersQuery.exec();
  
      // Check if there are more users beyond the current page.
      const isNext = totalUsersCount > skipAmount + users.length;
  
      return { users, isNext };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

export async function updateUserRole({ id, newRole }: {id: string, newRole: string}) {
    try {
        connectToDB()

        const user = await User.findById(id)

        user.role = newRole

        await user.save()
        
    } catch (error: any) {

     console.error("Error fetching users:", error);
      throw error;
    }
}

export async function suspendUser({id, newAccountStatus}:{id: string, newAccountStatus: boolean}) {
    try {
        connectToDB()

        const user = await User.findById(id)

        user.accountStatus = newAccountStatus

        await user.save()
        
    } catch (error: any) {

     console.error("Error fetching users:", error);
      throw error;
    }
}

export async function addFavoriteRental({ id, rentalId, path} : { id: ObjectId, rentalId: ObjectId, path: string}) {
    try {
        connectToDB()

        const user = await User.findById(id)
 
        if(!user) {
            return
        }

        if(user.favorites.includes(rentalId)) {
           const index =  user.favorites.indexOf(rentalId)

            user.favorites.splice(index, 1)

            await user.save()

            revalidatePath(path)

            return true
        }


        user.favorites.push(rentalId)

        await user.save()

        revalidatePath(path)

        return true
    }  catch (error: any) {

        console.error("Error adding rental as favorite:", error);
         throw error.message;
       }
}