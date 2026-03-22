import { Search } from 'lucide-react'

// Retorna a classe CSS e o rótulo do badge de status de estoque
function getEstoqueStatus(quantidade: number) {
  if (quantidade === 0) {
    return { label: 'Esgotado', className: 'bg-red-100 text-red-800' }
  }
  if (quantidade <= 10) {
    return { label: 'Baixo', className: 'bg-yellow-100 text-yellow-800' }
  }
  return { label: 'OK', className: 'bg-green-100 text-green-800' }
}

// Componente de badge de status de estoque
function EstoqueBadge({ quantidade }: { quantidade: number }) {
  const { label, className } = getEstoqueStatus(quantidade)
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}

// Página de controle de estoque
export default function EstoquePage() {
  return (
    <div className="space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-800">Controle de Estoque</h1>

      {/* Barra de busca */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar por produto ou variante..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Tabela de estoque */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 font-medium">Produto</th>
                <th className="px-5 py-3 font-medium">Variante</th>
                <th className="px-5 py-3 font-medium">Estoque Atual</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Estado vazio: nenhum produto no estoque */}
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <p className="text-gray-400 text-base">
                    Nenhum produto cadastrado no estoque
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Legenda dos status */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="font-medium">Legenda:</span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
          OK (acima de 10)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
          Baixo (1 a 10)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          Esgotado (0)
        </div>
      </div>
    </div>
  )
}

// Exportar componentes para reutilização
export { EstoqueBadge, getEstoqueStatus }
