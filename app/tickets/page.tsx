import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

interface SearchParams {
  page: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSite = 10;
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: pageSite,
    skip: (page - 1) * pageSite,
    orderBy: [{ updated_at: "desc" }],
  });

  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSite}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
