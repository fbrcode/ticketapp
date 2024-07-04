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
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => {
                  const createdAt = ticket.created_at
                    .toISOString()
                    .split("T")[0];
                  const updatedAt = ticket.updated_at
                    .toISOString()
                    .split("T")[0];
                  return (
                    <TableRow key={ticket.id} data-href="/">
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>{ticket.priority}</TableCell>
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
