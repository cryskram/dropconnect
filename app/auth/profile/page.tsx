"use client";

import { signOut, useSession } from "next-auth/react";

const ProfilePage = () => {
  const handleSignOut = async () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  const { data: session } = useSession();
  // console.log(session?.profile);
  return (
    <div>
      <button className="px-2 py-1 bg-mRed rounded-xl" onClick={handleSignOut}>
        signOut
      </button>
      {/* <h1>{JSON.stringify(session, null, 4) ?? "not working"}</h1> */}
      {!session?.profile ? (
        <div>
          <h1 className="bg-mGreen">You havent set the profile yet</h1>
        </div>
      ) : (
        <div>
          <h1>{JSON.stringify(session.profile, null, 4)}</h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
