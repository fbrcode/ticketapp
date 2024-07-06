"use client";
import { useState } from "react";
import { app_user, ticket } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AssignTicket = ({
  ticket,
  users,
}: {
  ticket: ticket;
  users: app_user[];
}) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");

  const assignTicket = async (userId: string) => {
    setError("");
    setIsAssigning(true);

    try {
      await fetch(`/api/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId === "0" ? null : Number(userId),
        }),
      });
    } catch (error) {
      setError("Failed to assign ticket.");
    }

    setIsAssigning(false);
  };

  return (
    <>
      <Select
        defaultValue={ticket.user_id?.toString() || "0"}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select User..."
            defaultValue={ticket.user_id?.toString() || "0"}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassigned</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
};

export default AssignTicket;
