import * as z from "zod";

const trimString: any = (u: unknown) => typeof u === "string" ? u.replaceAll(' ','') : u;

export const bookingDetailsFormSchema: any = z.object({
    email: z.preprocess(trimString, z.string().min(4, {message: 'Email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email.").email()),
    fullName: z.string().min(4, { message: 'Name is too short' }).max(50, { message: 'Too long' }),
    reportingDate: z.any().refine(date => {
        const currentDate: Date = new Date();
        const reportingDate: Date = new Date(date);
        const differenceInDays: number = Math.floor((reportingDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));

        return differenceInDays <= 10 && differenceInDays >= 0;
    }, { message: 'Reporting date must be within the next 10 days' }),
    mpesaPhoneNumber: z.preprocess(trimString, z.string().refine(phoneNumber => /^(07\d|01\d|2547\d|2541\d)\d{7}$/.test(phoneNumber), {
        message: 'Invalid M-PESA phone number format'
    })),
    identityNumber: z.string().refine(identityNumber => /^\d{6,10}$/.test(identityNumber), {
        message: 'Identity number must be a number between 6 and 10 characters'
    }),
    gender: z.enum(["female", "male"]).refine(value => value !== undefined, { message: 'Please select a gender' })
});
