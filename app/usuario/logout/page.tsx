"use client";

import { logOutUser } from "@/app/api/actions/server";
import LoadingPage from "@/components/LoadingPage";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Logout() {
  const { data: session, status } = useSession();

  const fetchData = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario?email=${session?.user?.email}`,
    )
  };
  useEffect(() => {
    console.log(session?.user.email)
    if (session?.user.email) {
      fetchData();
      signOut({ callbackUrl: "/" });
    }
  }, []);

  return <LoadingPage />;
}
