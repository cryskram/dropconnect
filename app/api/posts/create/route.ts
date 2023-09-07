import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content, tags }: { content: string; tags: string } =
    await request.json();
  const session = await getServerSession(authOptions);
  const tagList =
    tags
      .trim()
      .split(",")
      .map((tag) => tag.trim()) ?? [];

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      posts: {
        create: {
          content,
          tags: tagList,
        },
      },
    },
  });

  return NextResponse.json(
    { message: "created post successfully" },
    { status: 200 }
  );
}
