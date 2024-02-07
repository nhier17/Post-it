import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"




export default async function handler(req, res) {
 if (req.method === "POST" ) {
const session = await getServerSession(req, res, authOptions)
if(!session) return res.status(401).json({msg: "Please sign in "})
//get user
const prismaUser = await prisma.user.findUnique({
   where: { email: session.user?.email} 
})
try {
const {title, postId} = req.body.data
if(!title.length) {
    return res.status(401).json({msg: "Please enter comments " })
}
const result = await prisma.comment.create({
    data: {
        message: title,
        userId: prismaUser?.id,
        postId
    }
})
res.status(200).json(result)
} catch (error) {
res.status(403).json({ error: "Error has occured while making a post"})
}

 }
}