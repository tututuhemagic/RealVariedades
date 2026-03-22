import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Produto, VarianteProduto, Categoria } from "@/types";
import AddToCartButton from "@/components/store/AddToCartButton";

/** Formata valor em reais (BRL) */
function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

interface ProdutoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("produtos")
    .select("*, variantes_produto(*), categorias(nome, slug)")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();

  if (error || !data) {
    notFound();
  }

  const produto = data as Produto & {
    variantes_produto: VarianteProduto[];
    categorias: { nome: string; slug: string } | null;
  };

  const temPromocao =
    produto.preco_promocional !== null &&
    produto.preco_promocional < produto.preco;

  const precoExibido = temPromocao ? produto.preco_promocional! : produto.preco;
  const imagemPrincipal =
    produto.imagens && produto.imagens.length > 0 ? produto.imagens[0] : null;

  const variantesAtivas = (produto.variantes_produto ?? []).filter(
    (v) => v.ativo
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[#068c22] transition-colors">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
          {produto.categorias && (
            <>
              <li>
                <Link
                  href={`/categoria/${produto.categorias.slug}`}
                  className="hover:text-[#068c22] transition-colors"
                >
                  {produto.categorias.nome}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} className="text-gray-400" />
              </li>
            </>
          )}
          <li className="font-medium text-gray-900 line-clamp-1">
            {produto.nome}
          </li>
        </ol>
      </nav>

      {/* ===== Layout principal: imagem + info ===== */}
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Galeria de imagens */}
        <section className="w-full lg:w-1/2">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
            {imagemPrincipal ? (
              <Image
                src={imagemPrincipal}
                alt={produto.nome}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package size={80} className="text-gray-300" />
              </div>
            )}

            {/* Badges */}
            {produto.destaque && (
              <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-yellow-900 shadow-sm">
                Destaque
              </span>
            )}
            {temPromocao && (
              <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                Oferta
              </span>
            )}
          </div>

          {/* Miniaturas */}
          {produto.imagens && produto.imagens.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {produto.imagens.map((img, i) => (
                <div
                  key={i}
                  className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100"
                >
                  <Image
                    src={img}
                    alt={`${produto.nome} - imagem ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Informacoes do produto */}
        <section className="w-full lg:w-1/2">
          {/* Categoria tag */}
          {produto.categorias && (
            <Link
              href={`/categoria/${produto.categorias.slug}`}
              className="inline-block text-xs font-semibold uppercase tracking-wider text-[#068c22] hover:text-[#057a1e] transition-colors mb-2"
            >
              {produto.categorias.nome}
            </Link>
          )}

          {/* Nome */}
          <h1
            className="text-2xl font-bold text-gray-900 sm:text-3xl"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {produto.nome}
          </h1>

          {/* Preco */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-[#068c22]">
              {formatarPreco(precoExibido)}
            </span>
            {temPromocao && (
              <span className="text-lg text-gray-400 line-through">
                {formatarPreco(produto.preco)}
              </span>
            )}
          </div>

          {temPromocao && (
            <p className="mt-1 text-sm text-green-600 font-medium">
              Economia de {formatarPreco(produto.preco - produto.preco_promocional!)}
            </p>
          )}

          {/* Estoque */}
          <div className="mt-3">
            {produto.estoque_total > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                Em estoque
              </span>
            ) : (
              <span className="text-sm text-red-500 font-medium">
                Fora de estoque
              </span>
            )}
          </div>

          {/* Variantes */}
          {variantesAtivas.length > 0 && (
            <fieldset className="mt-8">
              <legend className="text-sm font-medium text-gray-700">
                {variantesAtivas[0]?.tipo === "cor"
                  ? "Cor"
                  : variantesAtivas[0]?.tipo === "tamanho"
                  ? "Tamanho"
                  : "Variacao"}
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {variantesAtivas.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2.5 min-h-[44px] min-w-[44px] text-sm font-medium text-gray-700 transition hover:border-[#068c22] hover:text-[#068c22] focus:outline-none focus:ring-2 focus:ring-[#068c22] disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={v.estoque <= 0}
                    title={v.estoque <= 0 ? "Indisponivel" : v.valor}
                  >
                    {v.valor}
                    {v.preco_adicional > 0 && (
                      <span className="ml-1 text-xs text-gray-400">
                        (+{formatarPreco(v.preco_adicional)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Adicionar ao carrinho */}
          <div className="mt-8">
            <AddToCartButton
              produto_id={produto.id}
              nome={produto.nome}
              preco={precoExibido}
              imagem={imagemPrincipal}
            />
          </div>

          {/* Descricao */}
          {produto.descricao && (
            <article className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Descricao
              </h2>
              <div
                className="mt-3 text-gray-600 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: produto.descricao }}
              />
            </article>
          )}

          {/* Avaliacoes placeholder */}
          <article className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">Avaliacoes</h2>
            <p className="mt-3 text-sm text-gray-500">
              Nenhuma avaliacao ainda. Seja o primeiro a avaliar este produto!
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
