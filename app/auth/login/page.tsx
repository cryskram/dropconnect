"use client";

import Image from "next/image";
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
    // <div>
    //   <div className="flex items-center justify-center">
    //     <div>
    //       <Image
    //         className="w-1/2 bg-mWhite p-4 rounded-tl-2xl rounded-br-2xl"
    //         src="/login.svg"
    //         width={200}
    //         height={200}
    //         alt="login image"
    //       />
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <h1>Google</h1>
    //       <h1>Twitter</h1>
    //       <h1>Github</h1>
    //     </div>
    //   </div>
    // </div>
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
        {/* <div>
                < />
                <h1>Sign in with Google</h1>
            </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
