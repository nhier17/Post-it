import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
 if (req.method === "GET" ) {
const session = await getServerSession(req,res, authOptions)
if(!session) return res.status(401).json({msg: "Please sign in "})
//get auth user post
try {
const data = await prisma.user.findUnique({
    where: {
        email: session.user?.email,
    },
    include: {
        posts: {
            orderBy: {
                createdAt: "desc"
            },
            include: {
                Comment: true
            }
        }
    }
})
res.status(200).json(data)
} catch (error) {
res.status(403).json({ error: "Error has occured while making a post"})
}

 }
}