import UserForm from "@/components/UserForm";
import DataTableSimple from "./DataTableSimple";
import prisma from "@/prisma/db";

const Users = async () => {
  const users = await prisma.app_user.findMany();

  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
