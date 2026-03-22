import { DollarSign, ShoppingCart, Package, AlertTriangle } from 'lucide-react'

// Dados placeholder para os cards de estatísticas
const stats = [
  {
    label: 'Total Vendas',
    value: 'R$ 0,00',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    label: 'Pedidos Hoje',
    value: '0',
    icon: ShoppingCart,
    color: 'bg-blue-500',
  },
  {
    label: 'Produtos Ativos',
    value: '0',
    icon: Package,
    color: 'bg-indigo-500',
  },
  {
    label: 'Estoque Baixo',
    value: '0',
    icon: AlertTriangle,
    color: 'bg-yellow-500',
  },
]

// Página principal do painel administrativo (Server Component)
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Título da página */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4"
            >
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Seção de pedidos recentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Pedidos Recentes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder: nenhum pedido ainda */}
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-gray-400">
                  Nenhum pedido recente encontrado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
