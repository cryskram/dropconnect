"use client";

import Spinner from "@/components/Spinner";
import { signOut, useSession } from "next-auth/react";

const ProfilePage = () => {
  const handleSignOut = async () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div>
          <h1>{JSON.stringify(session?.profile, null, 4)}</h1>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
