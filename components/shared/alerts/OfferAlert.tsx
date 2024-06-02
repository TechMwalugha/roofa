import Link from "next/link"

interface OfferAlert {
    heading: string;
    content: string;
    url: string;
}

const OfferAlert = ({ heading, content, url }: OfferAlert) => {
  return (
   
  <div className="animate-bounce mt-5 bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert">
    <div className="flex">
      <div className="flex-shrink-0">
        
        <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
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
