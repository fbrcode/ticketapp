import { priority } from "@prisma/client";
import { Flame } from "lucide-react";

interface Props {
  priority: priority;
}

enum LevelPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

const priorityMap: Record<priority, { label: string; level: LevelPriority }> = {
  LOW: { label: "Low", level: LevelPriority.LOW },
  MEDIUM: { label: "Medium", level: LevelPriority.MEDIUM },
  HIGH: { label: "High", level: LevelPriority.HIGH },
};

const TicketPriority = ({ priority }: Props) => {
  return (
    <div className="flex justify-between">
      <Flame
        className={`${
          priorityMap[priority].level >= LevelPriority.LOW
            ? "text-red-500"
            : "text-muted"
        }`}
      />
      <Flame
        className={`${
          priorityMap[priority].level >= LevelPriority.MEDIUM
            ? "text-red-500"
            : "text-muted"
        }`}
      />
      <Flame
        className={`${
          priorityMap[priority].level >= LevelPriority.HIGH
            ? "text-red-500"
            : "text-muted"
        }`}
      />
    </div>
  );
};

export default TicketPriority;
