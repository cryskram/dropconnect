import PostCard from "@/components/cards/post";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import CreateNew from "@/components/cards/createNew";

const getPosts = () => {
  const posts = prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      like: true,
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
            <div className="flex flex-col gap-2">
              <div>
                <CreateNew />
              </div>
              <div>
                {posts.map((post) => (
                  <div key={post.id}>
                    <PostCard
                      post={post}
                      image={post.author.image as string}
                      author={post.author.profile?.username}
                      mUserId={session.user.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <PostCard
                    post={post}
                    image={post.author.image as string}
                    author={post.author.profile?.username}
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
