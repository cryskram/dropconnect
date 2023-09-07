import PostCard from "@/components/cards/post";
import prisma from "@/lib/prisma";
import React from "react";

const getParamPost = (id: string) => {
  const post = prisma.post.findMany({
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

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <PostCard
        post={post[0]}
        image={post[0].author.image as string}
        author={post[0].author.profile?.username}
      />
      <div>
        {post[0].comments.map((comment) => (
          <div key={comment.id}>
            <h1>{comment.data}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
