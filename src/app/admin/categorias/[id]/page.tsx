import { notFound } from 'next/navigation'
import { buscarCategoriaPorId } from '../actions'
import CategoriaForm from '../categoria-form'

interface EditarCategoriaPageProps {
  params: Promise<{ id: string }>
}

// Página de edição de categoria existente
export default async function EditarCategoriaPage({ params }: EditarCategoriaPageProps) {
  const { id } = await params

  const categoria = await buscarCategoriaPorId(id)

  // Se não encontrar a categoria, retorna 404
  if (!categoria) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Editar Categoria</h1>
      <CategoriaForm categoria={categoria} />
    </div>
  )
}
