// "use client";

import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
// import { useState } from "react";

const Navbar = async () => {
  // const [navbar, setNavbar] = useState(false);
  const session = await getServerSession();
  return (
    <div className="px-6 py-1 m-2 bg-slate-800 rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" width={75} height={128} alt="logo" />
          <div className="-ml-1">
            <h1 className="text-xl">DropConnect</h1>
            <p className="text-slate-400 text-md -mt-1">Stay in Touch</p>
          </div>
        </div>
        {session ? (
          <Link
            href="/auth/profile"
            className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-full"
          >
            {/* <Link
              className="bg-mRed hover:bg-transparent transition-all duration-200 font-semibold p-2 rounded-2xl"
              href="/auth/logout"
            >
              Logout
            </Link> */}
            <Image
              className="rounded-full border-2 border-slate-300"
              src={session.user?.image as string}
              width={32}
              height={32}
              alt="pfp"
            />
            <h1 className="font-semibold">{session.user?.name}</h1>
          </Link>
        ) : (
          <div className="flex gap-3 items-center">
            <Link
              className="bg-primary border-2 border-primary hover:bg-transparent transition-all duration-200 font-semibold p-2 rounded-2xl"
              href="/auth/login"
            >
              Sign In
            </Link>
            <Link
              className="border-2 border-mGreen font-semibold p-2 rounded-2xl"
              href="/auth/register"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>

    // <div>
    //   <nav className="w-full">
    //     <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
    //       <div>
    //         <div className="flex items-center justify-between py-3 md:py-5 md:block">
    //           <Link href="#" className="flex items-center">
    //             <Image src="/logo.png" width={64} height={64} alt="logo" />
    //             <div className="flex flex-col">
    //               <h1 className="text-2xl">DropConnect</h1>
    //               <p className="text-md text-slate-400">Stay in Touch</p>
    //             </div>
    //           </Link>
    //           <div className="md:hidden">
    //             <button
    //               className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
    //               onClick={() => setNavbar(!navbar)}
    //             >
    //               {navbar ? (
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="w-6 h-6 text-white"
    //                   viewBox="0 0 20 20"
    //                   fill="currentColor"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //               ) : (
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="w-6 h-6 text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                   strokeWidth={2}
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M4 6h16M4 12h16M4 18h16"
    //                   />
    //                 </svg>
    //               )}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <div
    //           className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
    //             navbar ? "block" : "hidden"
    //           }`}
    //         >
    //           <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
    //             <li className="text-white">
    //               <Link href="/">Home</Link>
    //             </li>
    //             <li className="text-white">
    //               <Link href="/blogs">Blogs</Link>
    //             </li>
    //             <li className="text-white">
    //               <Link href="/about">About</Link>
    //             </li>
    //             <li className="text-white">
    //               <Link href="/contact">Contact</Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Navbar;
