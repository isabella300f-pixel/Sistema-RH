"use client";

import Link from "next/link";
import Image from "next/image";
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
    <div className="flex min-h-screen bg-venda-dark">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-amber-900/30 bg-venda-charcoal/95">
        <div className="flex items-center justify-center border-b border-amber-900/30 px-4 py-6">
          <Image src="/logo.png" alt="Venda ComCiência" width={240} height={240} className="object-contain" priority />
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
                  isActive
                    ? "bg-amber-900/40 text-venda-gold"
                    : "text-venda-cream/80 hover:bg-amber-900/20 hover:text-venda-cream"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-amber-900/30 bg-venda-charcoal/95 px-6">
          <h1 className="text-xl font-semibold text-venda-gold">Venda ComCiência Trainning</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-venda-cream/80">{user.nome}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-amber-900/40 bg-amber-900/20 px-4 py-2 text-sm text-venda-gold hover:bg-amber-900/30"
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
