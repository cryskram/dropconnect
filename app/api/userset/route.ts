import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const { username, age, bio, userId, twitter, instagram } =
    await request.json();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const existingProfileUser = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!existingProfileUser) {
    return NextResponse.json(
      { message: "User profile not found" },
      { status: 404 }
    );
  }

  await prisma.profile.update({
    where: { id: existingProfileUser.id },
    data: {
      username,
      age,
      bio,
      twitter,
      instagram,
    },
  });

  return NextResponse.json({ message: "Update successfully" }, { status: 200 });
}
