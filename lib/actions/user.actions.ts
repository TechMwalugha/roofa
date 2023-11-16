"use server"
import { connectToDB } from '@/lib/mongoose'
import User from '../models/user.model'
import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'
import sendEmail from '../emailing/nodemailer.email'

interface createUserProps {
    name: string,
    email: string,
    image: string,
    password: string | '',
    signInType: 'google' | 'credentials',
    isEmailVerified: boolean,
}
interface updateUserProps {
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

export async function deleteUser(id: mongoose.Schema.Types.ObjectId) {
    try {
        connectToDB()

        await User.deleteOne({ id: id})
        
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