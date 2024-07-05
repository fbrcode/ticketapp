import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany({ orderBy: [{ id: "asc" }] });
  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
