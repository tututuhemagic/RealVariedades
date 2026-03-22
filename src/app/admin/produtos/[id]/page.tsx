import { notFound } from 'next/navigation'
import { buscarProduto, buscarCategorias } from '../actions'
import ProdutoForm from '../produto-form'

interface EditarProdutoPageProps {
  params: Promise<{ id: string }>
}

// Pagina de edicao de produto (Server Component)
export default async function EditarProdutoPage({ params }: EditarProdutoPageProps) {
  const { id } = await params

  // Busca produto e categorias em paralelo
  const [produto, categorias] = await Promise.all([
    buscarProduto(id),
    buscarCategorias(),
  ])

  if (!produto) {
    notFound()
  }

  return <ProdutoForm produto={produto} categorias={categorias} />
}
