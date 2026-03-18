"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, setCurrentUser } from "@/lib/auth";
import { ADRIANA_USER } from "@/lib/data";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.role === "rh") {
      router.replace("/rh/painel");
    } else if (!user) {
      // Dev: simular login como Adriana
      if (typeof window !== "undefined") {
        setCurrentUser(ADRIANA_USER);
        router.replace("/rh/painel");
      }
    } else {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-ecosystem-red border-t-transparent" />
    </div>
  );
}
