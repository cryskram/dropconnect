import PostCard from "@/components/cards/post";
import prisma from "@/lib/prisma";

const getTaggedPosts = (tag: string) => {
  const posts = prisma.post.findMany({
    where: {
      tags: { has: tag },
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

  return (
    <div className="w-full md:w-3/4 mx-auto">
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
  );
};

export default TagPage;
