import { Profile, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface UserCardProp {
  profile: Profile | null;
  name: string;
  image: string;
  createdAt: Date;
  noPosts: number;
}

const UserCard = ({
  profile,
  name,
  image,
  createdAt,
  noPosts,
}: UserCardProp) => {
  return (
    <div className="w-full">
      <div className="bg-slate-800 p-4 rounded-2xl flex flex-col items-center text-center">
        <div className="">
          <Image
            className="rounded-full border-2 border-slate-200"
            src={image}
            alt="pfp"
            width={64}
            height={64}
          />
        </div>
        <div className="mt-4">
          <h1 className="text-2xl">{name}</h1>
          <p className="mx-auto w-3/4 text-slate-400">{profile?.bio}</p>
        </div>
        <div className="flex gap-4 mt-8 text-justify w-full justify-around">
          <div>
            <h1 className="text-xl">Joined</h1>
            <p className="text-sm text-slate-400">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h1 className="text-xl">Posts</h1>
            <p className="text-sm text-slate-400">{noPosts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
