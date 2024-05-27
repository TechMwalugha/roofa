import { fetchUserByEmail } from "@/lib/actions/user.actions";
import fs from "fs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession()
  if(!session) {
    redirect('/not-found')
  }
  const sessionUser = await fetchUserByEmail(session?.user?.email as string)

  if(!sessionUser) {
    redirect('/not-found')
  }

  let isAllowed: boolean =  (sessionUser.role === 'roofa-agent' || sessionUser.role === 'admin') ? true : false

  if(!isAllowed) {
    redirect('/not-found')
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
      fs.writeFileSync(`/var/www/html/images/rentalImages/${newFileName}`, buffer);
      imageUrls.push(newFileName)
    }
  }
  return NextResponse.json({ success: true, data: imageUrls });
}
