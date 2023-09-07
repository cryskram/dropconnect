import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const postId = params.id;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId as string },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // check if user has already liked :(
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "Post already liked" },
        { status: 400 }
      );
    }

    // else create the like
    await prisma.like.create({
      data: {
        userId: session.user.id as string,
        postId,
      },
    });

    return NextResponse.json(
      { message: "Post liked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
