import Link from 'next/link'
import { Plus, Search } from 'lucide-react'

// Página de listagem de produtos
export default function ProdutosPage() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e botão de novo produto */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 min-h-[44px] w-full sm:w-auto rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          Novo Produto
        </Link>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Campo de busca */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Filtro por categoria (placeholder) */}
        <select className="px-4 py-2.5 min-h-[44px] w-full sm:w-auto border border-gray-300 rounded-lg text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">Todas as categorias</option>
        </select>

        {/* Filtro por status */}
        <select className="px-4 py-2.5 min-h-[44px] w-full sm:w-auto border border-gray-300 rounded-lg text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>

      {/* Tabela de produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 font-medium">Imagem</th>
                <th className="px-5 py-3 font-medium">Nome</th>
                <th className="px-5 py-3 font-medium">Preço</th>
                <th className="px-5 py-3 font-medium">Estoque</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Estado vazio: nenhum produto cadastrado */}
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-400 text-base">
                      Nenhum produto cadastrado
                    </p>
                    <Link
                      href="/admin/produtos/novo"
                      className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                      Cadastrar primeiro produto
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
