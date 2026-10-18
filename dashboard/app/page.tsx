"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/providers";

export default function Home() {
  const router = useRouter();
  const { authed } = useApp();

  useEffect(() => {
    router.replace(authed ? "/dashboard" : "/login");
  }, [authed, router]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ color: "var(--muted)" }}
    >
      ITRAHUB…
    </div>
  );
}
