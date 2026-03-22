import { Plus, Pencil, Trash2 } from 'lucide-react'

// Página de gerenciamento de categorias
export default function CategoriasPage() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e botão de nova categoria */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
        <button
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      {/* Grid de categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Estado vazio: nenhuma categoria cadastrada */}
        {/* TODO: Mapear categorias do banco de dados aqui */}
      </div>

      {/* Mensagem quando não há categorias */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <p className="text-gray-400 text-base mb-2">
          Nenhuma categoria cadastrada
        </p>
        <p className="text-sm text-gray-400">
          Crie categorias para organizar seus produtos.
        </p>
      </div>
    </div>
  )
}

// Componente de card de categoria (para uso futuro)
function CategoriaCard({
  nome,
  slug,
  produtosCount,
}: {
  nome: string
  slug: string
  produtosCount: number
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-gray-800">{nome}</h3>
        <p className="text-sm text-gray-500 mt-0.5">/{slug}</p>
        <p className="text-xs text-gray-400 mt-1">
          {produtosCount} {produtosCount === 1 ? 'produto' : 'produtos'}
        </p>
      </div>
      {/* Ações de editar e excluir */}
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          aria-label="Editar categoria"
        >
          <Pencil size={16} />
        </button>
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          aria-label="Excluir categoria"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
