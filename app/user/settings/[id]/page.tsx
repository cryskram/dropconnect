"use client";

import Spinner from "@/components/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsPage = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState(session?.profile?.username);
  const [age, setAge] = useState(session?.profile?.age);
  const [twitter, setTwitter] = useState(session?.profile?.twitter ?? "");
  const [instagram, setInstagram] = useState(session?.profile?.instagram ?? "");
  const [bio, setBio] = useState(session?.profile?.bio ?? "");
  const router = useRouter();

  useEffect(() => {
    setUsername(session?.profile?.username);
    setAge(session?.profile?.age);
    setTwitter(session?.profile?.twitter ?? "");
    setInstagram(session?.profile?.instagram ?? "");
    setBio(session?.profile?.bio ?? "");
  }, [session]);

  const userId = session?.user.id;

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(`/api/userset`, {
        username,
        age,
        twitter,
        instagram,
        bio,
        userId,
      });

      if (!res) {
        throw new Error("Error updating your profile");
      }
    } catch (err) {
      console.error("Error occured: ", err);
    }
    router.push(`/user/${userId}`);
  };

  return (
    <div>
      {status === "loading" ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="">
          <div>
            <h1 className="text-3xl font-light">
              Settings for{" "}
              <span className="font-bold">{session?.user.name}</span>
            </h1>
          </div>
          <div className="my-4 text-center flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <h1>Username: </h1>
              <input
                className="bg-slate-700 w-1/2 p-2 rounded-xl"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <h1>Age: </h1>
              <input
                className="bg-slate-700 w-1/2 p-2 rounded-xl"
                type="number"
                name="age"
                id="age"
                value={age as number}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
            </div>
            <div className="flex gap-2 items-center">
              <h1>Twitter: </h1>
              <input
                className="bg-slate-700 w-1/2 p-2 rounded-xl"
                type="text"
                name="twitter"
                id="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <h1>Instagram: </h1>
              <input
                className="bg-slate-700 w-1/2 p-2 rounded-xl"
                type="text"
                name="instagram"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <h1>Bio: </h1>
              <textarea
                className="bg-slate-700 w-1/2 p-2 rounded-xl"
                name="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            className="bg-mYellow p-2 rounded-xl text-black font-semibold"
            onClick={handleProfileUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
