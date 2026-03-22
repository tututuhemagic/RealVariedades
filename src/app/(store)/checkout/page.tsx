/**
 * Página de checkout (finalização do pedido).
 * Dividida em 4 etapas: Dados pessoais, Endereço, Revisão e Pagamento PIX.
 * A lógica de etapas será controlada via estado no cliente futuramente.
 */

/** Indicador visual de etapas */
const etapas = [
  { numero: 1, titulo: "Dados pessoais" },
  { numero: 2, titulo: "Endereço" },
  { numero: 3, titulo: "Revisão" },
  { numero: 4, titulo: "Pagamento PIX" },
];

/** Etapa ativa (placeholder estático) */
const etapaAtual = 1;

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Finalizar Pedido</h1>

      {/* ===== Indicador de etapas ===== */}
      <nav aria-label="Etapas do checkout" className="mt-8">
        <ol className="flex items-center gap-2">
          {etapas.map((etapa) => {
            const ativa = etapa.numero === etapaAtual;
            const concluida = etapa.numero < etapaAtual;

            return (
              <li key={etapa.numero} className="flex flex-1 items-center">
                <div
                  className={`flex w-full flex-col items-center gap-2 rounded-xl p-3 text-center text-sm transition ${
                    ativa
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : concluida
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      ativa
                        ? "bg-blue-600 text-white"
                        : concluida
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {concluida ? "✓" : etapa.numero}
                  </span>
                  <span className="hidden sm:block">{etapa.titulo}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ===== Etapa 1: Dados pessoais ===== */}
      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          1. Dados Pessoais
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Telefone / WhatsApp
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* ===== Etapa 2: Endereço ===== */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">2. Endereço</h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              id="cep"
              type="text"
              placeholder="00000-000"
              className="mt-1 w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="rua" className="block text-sm font-medium text-gray-700">
              Rua
            </label>
            <input
              id="rua"
              type="text"
              placeholder="Nome da rua"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
              Número
            </label>
            <input
              id="numero"
              type="text"
              placeholder="Nº"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">
              Complemento
            </label>
            <input
              id="complemento"
              type="text"
              placeholder="Apto, bloco..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
              Bairro
            </label>
            <input
              id="bairro"
              type="text"
              placeholder="Bairro"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              placeholder="Cidade"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="estado"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>
      </section>

      {/* ===== Etapa 3: Revisão ===== */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          3. Revisão do Pedido
        </h2>

        <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
          Os itens do carrinho e os dados preenchidos serão exibidos aqui para
          confirmação antes do pagamento.
        </div>
      </section>

      {/* ===== Etapa 4: Pagamento PIX ===== */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          4. Pagamento via PIX
        </h2>

        <p className="mt-4 text-sm text-gray-600">
          Ao clicar no botão abaixo, um QR Code PIX será gerado para pagamento
          instantâneo. Após a confirmação, seu pedido será processado
          automaticamente.
        </p>

        {/* Área do QR Code (placeholder) */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            <span className="text-sm text-gray-400">QR Code PIX</span>
          </div>

          <button
            type="button"
            className="w-full max-w-xs rounded-full bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Gerar QR Code PIX
          </button>
        </div>
      </section>
    </div>
  );
}
