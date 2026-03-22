/**
 * Página de detalhes de um produto individual.
 * Recebe o slug via parâmetros dinâmicos da rota.
 * Os dados reais virão do Supabase futuramente.
 */
export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-blue-600">
              Início
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/produtos" className="hover:text-blue-600">
              Produtos
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-gray-900">{slug}</li>
        </ol>
      </nav>

      {/* ===== Layout principal: imagem + info ===== */}
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Galeria de imagens (placeholder) */}
        <section className="w-full lg:w-1/2">
          <div className="aspect-square w-full rounded-2xl bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>

          {/* Miniaturas placeholder */}
          <div className="mt-4 flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 w-20 shrink-0 rounded-lg bg-gray-100"
              />
            ))}
          </div>
        </section>

        {/* Informações do produto */}
        <section className="w-full lg:w-1/2">
          {/* Nome */}
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Produto: {slug}
          </h1>

          {/* Preço placeholder */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-blue-600">
              R$&nbsp;0,00
            </span>
            <span className="text-lg text-gray-400 line-through">
              R$&nbsp;0,00
            </span>
          </div>

          <p className="mt-1 text-sm text-green-600 font-medium">
            ou 3x de R$&nbsp;0,00 sem juros
          </p>

          {/* Variantes (placeholder) */}
          <fieldset className="mt-8">
            <legend className="text-sm font-medium text-gray-700">
              Variação
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {["P", "M", "G", "GG"].map((v) => (
                <button
                  key={v}
                  type="button"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {v}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Quantidade */}
          <div className="mt-6">
            <label
              htmlFor="quantidade"
              className="text-sm font-medium text-gray-700"
            >
              Quantidade
            </label>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <input
                id="quantidade"
                type="number"
                min={1}
                defaultValue={1}
                className="h-10 w-16 rounded-lg border border-gray-300 text-center text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </div>

          {/* Botão de adicionar ao carrinho */}
          <button
            type="button"
            className="mt-8 w-full rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Adicionar ao Carrinho
          </button>

          {/* Descrição placeholder */}
          <article className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">Descrição</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Descrição detalhada do produto será carregada do banco de dados.
              Aqui serão exibidas todas as informações relevantes sobre o
              produto, incluindo especificações técnicas e detalhes de uso.
            </p>
          </article>

          {/* Avaliações placeholder */}
          <article className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">Avaliações</h2>
            <p className="mt-3 text-sm text-gray-500">
              Nenhuma avaliação ainda. Seja o primeiro a avaliar este produto!
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
