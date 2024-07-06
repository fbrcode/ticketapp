import prisma from "@/prisma/db";
import TicketDetail from "./TicketDetail";
interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(params.id) },
  });

  const users = await prisma.app_user.findMany();

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return <TicketDetail ticket={ticket} users={users} />;
};

export default ViewTicket;
