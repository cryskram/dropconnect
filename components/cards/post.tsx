"use client";

// import { useState, useEffect } from "react";
import { Comment, Post } from "@prisma/client";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { FaCommentDots, FaEdit, FaHeart, FaShareAlt } from "react-icons/fa";

interface PostCardProp {
  post: Post;
  image?: string;
  author?: string;
  mUserId?: string;
  comments?: Comment[];
}

const PostCard = ({ post, image, author, mUserId, comments }: PostCardProp) => {
  const liked = () => {
    // await prisma.post.update({
    //   where: { id: post.id },
    //   data: {
    //     likes: {
    //       increment: 1,
    //     },
    //   },
    // });
    console.log("clicked");
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
          <h1 className="text-slate-300/80">{author}</h1>
          <div className="my-2">
            <h1 className="text-xl text-justify max-w-full">{post.content}</h1>
          </div>

          <div className="flex justify-between text-slate-400 my-4 text-sm">
            <h1>{post.likes} Likes</h1>
            <h1>{comments?.length ?? 0} Comments</h1>
          </div>

          <div
            className={`grid gap-3 w-3/4 mx-auto mt-8 ${
              post.authorId !== mUserId ? "grid-cols-3" : "grid-cols-4"
            }`}
          >
            <button
              className="bg-slate-700 px-4 py-2 rounded-xl"
              onClick={() => liked()}
            >
              <div className="flex gap-2 items-center justify-center text-mRed">
                <FaHeart />
                <h1 className="hidden md:block">Like</h1>
              </div>
            </button>
            <button
              className="bg-slate-700 px-4 py-2 rounded-xl"
              onClick={() => liked()}
            >
              <div className="flex gap-2 items-center justify-center text-mYellow">
                <FaCommentDots />
                <h1 className="hidden md:block">Comment</h1>
              </div>
            </button>
            <button
              className="bg-slate-700 px-4 py-2 rounded-xl"
              onClick={() => liked()}
            >
              <div className="flex gap-2 items-center justify-center text-mGreen">
                <FaShareAlt />
                <h1 className="hidden md:block">Share</h1>
              </div>
            </button>
            <button
              className={`bg-slate-700 px-4 py-2 rounded-xl ${
                post.authorId !== mUserId ? "hidden" : ""
              }`}
              onClick={() => liked()}
            >
              <div className="flex gap-2 items-center justify-center text-mWhite">
                <FaEdit />
                <h1 className="hidden md:block">Edit</h1>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className="bg-slate-800 p-4 mb-3 rounded-2xl">
    //   <div className="flex gap-2 items-start">
    //     <Image
    //       className="border-2 border-slate-200 rounded-full"
    //       src={image as string}
    //       width={42}
    //       height={42}
    //       alt="author pfp"
    //     />
    //     <div className="w-full">
    //       <h1 className="text-slate-300/80">{author}</h1>
    //       <div className="my-2">
    //         <h1 className="text-xl text-justify max-w-full">{post.content}</h1>
    //       </div>

    //       <div className="flex justify-between text-slate-400 my-4 text-sm">
    //         <h1>{post.likes} Likes</h1>
    //         <h1>{post.comments.length ?? 0} Comments</h1>
    //       </div>

    //       <div className="grid grid-cols-3 gap-3 w-3/4 mx-auto">
    //         <button
    //           className="bg-slate-700 px-4 py-2 rounded-xl"
    //           onClick={() => liked()}
    //         >
    //           <div className="flex gap-2 items-center justify-center text-mRed">
    //             <FaHeart />
    //             <h1>Like</h1>
    //           </div>
    //         </button>
    //         <button
    //           className="bg-slate-700 px-4 py-2 rounded-xl"
    //           onClick={() => liked()}
    //         >
    //           <div className="flex gap-2 items-center justify-center text-mYellow">
    //             <FaCommentDots />
    //             <h1>Comment</h1>
    //           </div>
    //         </button>
    //         <button
    //           className="bg-slate-700 px-4 py-2 rounded-xl"
    //           onClick={() => liked()}
    //         >
    //           <div className="flex gap-2 items-center justify-center text-mGreen w-full">
    //             <FaShareAlt />
    //             <h1>Share</h1>
    //           </div>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PostCard;
