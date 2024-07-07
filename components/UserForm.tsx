"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { app_user } from "@prisma/client";
import { userSchema } from "@/validationSchemas/users";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: app_user;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    // console.log(values);
    try {
      setIsSubmitting(true);
      setError("");

      let response: Response;
      if (user) {
        // handle edit user
        response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // handle new user
        response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Not authorized to perform action.");
        }
        if (response.status === 403) {
          throw new Error("User not allowed to perform action.");
        }
        throw new Error("An error occurred. Please try again.");
      }

      form.reset();
      setIsSubmitting(false);

      router.push("/tickets");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user full name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Enter password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <div className="flex w-full space-x-4"> */}
          <FormField
            control={form.control}
            name="role"
            defaultValue={user?.role}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Role..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="TECH">Tech</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {/* </div> */}
          <Button type="submit" disabled={isSubmitting}>
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive mt-2">{error}</p>
    </div>
  );
};

export default UserForm;
