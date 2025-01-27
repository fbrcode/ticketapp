import { NextRequest, NextResponse } from "next/server";
import { ticketPatchSchema } from "@/validationSchemas/tickets";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // update ticket user id if provided
  if (body?.user_id) {
    body.user_id = Number(body.user_id);
  }

  const ticket = await prisma.ticket.update({
    where: { id: Number(params.id) },
    data: { ...body },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(ticket, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const ticket = await prisma.ticket.delete({
    where: { id: Number(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Ticket deleted successfully",
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
