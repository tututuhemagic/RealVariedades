'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Trash2, GripVertical } from 'lucide-react'
import { Categoria } from '@/types'
import { excluirCategoria, toggleAtivoCategoria } from './actions'

interface CategoriaListProps {
  categorias: Categoria[]
}

export default function CategoriaList({ categorias }: CategoriaListProps) {
  const router = useRouter()

  return (
    <div className="space-y-3">
      {categorias.map((cat) => (
        <CategoriaCard key={cat.id} categoria={cat} />
      ))}
    </div>
  )
}

// Card individual de cada categoria na listagem
function CategoriaCard({ categoria }: { categoria: Categoria }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Excluir categoria com confirmação
  const handleExcluir = () => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"?`)) {
      return
    }

    startTransition(async () => {
      const resultado = await excluirCategoria(categoria.id)
      if (resultado.success) {
        router.refresh()
      } else {
        alert(resultado.error ?? 'Erro ao excluir categoria')
      }
    })
  }

  // Alternar status ativo/inativo
  const handleToggleAtivo = () => {
    startTransition(async () => {
      const resultado = await toggleAtivoCategoria(categoria.id, !categoria.ativo)
      if (resultado.success) {
        router.refresh()
      } else {
        alert(resultado.error ?? 'Erro ao alterar status')
      }
    })
  }

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5
        flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4
        ${isPending ? 'opacity-50 pointer-events-none' : ''}
        transition-opacity duration-150
      `}
    >
      {/* Indicador de ordenação */}
      <div className="hidden sm:flex items-center text-gray-300">
        <GripVertical size={20} />
      </div>

      {/* Informações da categoria */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-gray-800 truncate">{categoria.nome}</h3>
          {/* Badge de status */}
          <button
            onClick={handleToggleAtivo}
            title={categoria.ativo ? 'Clique para desativar' : 'Clique para ativar'}
            className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              min-h-[28px] cursor-pointer transition-colors
              ${
                categoria.ativo
                  ? 'bg-[#edfcf0] text-[#068c22] hover:bg-[#d4f5da]'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }
            `}
          >
            {categoria.ativo ? 'Ativa' : 'Inativa'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-0.5 truncate">/{categoria.slug}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-400">Ordem: {categoria.ordem}</span>
          {categoria.descricao && (
            <span className="text-xs text-gray-400 truncate max-w-[200px]">
              {categoria.descricao}
            </span>
          )}
        </div>
      </div>

      {/* Ações: editar e excluir */}
      <div className="flex items-center gap-1 self-end sm:self-center">
        <Link
          href={`/admin/categorias/${categoria.id}`}
          className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-[#068c22] hover:bg-[#edfcf0] transition-colors"
          aria-label="Editar categoria"
        >
          <Pencil size={16} />
        </Link>
        <button
          onClick={handleExcluir}
          disabled={isPending}
          className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          aria-label="Excluir categoria"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
