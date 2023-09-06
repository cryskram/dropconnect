"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Profile, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import Spinner from "../Spinner";

interface UserCardProp {
  profile: Profile | null;
  name: string;
  image: string;
  createdAt: Date;
  noPosts: number;
  id: string;
}

const UserCard = ({
  profile,
  name,
  image,
  createdAt,
  noPosts,
  id,
}: UserCardProp) => {
  const { data: session, status } = useSession();
  return (
    <div className="">
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
          <p>{profile?.username}</p>
          <p className="mx-auto w-3/4 text-slate-400">{profile?.bio}</p>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {profile?.twitter ? (
            <div className="flex items-center gap-2">
              <FaTwitter className="text-blue-400 text-xl" />
              <Link
                className="text-slate-300 underline underline-offset-4"
                href={`https://twitter.com/${profile.twitter}`}
              >
                {profile?.twitter}
              </Link>
            </div>
          ) : (
            <div></div>
          )}
          {profile?.instagram ? (
            <div className="flex items-center gap-2">
              <FaInstagram className="text-purple-400 text-xl" />
              <Link
                className="text-slate-300 underline underline-offset-4"
                href={`https://instagram.com/${profile.instagram}`}
              >
                {profile?.instagram}
              </Link>
            </div>
          ) : (
            <h1></h1>
          )}
        </div>
        <div className="flex gap-4 mt-4 text-justify w-full justify-around">
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
        {status === "loading" ? (
          <div></div>
        ) : (
          <div className="mt-4">
            {id == session?.user.id ? (
              <div className="flex">
                <Link
                  className="p-2 rounded-l-2xl text-slate-900 font-semibold bg-mYellow"
                  href="/"
                >
                  Edit Profile
                </Link>
                <button
                  className="p-2 bg-mRed rounded-r-2xl font-semibold"
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <h1>Follow</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
