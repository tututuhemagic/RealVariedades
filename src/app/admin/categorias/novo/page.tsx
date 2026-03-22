import CategoriaForm from '../categoria-form'

// Página de criação de nova categoria
export default function NovaCategoriaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Nova Categoria</h1>
      <CategoriaForm />
    </div>
  )
}
