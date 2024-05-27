
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { updateUser, fetchUserByEmail } from "@/lib/actions/user.actions";
import { checkForRateLimit } from "@/lib/upstash";
import { headers } from "next/headers";

export async function POST(req: any) {
  try {

     //check for rate limits 

  const ip = headers().get('x-forwarded-for')

  const isRateLimit =  await checkForRateLimit({ ip: ip })

  if(!isRateLimit)  return NextResponse.json(
   { message: "Rate limit reached, please try again after 5 minutes." },
   { status: 403 }
 );

    const {  email, password } = await req.json();
    const user = await fetchUserByEmail(email)
    if(!user) return NextResponse.json({ message: 'user does not exists'}, { status: 401})
    // hash the password before storing it in db
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await updateUser({
        email: user.email,
        type: 'password',
        content: hashedPassword,
    })

    
    return NextResponse.json({ message: "password changed successfully. Login below" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}