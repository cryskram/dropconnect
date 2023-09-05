import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

const getPosts = () => {
  const posts = prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <div>
      {!posts.length ? (
        <h1>No posts currently</h1>
      ) : (
        <div>
          {posts.map((post: Post) => (
            <div key={post.id}>
              <h1>{post.content}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
