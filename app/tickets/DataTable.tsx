import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ticket } from "@prisma/client";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";

interface Props {
  tickets: ticket[];
  searchParams: SearchParams;
}

const DataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={{ query: { ...searchParams, orderBy: "title" } }}>
                  Title
                </Link>
                {"title" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "status" } }}
                  >
                    Status
                  </Link>
                  {"status" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "priority" } }}
                  >
                    Priority
                  </Link>
                  {"priority" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: "created_at" } }}
                >
                  Created
                </Link>
                {"created_at" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: "updated_at" } }}
                >
                  Updated
                </Link>
                {"updated_at" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => {
                  // const createdAt = ticket.created_at.toISOString().split("T")[0];
                  // const updatedAt = ticket.updated_at.toISOString().split("T")[0];

                  const createdAt = ticket.created_at.toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  );

                  const updatedAtSplit = ticket.updated_at
                    .toISOString()
                    .split("Z")[0]
                    .split("T");

                  const updatedAt = `${
                    updatedAtSplit[0]
                  } at ${updatedAtSplit[1].slice(0, -7)}`;

                  return (
                    <TableRow key={ticket.id} data-href="/">
                      <TableCell>
                        <Link href={`/tickets/${ticket.id}`}>
                          {ticket.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <TicketStatusBadge status={ticket.status} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <TicketPriority priority={ticket.priority} />
                        </div>
                      </TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>{updatedAt}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
