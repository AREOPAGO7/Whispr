import React from 'react'
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark } from 'react-icons/fi'
import Image from 'next/image'

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
  timestamp: string
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className=" xl:w-[60%] xl:mx-auto  md:w-[80%] rounded-xl shadow-sm overflow-hidden border-[1px] border-white/5">
      <div className="p-4 flex items-center space-x-3">
        <Image
          src={post.user.avatar}
          alt={post.user.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{post.user.name}</p>
          <p className="text-sm text-gray-500">@{post.user.username}</p>
        </div>
      </div>
      <Image
        src={post.image}
        alt="Post"
        width={800}
        height={800}
        className="w-full aspect-square object-cover"
      />
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
        <p className="text-xs text-gray-400 mt-1">{post.timestamp}</p>
      </div>
    </div>
  )
}

export default PostCard;