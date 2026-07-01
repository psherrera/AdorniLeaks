import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// ── Tipos de la tabla notas ──────────────────────────────────────

export interface Nota {
  id: string;
  slug: string;
  titulo_ia: string;
  resumen_ia: string;
  url: string;
  fuente: string;
  categoria: Categoria;
  tags: string[];
  score_relevancia: number;
  fecha_publicacion: string;
  fecha_indexacion: string;
}

export type Categoria =
  | "Causas Judiciales"
  | "Conferencias de Prensa"
  | "Desaires"
  | "Dichos Polémicos"
  | "Gobierno"
  | "Sin Categoría"
  | "Todas";

// ── Queries ─────────────────────────────────────────────────────

export async function getNotas(
  categoria?: string,
  busqueda?: string,
  pagina: number = 0,
  porPagina: number = 12
): Promise<{ notas: Nota[]; total: number }> {
  let query = supabase
    .from("notas_publicas")
    .select("*", { count: "exact" })
    .order("fecha_publicacion", { ascending: false })
    .range(pagina * porPagina, (pagina + 1) * porPagina - 1);

  if (categoria && categoria !== "Todas") {
    query = query.eq("categoria", categoria);
  }

  if (busqueda && busqueda.trim()) {
    query = query.or(
      `titulo_ia.ilike.%${busqueda}%,resumen_ia.ilike.%${busqueda}%`
    );
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching notas:", error);
    return { notas: [], total: 0 };
  }

  return { notas: (data as Nota[]) || [], total: count || 0 };
}

export async function getNotaBySlug(slug: string): Promise<Nota | null> {
  const { data, error } = await supabase
    .from("notas_publicas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Nota;
}

export async function getStats(): Promise<{
  total: number;
  porCategoria: Record<string, number>;
}> {
  const { data, error } = await supabase
    .from("notas_publicas")
    .select("categoria");

  if (error || !data) return { total: 0, porCategoria: {} };

  const porCategoria: Record<string, number> = {};
  for (const row of data) {
    const cat = row.categoria || "Sin Categoría";
    porCategoria[cat] = (porCategoria[cat] || 0) + 1;
  }

  return { total: data.length, porCategoria };
}
