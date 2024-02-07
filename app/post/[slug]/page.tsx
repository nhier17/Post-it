'use client'


import Post from "../../components/Post"
import { PostType } from "../../types/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AddComment from "../../components/AddComment"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async(slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const {data, isLoading} = useQuery<PostType>({
queryFn: () => fetchDetails(url.params.slug),
queryKey:['detail-post']

    })
if (isLoading) return "Loading..."

    return(
        <div>
          <Post 
          id={data?.id}
          name={data?.user.name}
          avatar={data?.user.image}
          postTitle={data?.title}
          comments={data?.Comment}
          />
          <AddComment id={data?.id}/>
        </div>
    )
}