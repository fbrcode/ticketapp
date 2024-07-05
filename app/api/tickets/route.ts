import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "@/validationSchemas/tickets";
import prisma from "@/prisma/db";

// endpoint for when we create a ticket
export async function POST(request: NextRequest) {
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
