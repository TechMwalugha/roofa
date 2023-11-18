'use client'

import Image from "next/image"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

interface Props {
    routeType: string
}

const SearchUser = ({routeType}: Props) => {

    const router = useRouter()
    const [search, setSearch] = useState('')

    useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            if(search) {
                router.push(`${routeType}?q=`+ search)
            } else {
                router.push(routeType)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)

    }, [search, routeType])

  return (
    <div className='searchbar'>
        <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
        />
        <input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
            routeType !== "users" ? "Search communities" : "Search name, email"
        }`}
        className='no-focus searchbar_input'
        />
  </div>
  )
}

export default SearchUser
