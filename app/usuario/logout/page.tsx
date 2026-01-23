'use client'

import LoadingPage from "@/components/LoadingPage";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return <LoadingPage />;
}
