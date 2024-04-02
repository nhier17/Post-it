import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req,res) {
const session = await getServerSession(req,res,authOptions)
if (!session) {
    return res.status(401).json({msg: "Please sign in to make a post"})
}
//get user

const prismaUser = await prisma.user.findUnique({
    where: {email: session.user.email}
})
if (req.method === "POST") {
    const {title, postId} = req.body.data
    
    console.log(title,postId)
    if (!title.length) {
        return res.status(401).json({msg: "Please add comment"})
    }
    try {
        const result = await prisma.comment.create({
            data: {
                title,
                userId: prismaUser.id,
                postId,
            },
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "An error occurred while adding the comment" })
    }
} else {
    res.status(405).json({ msg: "Method not allowed" })
}
}