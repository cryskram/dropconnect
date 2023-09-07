import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { content, tags }: { content: string; tags: string } =
    await request.json();
  const session = await getServerSession(authOptions);
  const tagList = tags
    .trim()
    .split(",")
    .map((tag) => tag.trim());

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  await prisma.post.update({
    where: { id: params.id },
    data: {
      content,
      tags: tagList,
    },
  });

  return NextResponse.json(
    { message: "created post successfully" },
    { status: 200 }
  );
}
