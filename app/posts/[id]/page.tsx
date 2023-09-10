import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostCard from "@/components/cards/post";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";

const getParamPost = (id: string) => {
  const post = prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
      like: true,
      author: {
        select: {
          image: true,
          profile: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  return post;
};

const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getParamPost(params.id);
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full md:w-3/4 mx-auto">
      {session ? (
        <div>
          <PostCard
            post={post!}
            image={post?.author.image as string}
            author={post?.author.profile?.username}
            mUserId={session?.user.id}
          />
        </div>
      ) : (
        <div>
          <PostCard
            post={post!}
            image={post?.author.image as string}
            author={post?.author.profile?.username}
          />
        </div>
      )}
      {/* <div>
        {post?.comments.map((comment) => (
          <div key={comment.id}>
            <h1>{comment.data}</h1>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default PostPage;
