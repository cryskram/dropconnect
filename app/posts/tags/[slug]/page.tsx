import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostCard from "@/components/cards/post";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getTaggedPosts = (tag: string) => {
  const posts = prisma.post.findMany({
    where: {
      tags: { has: tag.replaceAll("%20", " ") },
    },
    orderBy: {
      createdAt: "desc",
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

  return posts;
};

const TagPage = async ({ params }: { params: { slug: string } }) => {
  const posts = await getTaggedPosts(params.slug);
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full md:w-3/4 mx-auto">
      {session ? (
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
  );
};

export default TagPage;
