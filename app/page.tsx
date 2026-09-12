import DashChart from "@/components/DashChart";
import DashRecentTickets from "@/components/DashRecentTickets";
import TicketPieChart from "@/components/TicketPieChart";
import prisma, { safeDbOperation } from "@/prisma/db";

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
  // Safely fetch tickets with fallback
  const ticketsResult = await safeDbOperation(
    () =>
      prisma.ticket.findMany({
        where: { NOT: [{ status: "DONE" }] },
        orderBy: { updated_at: "desc" },
        skip: 0,
        take: 5,
        include: { user: true },
      }),
    []
  );

  // Safely fetch group tickets for chart data
  const groupTicketsResult = await safeDbOperation(
    () =>
      prisma.ticket.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    []
  );

  // Safely fetch status distribution
  const statusResult = await safeDbOperation(
    () =>
      prisma.ticket.groupBy({
        by: ["status"],
        _count: true,
      }),
    []
  );

  // Safely fetch priority distribution
  const priorityResult = await safeDbOperation(
    () =>
      prisma.ticket.groupBy({
        by: ["priority"],
        _count: true,
      }),
    []
  );

  // Check if any database operation failed
  const dbError =
    ticketsResult.error ||
    groupTicketsResult.error ||
    statusResult.error ||
    priorityResult.error;

  if (dbError) {
    if (typeof window === "undefined") {
      // Log detailed error server-side
      // eslint-disable-next-line no-console
      console.error("Database error:", dbError);
    }
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">
              Database Not Available
            </h3>
            <p className="text-yellow-700 mb-4">
              Sorry, something went wrong connecting to the database.
            </p>
            <div className="text-left bg-yellow-100 rounded p-3 text-sm text-yellow-800">
              <p className="font-medium mb-1">To fix this:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Set the{" "}
                  <code className="bg-yellow-200 px-1 rounded">
                    DATABASE_URL
                  </code>{" "}
                  environment variable
                </li>
                <li>Ensure your database server is running</li>
                <li>Verify database connection credentials</li>
                <li>Run database migrations if needed</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Process data if database operations were successful
  const tickets = ticketsResult.data;
  const groupTickets = groupTicketsResult.data;
  const statusDistribution = statusResult.data;
  const priorityDistribution = priorityResult.data;

  const data = groupTickets.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
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
