import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Categoria, Produto } from "@/types";
import ProductCard from "@/components/store/ProductCard";

interface CategoriaPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  // Buscar categoria pelo slug
  const { data: categoria, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();

  if (error || !categoria) {
    notFound();
  }

  const cat = categoria as Categoria;

  // Buscar produtos desta categoria
  const { data: produtos } = await supabase
    .from("produtos")
    .select("*")
    .eq("categoria_id", cat.id)
    .eq("ativo", true)
    .order("created_at", { ascending: false });

  const produtosReais = (produtos ?? []) as Produto[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#068c22] transition-colors">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li>
            <Link
              href="/produtos"
              className="hover:text-[#068c22] transition-colors"
            >
              Categorias
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          <li className="font-medium text-gray-900">{cat.nome}</li>
        </ol>
      </nav>

      {/* Cabecalho da categoria */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {cat.nome}
        </h1>
        {cat.descricao && (
          <p className="mt-2 text-gray-500 max-w-2xl">{cat.descricao}</p>
        )}
        <p className="mt-2 text-sm text-gray-400">
          {produtosReais.length}{" "}
          {produtosReais.length === 1 ? "produto" : "produtos"}
        </p>
      </div>

      {/* Grid de produtos */}
      {produtosReais.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {produtosReais.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Nenhum produto nesta categoria
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Volte em breve, novos produtos sao adicionados regularmente.
          </p>
          <Link
            href="/produtos"
            className="mt-6 inline-block rounded-full bg-[#068c22] px-6 py-3 min-h-[44px] text-sm font-semibold text-white shadow transition hover:bg-[#057a1e]"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}
    </div>
  );
}
