'use client'

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddPost from "./components/addPost";
import Post from "./components/Post"

//fetch all posts
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function Home() {
  const {data, error,isLoading} = useQuery({
    queryFn: allPosts,
    queryKey: ['posts'],

  })
  if (error) return error
  if (isLoading) {
    return "Loading..."
  }
  console.log(data)
  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
            />
      ))}
    </main>
  );
}
