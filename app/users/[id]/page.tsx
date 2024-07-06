import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
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
