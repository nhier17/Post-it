"use client"


import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, {AxiosError} from "axios"
import toast from "react-hot-toast"


type Comment = {
    postId?: string
    title: string
  }
  type PostProps = {
    id?: string
  }
  

export default function AddComment({ id }: PostProps) {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    let commentToastId: string

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async (data: Comment) =>  await axios.post('/api/posts/addComment', { data }) ,
         onError: (error) => {
            setIsDisabled(false)
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message, { id: commentToastId })
              }
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["detail-post"]})
            setTitle("")
            setIsDisabled(false)
            toast.success("Added your comment", { id: commentToastId })
        }
     })
     const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentToastId = toast.loading("Adding your comment")
        toast.dismiss(commentToastId)
        mutate({ title, postId: id })
      }
    return (
        <form onSubmit={submitPost} className="my-8 ">
            <h3>Add comment</h3>
            <div className="flex flex-col my-2">
              <input
              onChange={(e) => setTitle(e.target.value)}
              className="p-4 text-lg rounded-md my-2"
              value={title}
              type="text"
              name="title"
              />   
            </div>
            <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
        </div>
        </form>
    )
}