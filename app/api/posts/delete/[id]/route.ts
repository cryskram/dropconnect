import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 400 });
  }

  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "removed post" });
  } catch (err) {
    return NextResponse.json({ message: "failed to remove" });
  }
}
