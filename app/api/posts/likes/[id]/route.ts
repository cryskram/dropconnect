import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function toggleLike(
  request: Request,
  params: { id: string },
  isLike: boolean
) {
  const session = await getServerSession(authOptions);
  const postId = params.id;

  if (!session) {
    return NextResponse.json(
      { message: "unauthorized access" },
      { status: 401 }
    );
  }

  try {
    if (isLike) {
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
          userId: session.user.id as string,
        },
      });
    } else {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
      });
    }

    const message = isLike ? "Liked the post" : "Unliked the post";

    return NextResponse.json({ message }, { status: 200 });
  } catch (err) {
    console.log(`Error ${isLike ? "liking" : "unliking"} the post`, err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return toggleLike(request, params, true);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return toggleLike(request, params, false);
}
