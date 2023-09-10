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
        <div className="w-full mt-2 md:w-3/4 mx-auto mb-4">
          <h1 className="text-3xl font-light">
            Settings for <span className="font-bold">{session?.user.name}</span>
          </h1>
          <div className=" p-3 bg-slate-800 my-4 rounded-xl">
            <div className="flex flex-col divide-y-2 divide-slate-400 divide-opacity-40">
              <div>
                <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
                <div className="flex flex-col gap-3">
                  <div>
                    <h1>Username: </h1>
                    <input
                      className="w-full p-2 bg-slate-700 rounded-xl outline-none"
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <h1>Age: </h1>
                    <input
                      className="w-full p-2 bg-slate-700 rounded-xl outline-none"
                      type="number"
                      name="age"
                      id="age"
                      value={age as number}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <h1>Twitter handle: </h1>
                    <input
                      className="w-full p-2 bg-slate-700 rounded-xl outline-none"
                      type="text"
                      name="twitter"
                      id="twitter"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  <div>
                    <h1>Instagram handle: </h1>
                    <input
                      className="w-full p-2 bg-slate-700 rounded-xl outline-none"
                      type="text"
                      name="instgram"
                      id="instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </div>
                  <div>
                    <h1>Bio: </h1>
                    <textarea
                      name="bio"
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-2 bg-slate-700 rounded-xl outline-none"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="bg-mYellow p-2 rounded-xl text-black font-semibold"
                      onClick={handleProfileUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl mt-3 font-bold mb-2">Danger Zone</h1>
                <div>
                  <button className="px-4 py-2 rounded-xl bg-mRed">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
