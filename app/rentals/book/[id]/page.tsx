import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const page = ({ params } : { params: { id: string }}) => {
  return (
    <Tabs 
    defaultValue="account" 
    className="w-full p-3 flex flex-col">
      <TabsList
      className="flex items-center justify-around bg-black"
      >
        <TabsTrigger value="account">Your Details</TabsTrigger>
        <TabsTrigger value="password">Review Order</TabsTrigger>
      </TabsList>
      <TabsContent 
      value="account"
      className="shadow"
      >Make changes to your account here. { params.id } </TabsContent>
      <TabsContent 
      value="password"
      className="shadow"
      >Change your password here.</TabsContent>
    </Tabs>
  )
}

export default page
