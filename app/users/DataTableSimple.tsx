import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { app_user } from "@prisma/client";
import Link from "next/link";

interface Props {
  users: app_user[];
}

const DataTableSimple = ({ users }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Username</TableHead>
              <TableHead className="font-medium">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((user) => (
                  <TableRow key={user.id} data-href="/">
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.role}</Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTableSimple;
