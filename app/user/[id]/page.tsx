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
      posts: true,
    },
  });

  return userProfile;
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const userData = await getUser(params.id);
  return (
    <div className="w-full">
      {/* <h1>{JSON.stringify(userData)}</h1> */}
      <div className="flex justify-center">
        <div>
          <UserCard
            profile={userData?.profile || null}
            image={userData?.image as string}
            name={userData?.name as string}
            createdAt={userData?.createdAt as Date}
            noPosts={userData?.posts.length as number}
          />
        </div>
        <div className="flex flex-col flex-auto ml-10 p-4 w-full">
          {userData?.posts.map((post: Post) => (
            <div key={post.id}>
              <h1>{post.content}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
