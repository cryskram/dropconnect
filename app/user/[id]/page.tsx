import PostCard from "@/components/cards/post";
import UserCard from "@/components/cards/user";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import React from "react";

const getUser = (id: string) => {
  const userProfile = prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      profile: true,
      image: true,
      name: true,
      createdAt: true,
      posts: {
        include: {
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return userProfile;
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const userData = await getUser(params.id);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-3 md:col-span-1">
        <UserCard
          profile={userData?.profile || null}
          image={userData?.image as string}
          name={userData?.name as string}
          createdAt={userData?.createdAt as Date}
          noPosts={userData?.posts.length as number}
          id={params.id}
        />
      </div>
      <div className="flex flex-col col-span-3">
        {userData?.posts.map((post) => (
          <div key={post.id}>
            <PostCard
              image={userData.image as string}
              post={post}
              author={userData.profile?.username as string}
              mUserId={params.id}
              comments={post.comments}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
