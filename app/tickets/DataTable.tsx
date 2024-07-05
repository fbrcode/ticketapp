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

interface Props {
  tickets: ticket[];
}

const DataTable = ({ tickets }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>
                <div className="flex justify-center">Status</div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">Priority</div>
              </TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
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
                      <TableCell>{ticket.title}</TableCell>
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
