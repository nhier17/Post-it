'use client'

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"


export default function Logged () {
    return (
        <li className="flex items-center gap-8">
            <button
            onClick={() => signOut()}
            className="bg-gray-600 text-white text-sm px-6 py-2 rounded-md">
            Sign Out
           </button>
           
        </li>
    )
}


