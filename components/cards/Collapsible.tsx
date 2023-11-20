import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { FaArrowAltCircleDown } from "react-icons/fa";

const CollapsibleCon = (
    {
        title,
        content
    }:
    {
        title: string,
        content: any[]
    }
) => {
  return (
<Collapsible className="mb-4">
  <CollapsibleTrigger
  className="flex items-center justify-between border-b-4 w-full text-start p-1 rounded-md uppercase"
   >
    <h4 className="text-base-medium">{title}</h4>
   <FaArrowAltCircleDown size={25} />
   </CollapsibleTrigger>
  <CollapsibleContent className="">
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
  )
}

export default CollapsibleCon
