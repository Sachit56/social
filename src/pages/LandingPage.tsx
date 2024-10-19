import { Post } from "@/utils/interface";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import CreatePost from "@/components/CreatePost";
import Logout from "@/components/Logout";

const LandingPage: React.FC = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from<Post>('social_media')
      .select('*');

    if (fetchError) {
      console.error("Error fetching data:", fetchError);
      setError(fetchError.message);
    } else {
      console.log("Fetched data:", data);
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {

    fetchItems();
  }, []);

  const handleLike = async (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, like_count: item.like_count + 1 } : item
      )
    );

    const { error } = await supabase
      .from('social_media')
      .update({ like_count: items.find(item => item.id === id)?.like_count + 1 })
      .eq('id', id);

    if (error) {
      console.error("Error updating like count:", error);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, like_count: item.like_count - 1 } : item
        )
      );
    }
  };

  const handleRepost = async (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, repost_count: item.repost_count + 1 }
          : item
      )
    );
  
    const { error } = await supabase
      .from('social_media')
      .update({
        repost_count: items.find(item => item.id === id)?.repost_count + 1,
      })
      .eq('id', id);
  
    if (error) {
      console.error("Error updating repost count:", error);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, repost_count: item.repost_count - 1, repost_message: "" }
            : item
        )
      );
    }
  };

  const handlePostCreated = () => {
    fetchItems();
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Landing Page</h1>
      
      <Button
        onClick={() => setIsModalOpen(true)} 
        className="mb-4"
      >
        Create New Post
      </Button>

      {isModalOpen && (
        <CreatePost onClose={() => setIsModalOpen(false)} onPostCreated={handlePostCreated} />
      )}

      <Button onClick={()=>Logout()}>Logout</Button>



      {items.length === 0 ? (
        <div>No items found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border p-4 rounded">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-auto" />
              )}
              <p className="text-lg font-semibold">Like Count: {item.like_count}</p>
              <p className="text-lg font-semibold">Repost Count: {item.repost_count}</p>

              <Button
                onClick={() => handleLike(item.id)}
                className="mr-2"
              >
                Like
              </Button>

              <Button
                onClick={() => handleRepost(item.id)}
              >
                Repost
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
