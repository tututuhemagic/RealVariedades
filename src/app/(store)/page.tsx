import Link from "next/link";

/**
 * Página inicial da loja (Server Component).
 * Exibe hero banner, categorias e produtos em destaque.
 */

/** Categorias placeholder até integrar com Supabase */
const categorias = [
  { nome: "Eletrônicos", icone: "📱" },
  { nome: "Casa & Decoração", icone: "🏠" },
  { nome: "Moda", icone: "👕" },
  { nome: "Beleza", icone: "💄" },
  { nome: "Esportes", icone: "⚽" },
  { nome: "Brinquedos", icone: "🧸" },
];

export default function HomePage() {
  return (
    <>
      {/* ===== Hero Banner ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tudo o que você precisa,
            <br className="hidden sm:block" /> em um só lugar
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Produtos de qualidade com os melhores preços. Pague com PIX e
            receba rápido!
          </p>

          <div className="mt-10">
            <Link
              href="/produtos"
              className="inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Categorias ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Categorias
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categorias.map((cat) => (
            <Link
              key={cat.nome}
              href={`/produtos?categoria=${encodeURIComponent(cat.nome)}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              {/* Ícone placeholder */}
              <span className="text-4xl" aria-hidden="true">
                {cat.icone}
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                {cat.nome}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Produtos em Destaque ===== */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Produtos em Destaque
          </h2>

          {/* Estado vazio — será substituído por dados do Supabase */}
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
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
            <p className="mt-4 text-gray-500">
              Em breve você verá aqui os produtos em destaque.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
