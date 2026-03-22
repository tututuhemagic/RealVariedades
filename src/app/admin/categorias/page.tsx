import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buscarCategorias } from './actions'
import CategoriaList from './categoria-list'

// Página principal de gerenciamento de categorias (Server Component)
export default async function CategoriasPage() {
  const categorias = await buscarCategorias()

  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e botão de nova categoria */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <p className="text-sm text-gray-500 mt-1">
            {categorias.length} {categorias.length === 1 ? 'categoria' : 'categorias'} cadastradas
          </p>
        </div>
        <Link
          href="/admin/categorias/novo"
          className="inline-flex items-center justify-center gap-2 bg-[#068c22] text-white px-4 py-2.5 min-h-[44px] w-full sm:w-auto rounded-lg text-sm font-medium hover:bg-[#057a1e] transition-colors"
        >
          <Plus size={18} />
          Nova Categoria
        </Link>
      </div>

      {/* Lista de categorias ou mensagem de vazio */}
      {categorias.length > 0 ? (
        <CategoriaList categorias={categorias} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
          <p className="text-gray-400 text-base mb-2">
            Nenhuma categoria cadastrada
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Crie categorias para organizar seus produtos.
          </p>
          <Link
            href="/admin/categorias/novo"
            className="inline-flex items-center justify-center gap-2 bg-[#068c22] text-white px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium hover:bg-[#057a1e] transition-colors"
          >
            <Plus size={18} />
            Criar primeira categoria
          </Link>
        </div>
      )}
    </div>
  )
}
