"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Users,
  GraduationCap,
  FolderOpen,
  Heart,
  MessageSquare,
  FileText,
  BarChart3,
  ThumbsUp,
  Route,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { getCurrentUser } from "@/lib/auth";
import { ADRIANA_USER } from "@/lib/data";

const RH_MENU_ITEMS = [
  { href: "/rh/perfil", label: "Perfil", icon: User },
  { href: "/rh/gestao-pessoas", label: "Gestão de Pessoas", icon: Users },
  { href: "/rh/treinamentos", label: "Treinamentos", icon: GraduationCap },
  { href: "/rh/documentos", label: "Documentos", icon: FolderOpen },
  { href: "/rh/clima", label: "Clima Organizacional", icon: Heart },
  { href: "/rh/comunicacao", label: "Comunicação", icon: MessageSquare },
  { href: "/rh/avaliacao", label: "Avaliação Individual", icon: FileText },
  { href: "/rh/comparativo", label: "Comparativo", icon: BarChart3 },
  { href: "/rh/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/rh/nps", label: "NPS", icon: ThumbsUp },
  { href: "/rh/trilha-entregas", label: "Trilha de Entregas", icon: Route },
];

export default function RHLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    if (!current || current.role !== "rh") {
      // Em dev: usar Adriana como default
      if (typeof window !== "undefined" && !current) {
        setUser(ADRIANA_USER);
      } else if (current?.role !== "rh") {
        router.push("/");
        return;
      } else {
        setUser(current);
      }
    } else {
      setUser(current);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-venda-dark">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-venda-gold border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Layout user={user} menuItems={RH_MENU_ITEMS} children={children} />;
}
