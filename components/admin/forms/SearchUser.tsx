"use client"
 
import { searchFormSchema } from "@/lib/validations/search.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FiSearch } from 'react-icons/fi'
 

const SearchUser = () => {
    const form = useForm<z.infer<typeof searchFormSchema>>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
          searchString: "",
        },
      })

      function onSubmit(values: z.infer<typeof searchFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full  relative  flex items-center justify-center gap-3 border-2 border-none rounded-full">
        <FormField
          control={form.control}
          name="searchString"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="border-blue">
                <Input className="no-focus outline-none w-full" placeholder="search name, email" {...field} />
              </FormControl>
              <FormMessage className="absolute bg-red-700 text-dark-1 px-3 rounded" />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded bg-blue "><FiSearch/></Button>
      </form>
    </Form>
  )
}

export default SearchUser
