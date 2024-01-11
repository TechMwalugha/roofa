"use server"

import { createNewNotification } from "@/interfaces";
import { connectToDB } from "../mongoose";
import Notification from "../models/notification.model";
import { fetchUserById } from "./user.actions";
import { ObjectId } from "mongoose";

export async function createNewNotification({
    from,
    to,
    subject,
    message,
}: createNewNotification) {

    try {
        connectToDB()
        
       const notification =  new Notification({
        from,
        to, 
        subject,
        message,
        })

        await notification.save()
        
        //save the notification to the user receiving it
        const toUser = await fetchUserById(to)

        toUser.notifications.push(notification._id)

        await toUser.save()

        //save the notification to the user sending it

        const fromUser = await fetchUserById(from)

        fromUser.notifications.push(notification._id)

        await fromUser.save()

    } catch (error: any) {
        throw new Error(`An error occurred creating new Notification: ${error.message}`)
    }
}

export async function readNotificationAction(id: ObjectId){

    try {
        const notification = await Notification.findById(id)

        notification.read = true

        await notification.save()


    } catch (error: any) {
        throw new Error(`An error occurred reading Notification: ${error.message}`)
    }
}

export async function deleteNotificationAction(id: ObjectId) {
    try {
        connectToDB()

        await Notification.findOneAndDelete({ _id: id})

        return true
    } catch (error: any) {
        throw new Error(`An error occurred deleting Notification: ${error.message}`)
    }
}