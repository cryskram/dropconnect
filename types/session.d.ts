import { Session } from "next-auth";
import { Account, Comment, Post, Profile } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    profile: Profile | null;
    comments: Comment[] | null;
    posts: Post[] | null;
    user: any;
  }
}
