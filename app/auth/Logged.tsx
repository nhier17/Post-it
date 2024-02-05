'use client'

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"

type User = {
    image: string
}
export default function Logged ({ image }: User) {
    return (
        <li className="flex items-center gap-8">
            <button
            onClick={() => signOut()}
            className="bg-gray-600 text-white text-sm px-6 py-2 rounded-md">
            Sign Out
           </button>
           <Link href={'/dashboard'}>
            <Image
            className="w-14 rounded-full"
             width={64} 
             height={64}
              src={image} 
              alt="profile"
              priority
              />
           </Link>
        </li>
    )
}


