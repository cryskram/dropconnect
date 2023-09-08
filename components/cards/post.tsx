// "use client";

// import { Comment, Like, User } from "@prisma/client";
// import Image from "next/image";
// import { MdEdit, MdOutlineDelete, MdThumbUp } from "react-icons/md";
// import { FaCommentDots, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
// import axios from "axios";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { BsHeartFill } from "react-icons/bs";

// interface PostProp {
//   id: string;
//   content: string;
//   tags?: string[];
//   like?: Like[];
//   author?: Partial<User> | null;
//   authorId?: string;
//   comments: Comment[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface PostCardProp {
//   post: PostProp;
//   image?: string;
//   author?: string;
//   mUserId?: string;
// }

// const PostCard = ({ post, image, author, mUserId }: PostCardProp) => {
//   const [copied, setCopied] = useState(false);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     if (mUserId && post.like?.some((like) => like.userId === mUserId)) {
//       setLiked(true);
//     } else {
//       setLiked(false);
//     }
//   }, [mUserId, post.like]);

//   const handleShare = () => {
//     const text =
//       process.env.NODE_ENV === "development"
//         ? `http://localhost:3000/posts/${post.id}`
//         : `https://dropconnect.vercel.app/posts/${post.id}`;
//     navigator.clipboard.writeText(text);
//     setCopied(true);

//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   const handlePostDelete = async () => {
//     try {
//       const res = await axios.delete(`/api/posts/delete/${post.id}`);

//       if (!res) {
//         throw new Error("error deleting the post");
//       }

//       window.location.reload();
//     } catch (error) {
//       console.error("Error deleting the post", error);
//     }
//   };
//   const handleLikeClick = async () => {
//     try {
//       if (liked) {
//         const res = await axios.delete(`/api/posts/likes/${post.id}`);

//         if (res) {
//           setLiked(false);
//         }
//       } else {
//         const res = await axios.put(`/api/posts/likes/${post.id}`, {
//           postId: post.createdAt,
//         });

//         if (res) {
//           setLiked(true);
//         }
//       }
//     } catch (err) {
//       console.error("error liking/unliking: ", err);
//     }
//   };

//   return (
//     <div className="bg-slate-800 p-4 mb-3 rounded-2xl">
//       <div className="flex gap-2 items-center justify-between">
//         <div className="flex gap-2 items-center">
//           <Image
//             className="border-2 border-slate-200 rounded-full"
//             src={image as string}
//             width={32}
//             height={32}
//             alt="author pfp"
//           />
//           <Link href={`/user/${post.authorId}`} className="text-slate-300/80">
//             {author}
//           </Link>
//         </div>
//         <div
//           className={`flex gap-3 text-xl ${
//             post.authorId !== mUserId ? "hidden" : ""
//           }`}
//         >
//           <button className="bg-slate-700 text-primary px-2 py-1 rounded-xl">
//             <MdEdit />
//           </button>
//           <button
//             onClick={handlePostDelete}
//             className="bg-slate-700 text-mRed px-2 py-1 rounded-xl"
//           >
//             <MdOutlineDelete />
//           </button>
//         </div>
//       </div>
//       <div className="my-2">
//         <Link
//           href={`/posts/${post.id}`}
//           className="text-xl text-justify max-w-full"
//         >
//           {post.content}
//         </Link>
//       </div>

//       <div className="flex justify-between text-slate-400 my-4 text-sm">
//         <h1>
//           {liked && post.like && post.like?.length > 1
//             ? `You and ${post.like?.length - 1} others liked this post`
//             : liked && post.like?.length === 1
//             ? "You liked this post"
//             : `${post.like?.length} likes`}
//         </h1>
//         <h1>{post.comments.length ?? 0} Comments</h1>
//       </div>

//       <div className="flex gap-2">
//         {post.tags?.map((tag, idx) => (
//           <Link
//             href={`/posts/tags/${tag}`}
//             key={idx}
//             className="bg-mViolet/80 px-1.5 py-1 text-sm rounded-xl"
//           >
//             <h1>#{tag}</h1>
//           </Link>
//         ))}
//       </div>

//       <div className="grid gap-3 w-3/4 mx-auto mt-8 grid-cols-3">
//         <button
//           onClick={handleLikeClick}
//           className="bg-slate-700 px-4 py-2 rounded-xl"
//         >
//           <div className="flex gap-2 items-center justify-center text-mRed">
//             {liked ? <FaHeart /> : <FaRegHeart />}
//             <h1 className="hidden font-bold sm:block">Like</h1>
//           </div>
//         </button>
//         <button className="bg-slate-700 px-4 py-2 rounded-xl">
//           <div className="flex gap-2 items-center justify-center text-mYellow">
//             <FaCommentDots />
//             <h1 className="hidden font-bold sm:block">Comment</h1>
//           </div>
//         </button>
//         <button
//           onClick={handleShare}
//           className="bg-slate-700 px-4 py-2 rounded-xl"
//         >
//           <div className="flex gap-2 transition-all duration-300 items-center justify-center text-mGreen">
//             {copied ? <MdThumbUp /> : <FaShareAlt />}
//             <h1 className="hidden font-bold sm:block">
//               {copied ? "Copied!" : "Share"}
//             </h1>
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

