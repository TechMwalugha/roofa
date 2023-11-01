
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { updateUser, fetchUserByEmail } from "@/lib/actions/user.actions";

export async function POST(req: any) {
  try {
    const {  email, password } = await req.json();
    const user = await fetchUserByEmail(email)
    if(!user) return NextResponse.json({ message: 'user exists'}, { status: 401})
    // hash the password before storing it in db
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser({
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        password: hashedPassword,
        isEmailVerified: user.isEmailVerified,
        verificationToken: '',
        role: user.role,
        accountStatus: user.accountStatus,
    })

    
    return NextResponse.json({ message: "password reset successfully." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}