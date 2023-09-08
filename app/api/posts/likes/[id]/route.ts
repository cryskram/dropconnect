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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId as string },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.like.upsert({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
      update: {},
      create: {
        postId,
        userId: session.user.id,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const findPost = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!findPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.id,
        },
      },
    });

    return NextResponse.json(
      { message: "Post unliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unliking", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
