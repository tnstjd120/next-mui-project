import React from "react";
import Wrapper from "./_components/Wrapper";
import { auth } from "@/auth";
import { User } from "next-auth";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await auth();

  return <Wrapper me={session?.user as User}>{children}</Wrapper>;
}
