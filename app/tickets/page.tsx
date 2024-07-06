import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { status, ticket } from "@prisma/client";

export interface SearchParams {
  status: status;
  page: string;
  orderBy: keyof ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSite = 10;
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "updated_at";

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

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
        <StatusFilter />
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
