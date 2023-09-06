"use client";

import { signIn } from "next-auth/react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const LoginPage = () => {
  const handleAuth = async (provider: string) => {
    signIn(provider, {
      callbackUrl: "/",
      redirect: true,
    });
  };
  return (
    <div>
      <div className="w-max flex flex-col gap-4 mx-auto">
        <button
          onClick={() => handleAuth("google")}
          className="flex items-center gap-2 p-2 rounded-xl bg-primary"
        >
          <BsGoogle className="text-xl" />
          <h1>Sign in with Google</h1>
        </button>
        <button
          onClick={() => handleAuth("github")}
          className="flex items-center gap-2 p-2 rounded-xl bg-slate-800"
        >
          <BsGithub className="text-xl" />
          <h1>Sign in with Github</h1>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
