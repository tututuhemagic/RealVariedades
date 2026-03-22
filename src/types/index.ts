// Tipos do banco de dados - RealVariedades

export interface Categoria {
  id: string
  nome: string
  slug: string
  descricao: string | null
  imagem_url: string | null
  ativo: boolean
  ordem: number
  created_at: string
}

export interface Produto {
  id: string
  nome: string
  slug: string
  descricao: string | null
  preco: number
  preco_promocional: number | null
  categoria_id: string
  estoque_total: number
  ativo: boolean
  destaque: boolean
  imagens: string[]
  created_at: string
  updated_at: string
  // Joins
  categoria?: Categoria
  variantes?: VarianteProduto[]
  avaliacoes?: Avaliacao[]
}

export interface VarianteProduto {
  id: string
  produto_id: string
  nome: string
  tipo: 'cor' | 'tamanho' | 'outro'
  valor: string
  estoque: number
  preco_adicional: number
  sku: string | null
  ativo: boolean
}

export interface Usuario {
  id: string
  nome: string | null
  email: string | null
  telefone: string | null
  cpf: string | null
  created_at: string
}

export interface Endereco {
  id: string
  usuario_id: string
  cep: string
  rua: string
  numero: string
  complemento: string | null
  bairro: string
  cidade: string
  estado: string
  principal: boolean
}

export type StatusPedido =
  | 'pendente'
  | 'pago'
  | 'separando'
  | 'enviado'
  | 'entregue'
  | 'cancelado'

export interface Pedido {
  id: string
  usuario_id: string | null
  status: StatusPedido
  total: number
  subtotal: number
  frete: number
  nome_cliente: string
  email_cliente: string
  telefone_cliente: string | null
  endereco_entrega: EnderecoEntrega | null
  pix_txid: string | null
  pix_qrcode: string | null
  pix_copia_cola: string | null
  pix_expiracao: string | null
  created_at: string
  updated_at: string
  // Joins
  itens?: ItemPedido[]
}

export interface EnderecoEntrega {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export interface ItemPedido {
  id: string
  pedido_id: string
  produto_id: string
  variante_id: string | null
  quantidade: number
  preco_unitario: number
  subtotal: number
  nome_produto: string
  variante_descricao: string | null
  // Joins
  produto?: Produto
}

export interface Avaliacao {
  id: string
  produto_id: string
  usuario_id: string
  nota: number
  comentario: string | null
  aprovado: boolean
  created_at: string
  // Joins
  usuario?: Usuario
}

// Tipo para o carrinho (localStorage)
export interface ItemCarrinho {
  produto_id: string
  variante_id: string | null
  quantidade: number
  // Dados desnormalizados para exibição
  nome: string
  preco: number
  imagem: string | null
  variante_descricao: string | null
}
