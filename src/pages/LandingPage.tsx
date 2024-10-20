"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import CreatePost from "@/components/CreatePost"
import Logout from "@/components/Logout"
import supabase from "@/utils/supabase"
import { ThumbsUp, Repeat } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ModeToggle } from "@/components/ModeToggle"

// Post interface definition
interface Post {
  id: number
  title: string
  content: string
  image?: string
  like_count: number
  repost_count: number
}

export default function LandingPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [repostedPosts, setRepostedPosts] = useState<number[]>([])

  // Load liked posts and reposted posts from localStorage
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedPosts") || "[]")
    const savedReposts = JSON.parse(localStorage.getItem("repostedPosts") || "[]")
    setLikedPosts(savedLikes)
    setRepostedPosts(savedReposts)
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('social_media')
      .select('*')

    if (fetchError) {
      console.error("Error fetching data:", fetchError)
      setError(fetchError.message)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleLike = async (id: number) => {
    const hasLiked = likedPosts.includes(id)
    const postToUpdate = items.find(item => item.id === id)
    if (!postToUpdate) return

    const newLikeCount = postToUpdate.like_count + (hasLiked ? -1 : 1)

    // Optimistically update the UI
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, like_count: newLikeCount } : item
      )
    )

    // Toggle like in state
    const updatedLikedPosts = hasLiked 
      ? likedPosts.filter(postId => postId !== id)
      : [...likedPosts, id]
    
    setLikedPosts(updatedLikedPosts)
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts))

    // Send like count to the API
    const { error } = await supabase
      .from('social_media')
      .update({ like_count: newLikeCount })
      .eq('id', id)

    if (error) {
      console.error("Error updating like count:", error)
      // Revert the optimistic update on failure
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, like_count: postToUpdate.like_count } : item
        )
      )
    } else {
      toast({
        title: hasLiked ? "Post Unliked" : "Post Liked",
        description: hasLiked ? "You have unliked this post." : "You have liked this post.",
      })
    }
  }

  const handleRepost = async (id: number) => {
    const postToUpdate = items.find(item => item.id === id)
    if (!postToUpdate) return

    // Optimistically update the UI by moving reposted item to the top
    setItems(prevItems => {
      const repostedItem = { ...postToUpdate, repost_count: postToUpdate.repost_count + 1 }
      return [repostedItem, ...prevItems.filter(item => item.id !== id)]
    })

    const updatedRepostedPosts = [...repostedPosts, id]
    setRepostedPosts(updatedRepostedPosts)
    localStorage.setItem("repostedPosts", JSON.stringify(updatedRepostedPosts))

    // Upload new post as repost to Supabase
    const { error } = await supabase
      .from('social_media')
      .insert({
        title: postToUpdate.title,
        image: postToUpdate.image,
        content: postToUpdate.content, // Include content in repost
        like_count: 0,
        repost_count: 0,
      })

    if (error) {
      console.error("Error reposting:", error)
    } else {
      toast({
        title: "Post Reposted",
        description: "You have reposted this post.",
      })
    }
  }

  const handlePostCreated = () => {
    fetchItems()
    setIsModalOpen(false) // Close the modal after creating a post
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center space-y-4 p-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[400px] w-full max-w-[600px]" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Landing Page</h1>

<ModeToggle/>      

      <div className="flex justify-center space-x-4 mb-8">
        <Button onClick={() => setIsModalOpen(true)}>
          Create New Post
        </Button>
        <Button onClick={() => Logout()} variant="outline">Logout</Button>
      </div>

      {isModalOpen && (
        <CreatePost onClose={() => setIsModalOpen(false)} onPostCreated={handlePostCreated} open={isModalOpen} />
      )}

      {items.length === 0 ? (
        <Alert>
          <AlertTitle>No posts found</AlertTitle>
          <AlertDescription>Be the first to create a post!</AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="border-2 border-l-slate-500">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="mb-4 text-gray-600">{item.content}</p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4 text-red-500" />
                    {item.like_count}
                  </span>
                  <span className="flex items-center">
                    <Repeat className="mr-1 h-4 w-4 text-blue-500" />
                    {item.repost_count}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => handleLike(item.id)}
                  variant={likedPosts.includes(item.id) ? "default" : "outline"}
                  size="sm"
                >
                  {likedPosts.includes(item.id) ? "Liked" : "Like"}
                </Button>
                <Button
                  onClick={() => handleRepost(item.id)}
                  variant={repostedPosts.includes(item.id) ? "default" : "outline"}
                  size="sm"
                >
                  {repostedPosts.includes(item.id) ? "Reposted" : "Repost"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
