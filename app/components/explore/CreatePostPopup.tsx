import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { FaRegImage } from "react-icons/fa6";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { Poppins } from 'next/font/google';
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

interface CreatePostPopupProps {
  onClose: () => void;
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({ onClose }) => {
  const [postContent, setPostContent] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setVideo(file);
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File, type: 'image' | 'video'): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "whispr"); // Your unsigned upload preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dl2eb7wer/${type}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      let videoUrl = '';

      if (image) {
        imageUrl = await uploadToCloudinary(image, 'image');
      }
      if (video) {
        videoUrl = await uploadToCloudinary(video, 'video');
      }

      const postData = {
        id: Date.now(),
        user: {
          name: user?.username || "unknown",
          avatar: "https://github.com/shadcn.png",
          id: user?.uid || ''
        },
        image: imageUrl,
        video: videoUrl,
        likes: 0,
        comments: 0,
        caption: caption || '',
        timestamp: new Date().toISOString(),
        text: postContent || ''
      };

      await addDoc(collection(db, "posts"), postData);
      console.log("Post submitted successfully");
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      // You might want to add a toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1c1c1c] rounded-xl p-4 lg:w-1/3 w-5/6 mb-56 lg:mr-16">
        <h2 className="text-lg font-semibold mb-2 text-center">Create Post</h2>
        <div className="flex items-center mb-2">
          <img
            src={"https://github.com/shadcn.png"}
            alt="User Avatar"
            className="rounded-full w-10 h-10 mr-2"
          />
          <div>
            <p className="font-semibold">{user?.username}</p>
            <p className="text-sm text-gray-500">Friends</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            className={`w-full bg-[#1c1c1c] mb-20 rounded-lg p-2 outline-none text-lg ${poppins.className}`}
            placeholder={`What's on your mind, ${user?.username} ?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={4}
          />

          <input
            type="text"
            className="w-full border-2 bg-[#1c1c1c] rounded-lg border-white/5 p-3 outline-none"
            placeholder="Add hashtags (#nextJs, #reactJs)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
          <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="video-upload" />

          <div className={`flex gap-4 ml-1 mt-4 p-1 rounded-lg ${poppins.className} text-sm cursor-pointer`}>
            <div className='flex gap-2' onClick={() => document.getElementById('image-upload')?.click()}>
              <FaRegImage className='text-blue-400 text-xl' />
              <button type="button" className="text-white">Media</button>
            </div>
            <div className='flex gap-2' onClick={() => document.getElementById('video-upload')?.click()}>
              <BsFillCameraReelsFill className='text-green-400 text-lg mr-1' />
              <button type="button" className="text-white">Video</button>
            </div>
          </div>

          {imagePreview && <img src={imagePreview} alt="Image Preview" className="h-[400px] w-full mt-4 rounded-xl mb-2" />}
          {videoPreview && <video controls className="w-full h-auto mb-2"><source src={videoPreview} type="video/mp4" /></video>}

          <div className="border-white/5 mt-6 border"></div>
          <div className="flex justify-between items-center mt-2">
            <button type="button" className={`mr-2 text-gray-300 text-sm p-2 ${poppins.className}`} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={`bg-primary/90 text-white rounded px-6 py-1 mt-4 ml-3 ${poppins.className}`}>
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPopup;
