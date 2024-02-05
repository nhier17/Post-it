import Link from "next/link"
import Login from "./Login"
import { getServerSession } from "next-auth"
import {authOptions } from "../../pages/auth/[...nextauth]"
import Logged from "./Logged"

export default async function Nav() {
    
    
    return(
    <nav className="flex justify-between items-center py-8">
       <Link href={'/'}>
       <h1 className="font-bold text-lg">Send it</h1>
       </Link> 
       <ul className="flex items-center gap-6">
        <Login/>
        <Logged/>
       </ul>
    </nav>
    )
}