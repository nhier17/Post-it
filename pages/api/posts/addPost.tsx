import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if (req.method === "POST" ) {
const session = await getServerSession(req,res, authOptions)
if(!session) return res.status(401).json({msg: "Please sign in to make a post"})

const title: string = req.body.title
const prismaUser = await prisma.user.findUnique({
  where: {email: session?.user?.email}
})


if(title.length > 300) {
return res.status(403).json({msg: "Please write a shorter post"})
}
if (!title.length) {
return res.status(403).json({msg: "Please do not leave this empty"})
}
try {
const result = await prisma.post.create({
  data: {
      title,
      userId: prismaUser.id,
  },
})
res.status(200).json(result)
} catch (error) {
res.status(403).json({ error: "Error has occured whilst making a post"})
}

 }
}