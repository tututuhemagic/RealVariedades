import Link from "next/link";

/**
 * Página de catálogo de produtos.
 * Exibe filtros laterais e grid responsivo de produtos.
 * Os dados virão do Supabase futuramente.
 */
export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900">Nossos Produtos</h1>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* ===== Filtros (sidebar) ===== */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>

            {/* Filtro por categoria */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">
                Categoria
              </legend>
              <ul className="mt-2 space-y-2">
                {["Todas", "Eletrônicos", "Casa", "Moda", "Beleza"].map(
                  (cat) => (
                    <li key={cat}>
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="radio"
                          name="categoria"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          defaultChecked={cat === "Todas"}
                        />
                        {cat}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </fieldset>

            {/* Filtro por faixa de preço */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">
                Preço
              </legend>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-gray-400">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </fieldset>

            {/* Ordenação */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-gray-700">
                Ordenação
              </legend>
              <select className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="mais-vendidos">Mais vendidos</option>
                <option value="novidades">Novidades</option>
              </select>
            </fieldset>
          </div>
        </aside>

        {/* ===== Grid de produtos ===== */}
        <section className="flex-1">
          {/* Estado vazio — substituir por listagem real futuramente */}
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-600">
              Nenhum produto encontrado
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Tente ajustar os filtros ou volte mais tarde.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Voltar ao início
            </Link>
          </div>

          {/* Grid placeholder (será preenchido com ProductCard) */}
          {/*
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {produtos.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
          */}
        </section>
      </div>
    </div>
  );
}
