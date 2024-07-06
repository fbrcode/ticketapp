import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/validationSchemas/users";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.app_user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // if we are trying to change the password, we need to hash it
  if (body?.password && body.password != "") {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
  } else {
    delete body.password;
  }

  // ensure that the username is unique
  if (user.username !== body.username) {
    const duplicate = await prisma.app_user.findUnique({
      where: { username: body.username },
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "Duplicate username" },
        { status: 409 }
      );
    }
  }

  const updatedUser = await prisma.app_user.update({
    where: { id: Number(params.id) },
    data: { ...body },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}
