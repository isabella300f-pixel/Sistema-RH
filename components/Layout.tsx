"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import type { User } from "@/lib/types";

export interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface LayoutProps {
  user: User;
  menuItems: MenuItem[];
  children: React.ReactNode;
}

export function Layout({ user, menuItems, children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-700 bg-gray-800/90">
        <div className="flex h-16 items-center justify-center border-b border-gray-700">
          <span className="text-lg font-bold text-white">Sistema RH</span>
        </div>
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-700 bg-gray-800/90 px-6">
          <h1 className="text-xl font-semibold text-white">Módulo RH - Adriana</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user.nome}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
            >
              Sair
            </button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
