import PostCard from "@/components/cards/post";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

const getPosts = () => {
  const posts = prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        select: {
          profile: {
            select: {
              username: true,
            },
          },
          image: true,
        },
      },
    },
  });
  return posts;
};

export default async function Home() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full md:w-3/4 mx-auto">
      {!posts.length ? (
        <h1>No posts currently</h1>
      ) : (
        <div>
          {session ? (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <PostCard
                    post={post}
                    image={post.author.image as string}
                    author={post.author.profile?.username}
                    mUserId={session.user.id}
                    comments={post.comments}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <PostCard
                    post={post}
                    image={post.author.image as string}
                    author={post.author.profile?.username}
                    comments={post.comments}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
