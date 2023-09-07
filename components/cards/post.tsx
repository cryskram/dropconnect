"use client";

import { Comment, Like, Post, User } from "@prisma/client";
import Image from "next/image";
import { MdEdit, MdModeEdit, MdOutlineDelete } from "react-icons/md";
import { FaCommentDots, FaHeart, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

interface PostProp {
  id: string;
  content: string;
  tags?: string[];
  like?: Like[];
  author?: User | null;
  authorId?: string;
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCardProp {
  post: PostProp;
  image?: string;
  author?: string;
  mUserId?: string;
}

const PostCard = ({ post, image, author, mUserId }: PostCardProp) => {
  const handleLikeClick = async () => {
    try {
      const res = await axios.put(`/api/posts/likes/${post.id}`, {
        postId: post.id,
      });
      if (!res) {
        throw new Error("Error liking");
      }
    } catch (err) {
      console.error("error liking: ", err);
    }
  };
  return (
    <div className="bg-slate-800 p-4 mb-3 rounded-2xl">
      <div className="flex gap-2 items-start">
        <Image
          className="border-2 border-slate-200 rounded-full"
          src={image as string}
          width={42}
          height={42}
          alt="author pfp"
        />
        {/* change added here */}
        <div className="w-full">
          <div className="flex justify-between items-center">
            <Link
              href={`/user/${post.authorId}`}
              className="text-slate-300/80 underline underline-offset-4"
            >
              {author}
            </Link>
            <div
              className={`flex gap-3 text-xl ${
                post.authorId !== mUserId ? "hidden" : ""
              }`}
            >
              <button className="bg-slate-700 text-primary px-2 py-1 rounded-xl">
                <MdEdit />
              </button>
              <button className="bg-slate-700 text-mRed px-2 py-1 rounded-xl">
                <MdOutlineDelete />
              </button>
            </div>
          </div>
          <div className="my-2">
            <h1 className="text-xl text-justify max-w-full">{post.content}</h1>
          </div>

          <div className="flex justify-between text-slate-400 my-4 text-sm">
            <h1>{post.like!.length ?? 0} Likes</h1>
            <h1>{post.comments.length ?? 0} Comments</h1>
          </div>

          <div className="grid gap-3 w-3/4 mx-auto mt-8 grid-cols-3">
            <button
              onClick={handleLikeClick}
              className="bg-slate-700 px-4 py-2 rounded-xl"
            >
              <div className="flex gap-2 items-center justify-center text-mRed">
                <FaHeart />
                <h1 className="hidden md:block">Like</h1>
              </div>
            </button>
            <button className="bg-slate-700 px-4 py-2 rounded-xl">
              <div className="flex gap-2 items-center justify-center text-mYellow">
                <FaCommentDots />
                <h1 className="hidden md:block">Comment</h1>
              </div>
            </button>
            <button className="bg-slate-700 px-4 py-2 rounded-xl">
              <div className="flex gap-2 items-center justify-center text-mGreen">
                <FaShareAlt />
                <h1 className="hidden md:block">Share</h1>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
