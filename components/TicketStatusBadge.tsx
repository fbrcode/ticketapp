import { status } from "@prisma/client";
import { Badge } from "./ui/badge";

interface Props {
  status: status;
}

enum ColorStatus {
  OPEN = "bg-red-400",
  IN_PROGRESS = "bg-yellow-400",
  DONE = "bg-green-400",
}

const statusMap: Record<status, { label: string; color: ColorStatus }> = {
  OPEN: { label: "Open", color: ColorStatus.OPEN },
  IN_PROGRESS: { label: "In Progress", color: ColorStatus.IN_PROGRESS },
  DONE: { label: "Done", color: ColorStatus.DONE },
};

const TicketStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color} `}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default TicketStatusBadge;