"use client";

import { Comment, Like, User } from "@prisma/client";
import Image from "next/image";
import { MdEdit, MdOutlineDelete, MdThumbUp } from "react-icons/md";
import { FaCommentDots, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";

interface PostProp {
  id: string;
  content: string;
  tags?: string[];
  like?: Like[];
  author?: Partial<User> | null;
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
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(
    post.like?.some((like) => like.userId === mUserId)
  );
  const [likesCount, setLikesCount] = useState(post.like?.length ?? 0);

  const handleShare = () => {
    const text =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/posts/${post.id}`
        : `https://dropconnect.vercel.app/posts/${post.id}`;
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handlePostDelete = async () => {
    try {
      const res = await axios.delete(`/api/posts/delete/${post.id}`);

      if (!res) {
        throw new Error("error deleting the post");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting the post", error);
    }
  };
  const handleLikeClick = async () => {
    try {
      if (liked) {
        const res = await axios.delete(`/api/posts/likes/${post.id}`);

        if (!res) {
          throw new Error("Error unliking the post");
        }
        setLikesCount(likesCount - 1);
      } else {
        const res = axios.put(`/api/posts/likes/${post.id}`, {
          postId: post.id,
        });

        if (!res) {
          throw new Error("Error liking the post");
        }

        setLikesCount(likesCount + 1);
      }

      setLiked(!liked);
    } catch (err) {
      console.error("Error liking/unliking post: ", err);
    }
  };

  return (
    <div className="bg-slate-800 p-4 mb-3 rounded-2xl">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            className="border-2 border-slate-200 rounded-full"
            src={image as string}
            width={32}
            height={32}
            alt="author pfp"
          />
          <Link href={`/user/${post.authorId}`} className="text-slate-300/80">
            {author}
          </Link>
        </div>
        <div
          className={`flex gap-3 text-xl ${
            post.authorId !== mUserId ? "hidden" : ""
          }`}
        >
          <button className="bg-slate-700 text-primary px-2 py-1 rounded-xl">
            <MdEdit />
          </button>
          <button
            onClick={handlePostDelete}
            className="bg-slate-700 text-mRed px-2 py-1 rounded-xl"
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
      <div className="my-2">
        <Link
          href={`/posts/${post.id}`}
          className="text-xl text-justify max-w-full"
        >
          {post.content}
        </Link>
      </div>

      <div className="flex justify-between text-slate-400 my-4 text-sm">
        {/* <h1>
          {liked && post.like && post.like?.length > 1
            ? `You and ${post.like?.length - 1} others liked this post`
            : liked && post.like?.length === 1
            ? "You liked this post"
            : `${post.like?.length} likes`}
        </h1> */}
        <h1>{likesCount} likes</h1>
        <h1>{post.comments.length ?? 0} Comments</h1>
      </div>

      <div className="flex gap-2">
        {post.tags?.map((tag, idx) => (
          <Link
            href={`/posts/tags/${tag}`}
            key={idx}
            className="bg-mViolet/80 px-1.5 py-1 text-sm rounded-xl"
          >
            <h1>#{tag}</h1>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 w-3/4 mx-auto mt-8 grid-cols-3">
        <button
          onClick={handleLikeClick}
          className="bg-slate-700 px-4 py-2 rounded-xl"
        >
          <div className="flex gap-2 items-center justify-center text-mRed">
            {liked ? <FaHeart /> : <FaRegHeart />}
            <h1 className="hidden font-bold sm:block">Like</h1>
          </div>
        </button>
        <button className="bg-slate-700 px-4 py-2 rounded-xl">
          <div className="flex gap-2 items-center justify-center text-mYellow">
            <FaCommentDots />
            <h1 className="hidden font-bold sm:block">Comment</h1>
          </div>
        </button>
        <button
          onClick={handleShare}
          className="bg-slate-700 px-4 py-2 rounded-xl"
        >
          <div className="flex gap-2 transition-all duration-300 items-center justify-center text-mGreen">
            {copied ? <MdThumbUp className="animate-bounce" /> : <FaShareAlt />}
            <h1 className="hidden font-bold sm:block">
              {copied ? "Copied!" : "Share"}
            </h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
