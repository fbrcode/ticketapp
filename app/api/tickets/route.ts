import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "@/validationSchemas/tickets";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

// endpoint for when we create a ticket
export async function POST(request: NextRequest) {
  // check if the user is authenticated to create a ticket
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ticket = await prisma.ticket.create({ data: { ...body } });

  return NextResponse.json(ticket, {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
