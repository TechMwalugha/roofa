import Link from "next/link"
import { BiSolidOffer } from "react-icons/bi";

interface OfferAlert {
    heading: string;
    content: string;
    url: string;
}

const OfferAlert = ({ heading, content, url }: OfferAlert) => {
  if(!content) return
  
  return (
   
  <div className="animate-spinner-grow my-5 bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert">
    <div className="flex">
      <div className="flex-shrink-0">
        
        <span className="animate-ping inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
          <BiSolidOffer size={26} />
        </span>
        
      </div>
      <div className="ms-3">
        <h3 className="text-gray-800 text-base-medium font-semibold dark:text-white">
          {heading}
        </h3>
        <p className="text-sm text-gray-700 text-small-regular dark:text-neutral-400">
          {content}
        </p>
      </div>

      <Link
        href={url}
        className = "ml-auto mt-auto text-subtle-medium text-blue hover:underline"
        >
            Learn more
        </Link>
    </div>
  </div>
  )
}

export default OfferAlert
