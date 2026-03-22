import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Categoria, Produto } from "@/types";
import ProductCard from "@/components/store/ProductCard";

interface ProdutosPageProps {
  searchParams: Promise<{
    busca?: string;
    categoria?: string;
    ordenar?: string;
  }>;
}

export default async function ProdutosPage({ searchParams }: ProdutosPageProps) {
  const params = await searchParams;
  const busca = params.busca ?? "";
  const categoriaSlug = params.categoria ?? "";
  const ordenar = params.ordenar ?? "recentes";

  const supabase = await createClient();

  // Fetch categorias para o filtro
  const { data: categorias } = await supabase
    .from("categorias")
    .select("*")
    .eq("ativo", true)
    .order("ordem");

  const categoriasReais = (categorias ?? []) as Categoria[];

  // Resolver categoria_id a partir do slug
  let categoriaId: string | null = null;
  if (categoriaSlug) {
    const cat = categoriasReais.find((c) => c.slug === categoriaSlug);
    if (cat) categoriaId = cat.id;
  }

  // Construir query de produtos
  let query = supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true);

  if (busca) {
    query = query.ilike("nome", `%${busca}%`);
  }

  if (categoriaId) {
    query = query.eq("categoria_id", categoriaId);
  }

  // Ordenacao
  switch (ordenar) {
    case "preco-asc":
      query = query.order("preco", { ascending: true });
      break;
    case "preco-desc":
      query = query.order("preco", { ascending: false });
      break;
    case "nome":
      query = query.order("nome", { ascending: true });
      break;
    case "recentes":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data: produtos } = await query;
  const produtosReais = (produtos ?? []) as Produto[];

  // Helper para construir URL com params
  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams();
    const merged = { busca, categoria: categoriaSlug, ordenar, ...overrides };
    for (const [key, val] of Object.entries(merged)) {
      if (val && val !== "" && !(key === "ordenar" && val === "recentes")) {
        p.set(key, val);
      }
    }
    const qs = p.toString();
    return `/produtos${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Titulo e busca */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Nossos Produtos
        </h1>

        {/* Barra de busca */}
        <form action="/produtos" method="GET" className="relative w-full sm:w-80">
          {categoriaSlug && (
            <input type="hidden" name="categoria" value={categoriaSlug} />
          )}
          {ordenar !== "recentes" && (
            <input type="hidden" name="ordenar" value={ordenar} />
          )}
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            name="busca"
            defaultValue={busca}
            placeholder="Buscar produtos..."
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-base min-h-[44px] focus:border-[#068c22] focus:ring-1 focus:ring-[#068c22] transition-colors"
          />
        </form>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* ===== Filtros (sidebar) ===== */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            </div>

            {/* Filtro por categoria */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">
                Categoria
              </legend>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href={buildUrl({ categoria: "" })}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      !categoriaSlug
                        ? "bg-[#edfcf0] text-[#068c22] font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Todas
                  </Link>
                </li>
                {categoriasReais.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={buildUrl({ categoria: cat.slug })}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        categoriaSlug === cat.slug
                          ? "bg-[#edfcf0] text-[#068c22] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </fieldset>

            {/* Ordenacao */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">
                Ordenar por
              </legend>
              <ul className="mt-2 space-y-1">
                {[
                  { valor: "recentes", label: "Mais recentes" },
                  { valor: "preco-asc", label: "Menor preco" },
                  { valor: "preco-desc", label: "Maior preco" },
                  { valor: "nome", label: "Nome A-Z" },
                ].map((opt) => (
                  <li key={opt.valor}>
                    <Link
                      href={buildUrl({ ordenar: opt.valor })}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        ordenar === opt.valor
                          ? "bg-[#edfcf0] text-[#068c22] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </fieldset>

            {/* Limpar filtros */}
            {(busca || categoriaSlug || ordenar !== "recentes") && (
              <Link
                href="/produtos"
                className="mt-6 block w-full rounded-xl border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 min-h-[44px] leading-[44px]"
              >
                Limpar filtros
              </Link>
            )}
          </div>
        </aside>

        {/* ===== Grid de produtos ===== */}
        <section className="flex-1">
          {/* Info de resultados */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {produtosReais.length}{" "}
              {produtosReais.length === 1 ? "produto encontrado" : "produtos encontrados"}
              {busca && (
                <span>
                  {" "}para &quot;<strong className="text-gray-700">{busca}</strong>&quot;
                </span>
              )}
            </p>
          </div>

          {produtosReais.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {produtosReais.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
              <Search size={48} className="text-gray-300" />
              <p className="mt-4 text-lg font-medium text-gray-600">
                Nenhum produto encontrado
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Tente ajustar os filtros ou volte mais tarde.
              </p>
              <Link
                href="/produtos"
                className="mt-6 inline-block rounded-full bg-[#068c22] px-6 py-3 min-h-[44px] text-sm font-semibold text-white shadow transition hover:bg-[#057a1e]"
              >
                Limpar filtros
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
