import { buscarCategorias } from '../actions'
import ProdutoForm from '../produto-form'

// Pagina de criacao de novo produto (Server Component)
export default async function NovoProdutoPage() {
  const categorias = await buscarCategorias()

  return <ProdutoForm categorias={categorias} />
}
