import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buscarProdutos } from './actions'
import ProdutoList from './produto-list'

// Pagina de listagem de produtos (Server Component)
export default async function ProdutosPage() {
  const produtos = await buscarProdutos()

  return (
    <div className="space-y-6">
      {/* Cabecalho com titulo e botao de novo produto */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="inline-flex items-center justify-center gap-2 bg-[#068c22] text-white px-4 py-2.5 min-h-[44px] w-full sm:w-auto rounded-lg text-sm font-medium hover:bg-[#057a1e] transition-colors"
        >
          <Plus size={18} />
          Novo Produto
        </Link>
      </div>

      {/* Lista de produtos com busca e acoes */}
      <ProdutoList produtos={produtos} />
    </div>
  )
}
