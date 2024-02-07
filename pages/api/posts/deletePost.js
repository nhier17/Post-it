import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"




export default async function handler(req,res) {
 if (req.method === "DELETE" ) {
const session = await getServerSession(req,res, authOptions)
if(!session) return res.status(401).json({msg: "Please sign in "})
//delete a post
try {
const postId = req.body
const result = await prisma.post.delete({
    wherre: {
        id: postId,
    }
})
res.status(200).json(result)
} catch (error) {
res.status(403).json({ error: "Error has occured while making a post"})
}

 }
}