import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  // check if the user is authenticated to create a ticket
  // const session = await getServerSession(options);

  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Not authenticated" },
  //     { status: 401, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  // if (session.user.role !== "ADMIN") {
  //   return NextResponse.json(
  //     { error: "Not administrator" },
  //     { status: 403, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.app_user.findUnique({
    where: { username: body.username },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "Duplicate username" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;

  const newUser = await prisma.app_user.create({ data: body });

  return NextResponse.json(newUser, { status: 201 });
}
