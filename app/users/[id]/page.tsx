import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required</p>;
  }

  const user = await prisma.app_user.findUnique({
    where: { id: Number(params.id) },
    // select: {
    //   id: true,
    //   name: true,
    //   username: true,
    //   role: true,
    // },
  });

  if (!user) {
    return <p className="text-destructive">User Not Found.</p>;
  }

  user.password = "";

  console.log(user);

  return <UserForm user={user} />;
};

export default EditUser;
