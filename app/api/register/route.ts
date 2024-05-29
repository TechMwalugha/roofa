
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createUser, fetchUserByEmail } from "@/lib/actions/user.actions";
import { headers } from "next/headers";
import { checkForRateLimit } from "@/lib/upstash";
import { apiKeys } from "@/lib/utils";

export async function POST(req: any) {
  try {

    //check for rate limits 

    const ip = headers().get('x-forwarded-for')

    const isRateLimit =  await checkForRateLimit({ ip: ip })

    if(!isRateLimit)  return NextResponse.json(
     { message: "Rate limit reached, please try again after 5 minutes." },
     { status: 429 }
   );

          //check for the api key
  const apiKey = req.headers.get('x-api-key');

  if (!apiKey || !apiKeys.includes(apiKey)) {
      return NextResponse.json(
          { message: "Unauthorized. Invalid API key." },
          { status: 401 }
      );
  }


    const { name, email, password } = await req.json();
    const userExists: any = await fetchUserByEmail(email)
    if(userExists) return NextResponse.json({ message: 'user exists'}, { status: 401})
    // hash the password before storing it in db
    const hashedPassword = await bcrypt.hash(password, 10);
    createUser({
      name: name,
      email: email,
      image: "/userImages/account-profile.png",
      password: hashedPassword,
      signInType: 'credentials',
      isEmailVerified: false,      
  })

    
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}