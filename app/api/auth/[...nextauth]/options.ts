import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
          access_type: "offline",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development" ? true : false,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub;
        const additionalData = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            profile: true,
            posts: true,
            comments: true,
          },
        });

        session.profile = additionalData?.profile || null;
        session.posts = additionalData?.posts || null;
        session.comments = additionalData?.comments || null;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
