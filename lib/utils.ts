export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return "-";
  }
}

export function getDaysSince(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function calculateScore(avaliacoes: { classificacao?: number }[]): number {
  if (!avaliacoes?.length) return 0;
  const valid = avaliacoes.filter((a) => typeof a.classificacao === "number");
  if (!valid.length) return 0;
  const sum = valid.reduce((acc, a) => acc + (a.classificacao ?? 0), 0);
  return Math.round((sum / valid.length) * 10) / 10;
}
