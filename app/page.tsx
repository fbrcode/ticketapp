import DashChart from "@/components/DashChart";
import DashRecentTickets from "@/components/DashRecentTickets";
import prisma from "@/prisma/db";

async function Dashboard() {
  const tickets = await prisma.ticket.findMany({
    where: { NOT: [{ status: "DONE" }] },
    orderBy: { updated_at: "desc" },
    skip: 0,
    take: 5,
    include: { user: true },
  });

  const groupTickets = await prisma.ticket.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  const data = groupTickets.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  // console.log(groupTickets);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
