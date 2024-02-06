import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
) {
    if(req.method === "POST") {

        const title: string = req.body.title

        //get user 

        if(title.length > 300){
             return res.status(403).json({msg: "Please write a shorter post"})}
        if(!title.length) {
            return res.status(403).json({msg: "Please type something"})}
            //createpost
        try {
           const result = await prisma.post.create({
            data: {
                title,
            }
           })
           res.status(200).json({ result })
        } catch (error) {
            res.status(403).json({ error: "error has occured while making a post"})
        }
    }
}