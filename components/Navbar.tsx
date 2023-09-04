import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-8 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" width={75} height={128} alt="logo" />
          <div className="-ml-1">
            <h1 className="text-xl">DropConnect</h1>
            <p className="text-slate-400 text-md -mt-1">Stay in Touch</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            className="bg-primary border-2 border-primary hover:bg-transparent transition-all duration-200 font-semibold p-2 rounded-2xl text-lg"
            href="/auth/signin"
          >
            Sign In
          </Link>
          <Link
            className="border-2 border-mGreen font-semibold p-2 rounded-2xl text-lg"
            href="/auth/register"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
