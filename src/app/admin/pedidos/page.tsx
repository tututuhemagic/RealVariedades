'use client'

import { useState } from 'react'

// Abas de filtro por status do pedido
const statusTabs = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendente', label: 'Pendente' },
  { key: 'pago', label: 'Pago' },
  { key: 'separando', label: 'Separando' },
  { key: 'enviado', label: 'Enviado' },
  { key: 'entregue', label: 'Entregue' },
  { key: 'cancelado', label: 'Cancelado' },
]

// Mapeamento de cores para cada status de pedido
const statusColors: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  pago: 'bg-green-100 text-green-800',
  separando: 'bg-purple-100 text-purple-800',
  enviado: 'bg-blue-100 text-blue-800',
  entregue: 'bg-emerald-100 text-emerald-800',
  cancelado: 'bg-red-100 text-red-800',
}

// Componente de badge de status
function StatusBadge({ status }: { status: string }) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800'
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}
    >
      {status}
    </span>
  )
}

// Página de listagem de pedidos
export default function PedidosPage() {
  // Estado da aba de filtro ativa
  const [activeTab, setActiveTab] = useState('todos')

  return (
    <div className="space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>

      {/* Abas de filtro por status */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabela de pedidos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Estado vazio: nenhum pedido encontrado */}
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <p className="text-gray-400 text-base">
                    Nenhum pedido encontrado
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Exportar StatusBadge para uso em outras páginas
export { StatusBadge, statusColors }
