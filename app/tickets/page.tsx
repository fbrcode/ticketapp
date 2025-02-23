import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { status, ticket } from "@prisma/client";
import TicketPieChart from "@/components/TicketPieChart";

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

export interface SearchParams {
  status: status;
  page: string;
  orderBy: keyof ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSite = 10;
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "created_at";

  const statuses = Object.values(status);
  const validStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (validStatus) {
    where = { status: validStatus };
  } else {
    where = { NOT: { status: status.DONE } };
  }

  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSite,
    skip: (page - 1) * pageSite,
    orderBy: { [orderBy]: "desc" },
  });

  const ticketCount = await prisma.ticket.count({ where });

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
    <div className="space-y-4">
      <div className="flex gap-2">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <TicketPieChart data={statusData} title="Status Distribution" />
        <TicketPieChart data={priorityData} title="Priority Distribution" />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSite}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
