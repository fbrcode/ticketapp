import DashChart from "@/components/DashChart";
import DashRecentTickets from "@/components/DashRecentTickets";
import TicketPieChart from "@/components/TicketPieChart";
import prisma from "@/prisma/db";

const STATUS_COLORS = {
  OPEN: "#ef4444",
  IN_PROGRESS: "#f59e0b",
  DONE: "#22c55e",
};

const PRIORITY_COLORS = {
  LOW: "#22c55e",
  MEDIUM: "#f59e0b",
  HIGH: "#dc2626",
};

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

  const statusDistribution = await prisma.ticket.groupBy({
    by: ["status"],
    _count: true,
  });

  const priorityDistribution = await prisma.ticket.groupBy({
    by: ["priority"],
    _count: true,
  });

  const statusData = statusDistribution.map((item) => ({
    name: item.status,
    value: item._count,
    color: STATUS_COLORS[item.status],
  }));

  const priorityData = priorityDistribution.map((item) => ({
    name: item.priority,
    value: item._count,
    color: PRIORITY_COLORS[item.priority],
  }));

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
        <div>
          <TicketPieChart
            data={statusData}
            title="Tickets Status Distribution"
          />
        </div>
        <div>
          <TicketPieChart
            data={priorityData}
            title="Tickets Priority Distribution"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
