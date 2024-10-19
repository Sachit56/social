import { useState } from "react";
import supabase from "@/utils/supabase";

interface CreatePostProps {
  onClose: () => void;
  onPostCreated: () => void; 
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose, onPostCreated }) => {
  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  const handleCreatePost = async () => {
    if (!newPostTitle || !newPostImage) return;

    console.log('Image:'+newPostImage.name)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('Aava') 
      .upload(`${newPostImage.name}`, newPostImage,{
        cacheControl: '3600',
        upsert: false
      });

    console.log('Upload Data:' + uploadData)


    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return;
    }

    const imageUrl = `https://socmbxdnbvmuwflodazb.supabase.co/storage/v1/object/public/Aava/${newPostImage.name}`;

    console.log('Image URL: ' + imageUrl);

    const { error: insertError } = await supabase
      .from('social_media')
      .insert({title: newPostTitle,content:newPostContent, image: imageUrl, like_count: 0, repost_count: 0 });

    if (insertError) {
      console.error("Error inserting new post:", insertError);
    } else {
      onPostCreated(); 
      onClose();
      setNewPostTitle("");
      setNewPostImage(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          placeholder="Post Content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="file"
          onChange={(e) => e.target.files && setNewPostImage(e.target.files[0])}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
