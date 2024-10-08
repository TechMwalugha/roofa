import { bottomBarContent } from "@/constants"
import Link from "next/link"

const BottomBar = () => {
  return (
    <section className="bottombar">
        <div className="w-full bg-dark-4 p-5">
            <div className="w-full pb-3 flex items-center justify-space-between">
                {bottomBarContent.map((content, index) => (
                    <div key={index} className="footer-section flex flex-col flex-1">
                        <h1 className=" hidden md:flex mb-1 uppercase font-bold text-heading4-bold">{content.h1}</h1>
                        {content.links.map((link, index) => (
                            <Link 
                            className=" font-serif text-small-medium pb-0.5 tracking-wider capitalize hover:underline"
                            key={index}
                            href={link.url}
                            >{link.name}</Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        <div className="flex items-center justify-between bg-dark-1 p-5">
            <div className="flex gap-3 text-subtle-medium">
                <Link href='/docs/terms'>Terms and Conditions</Link>
                <Link href="/docs/privacy">Privacy Policy</Link>
            </div>
            <div className="text-subtle-medium">
                <Link href="/">Copyright © 2024, Roofa </Link>
            </div>
        </div>
</section>
  )
}

export default BottomBar
