import UserForm from "@/components/UserForm";
import DataTableSimple from "./DataTableSimple";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const Users = async () => {
  // const session = await getServerSession(options);

  // if (session?.user.role !== "ADMIN") {
  //   return <p className="text-destructive">Admin access required</p>;
  // }

  const users = await prisma.app_user.findMany();

  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
