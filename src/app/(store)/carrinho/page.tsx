import Link from "next/link";

/**
 * Página do carrinho de compras.
 * Exibe itens adicionados, resumo do pedido e botão de checkout.
 * A lógica do carrinho será gerenciada via estado global (Zustand/Context).
 */

/** Simulação de carrinho vazio — será substituído por estado real */
const itensCarrinho: unknown[] = [];

export default function CarrinhoPage() {
  const carrinhoVazio = itensCarrinho.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho</h1>

      {carrinhoVazio ? (
        /* ===== Estado vazio ===== */
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 sm:p-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <p className="mt-4 text-lg font-medium text-gray-600">
            Seu carrinho está vazio
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Adicione produtos para continuar comprando.
          </p>

          <Link
            href="/produtos"
            className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 min-h-[44px] w-full sm:w-auto text-sm font-semibold text-white shadow transition hover:bg-blue-700 text-center"
          >
            Ver Produtos
          </Link>
        </div>
      ) : (
        /* ===== Carrinho com itens ===== */
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Lista de itens */}
          <section className="flex-1 overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200 text-sm font-medium text-gray-500">
                  <th className="pb-3">Produto</th>
                  <th className="pb-3 text-center">Qtd</th>
                  <th className="pb-3 text-right">Subtotal</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {/* Linhas serão renderizadas dinamicamente */}
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-sm text-gray-400"
                  >
                    Carregando itens...
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Resumo do pedido */}
          <aside className="w-full shrink-0 lg:w-80">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Resumo do Pedido
              </h2>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">R$&nbsp;0,00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Frete</dt>
                  <dd className="font-medium text-gray-900">A calcular</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-semibold text-gray-900">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-blue-600">
                    R$&nbsp;0,00
                  </dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow transition hover:bg-blue-700"
              >
                Finalizar Compra
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
