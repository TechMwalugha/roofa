import { fetchUserByEmail } from "@/lib/actions/user.actions";
import { checkForRateLimit } from "@/lib/upstash";
import { apiKeys } from "@/lib/utils";
import fs from "fs";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {
     // check for rate limits 

//   const ip = headers().get('x-forwarded-for')

//   const isRateLimit =  await checkForRateLimit({ ip: ip })

//   if(!isRateLimit)  return NextResponse.json(
//    { message: "Rate limit reached, please try again after 5 minutes." },
//    { status: 429 }
//  );

 //check for the api key
 const apiKey = req.headers.get('x-api-key');

 if (!apiKey || !apiKeys.includes(apiKey)) {
     return NextResponse.json(
         { message: "Unauthorized. Invalid API key." },
         { status: 401 }
     );
 }
 const session = await getServerSession()
  if(!session) {
    return NextResponse.json({
      message: "Forbidden"
    },{
      status: 403
    })
  }

  const sessionUser = await fetchUserByEmail(session?.user?.email as string)

  if(!sessionUser) {
    return NextResponse.json({
      message: "Forbidden"
    },{
      status: 403
    })
  }

  let isAllowed: boolean =  (sessionUser.role === 'roofa-agent' || sessionUser.role === 'admin') ? true : false

  if(!isAllowed) {
    return NextResponse.json({
      message: "Forbidden"
    },{
      status: 403
    })
  }

  const imageUrls = []
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
        const extension = formDataEntryValue.name.split('.');

    const newFileName: string = `${Date.now()}_${extension[0]}.${extension[extension.length - 1 ]}`;
      const fil = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await fil.arrayBuffer());
      fs.writeFileSync(`/var/www/html/images/rentalImages/${newFileName}`, new Uint8Array(buffer));
      // fs.writeFileSync(`C:/RealProjects/roofa/public/rentalImages/${newFileName}`, buffer);
      imageUrls.push(newFileName)
    }
  }

  return NextResponse.json({ 
    message: "Images uploaded successfully", 
    data: imageUrls 
  },{
    status: 200
  });
    
  } catch (error: any) {
    return NextResponse.json({
      message: "An error occurred on our end. Please try again"
    },
    {
      status: 500
    }
  )
  }
}
