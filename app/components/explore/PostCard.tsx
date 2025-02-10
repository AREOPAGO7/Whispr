import React from 'react'
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark } from 'react-icons/fi'
import Image from 'next/image'
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

interface Post {
  id: number
  user: {
    name: string
    avatar: string
    username: string
  }
  image: string
  likes: number
  comments: number
  caption: string
  timestamp: string,
  text:string
  video?: string
}

const formatTimestamp = (timestamp: string) => {
  const postDate = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} min ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} min ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 172800) { // 2 days
    return 'Yesterday';
  } else {
    return postDate.toLocaleDateString(); // Format as needed
  }
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="mx-auto lg:max-w-[70%] md:max-w-[90%] max-w-[100%] p- shadow-sm overflow-hidden border-[1px] border-white/5">
      <div className="p-4 flex items-center space-x-3 mr-">
        <Image
          src={post.user.avatar}
          alt={post.user.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className={`${poppins.className}`}>{post.user.name}</p>
          <p className={`text-[11px] text-gray-400 ${poppins.className}`}> {formatTimestamp(post.timestamp)}</p>
        </div>
      </div>
      <div className="ml-4 pb-3 ">
        <p className={`text-sm break-words ${poppins.className} text-gray-200`}>{post.text.split(' ').map((word, index) => (
          <span key={index}>
            {word}{' '}
            {(index + 1) % 12 === 0 && index !== post.text.split(' ').length - 1 && <br />} {/* Break line after every 12 words, except at the end */}
          </span>
        ))}</p>
      </div>
      {post.image ? (
        <Image
          src={post.image}
          alt="Post"
          width={800}
          height={450}
          className="aspect-video object-cover rounded-lg  h-[450px] w-[98%] mx-auto  "
        />
      ) : post.video ? (
        <video
          src={post.video}
          controls
          className="aspect-video object-cover rounded-lg h-[450px] w-[98%] mx-auto"
        />
      ) : null}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button className="hover:text-red-500">
              <FiHeart className="w-6 h-6" />
            </button>
            <button>
              <FiMessageCircle className="w-6 h-6" />
            </button>
            <button>
              <FiShare2 className="w-6 h-6" />
            </button>
          </div>
          <button>
            <FiBookmark className="w-6 h-6" />
          </button>
        </div>
        <p className="font-semibold mb-1">{post.likes.toLocaleString()} likes</p>
        <p className="mb-2">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {post.caption}
        </p>
        <p className="text-sm text-gray-500">
          View all {post.comments} comments
        </p>
        
      </div>
    </div>
  );
};

export default PostCard;