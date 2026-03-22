'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Produto, Categoria, VarianteProduto } from '@/types'

// Gera slug a partir do nome (normaliza NFD, lowercase, hifens, remove chars especiais)
function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Busca todos os produtos com join de categoria, ordenados por created_at desc
export async function buscarProdutos(): Promise<Produto[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('produtos')
    .select('*, categoria:categorias(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }

  return (data as Produto[]) || []
}

// Busca um produto pelo ID com variantes
export async function buscarProduto(id: string): Promise<Produto | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('produtos')
    .select('*, categoria:categorias(*), variantes:variantes_produto(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }

  return data as Produto
}

// Busca categorias ativas para o select de formulario
export async function buscarCategorias(): Promise<Categoria[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }

  return (data as Categoria[]) || []
}

// Cria um novo produto
export async function criarProduto(formData: FormData): Promise<{ success: boolean; error?: string; id?: string }> {
  const supabase = await createClient()

  const nome = formData.get('nome') as string
  const descricao = formData.get('descricao') as string
  const preco = parseFloat(formData.get('preco') as string)
  const precoPromocional = formData.get('preco_promocional') as string
  const categoriaId = formData.get('categoria_id') as string
  const estoque = parseInt(formData.get('estoque_total') as string, 10)
  const ativo = formData.get('ativo') === 'true'
  const destaque = formData.get('destaque') === 'true'
  const imagensJson = formData.get('imagens') as string

  // Validacao basica
  if (!nome || isNaN(preco)) {
    return { success: false, error: 'Nome e preco sao obrigatorios.' }
  }

  const slug = gerarSlug(nome)
  const imagens: string[] = imagensJson ? JSON.parse(imagensJson) : []

  const { data, error } = await supabase
    .from('produtos')
    .insert({
      nome,
      slug,
      descricao: descricao || null,
      preco,
      preco_promocional: precoPromocional ? parseFloat(precoPromocional) : null,
      categoria_id: categoriaId || null,
      estoque_total: isNaN(estoque) ? 0 : estoque,
      ativo,
      destaque,
      imagens,
    })
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar produto:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/produtos')
  return { success: true, id: data.id }
}

// Atualiza um produto existente
export async function atualizarProduto(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const nome = formData.get('nome') as string
  const descricao = formData.get('descricao') as string
  const preco = parseFloat(formData.get('preco') as string)
  const precoPromocional = formData.get('preco_promocional') as string
  const categoriaId = formData.get('categoria_id') as string
  const estoque = parseInt(formData.get('estoque_total') as string, 10)
  const ativo = formData.get('ativo') === 'true'
  const destaque = formData.get('destaque') === 'true'
  const imagensJson = formData.get('imagens') as string

  if (!nome || isNaN(preco)) {
    return { success: false, error: 'Nome e preco sao obrigatorios.' }
  }

  const slug = gerarSlug(nome)
  const imagens: string[] = imagensJson ? JSON.parse(imagensJson) : []

  const { error } = await supabase
    .from('produtos')
    .update({
      nome,
      slug,
      descricao: descricao || null,
      preco,
      preco_promocional: precoPromocional ? parseFloat(precoPromocional) : null,
      categoria_id: categoriaId || null,
      estoque_total: isNaN(estoque) ? 0 : estoque,
      ativo,
      destaque,
      imagens,
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar produto:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/produtos')
  revalidatePath(`/admin/produtos/${id}`)
  return { success: true }
}

// Exclui um produto
export async function excluirProduto(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir produto:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/produtos')
  return { success: true }
}

// Cria uma variante para um produto
export async function criarVariante(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const produtoId = formData.get('produto_id') as string
  const nome = formData.get('nome') as string
  const tipo = formData.get('tipo') as 'cor' | 'tamanho' | 'outro'
  const valor = formData.get('valor') as string
  const estoque = parseInt(formData.get('estoque') as string, 10)
  const precoAdicional = parseFloat(formData.get('preco_adicional') as string)
  const sku = formData.get('sku') as string

  if (!produtoId || !nome || !tipo || !valor) {
    return { success: false, error: 'Campos obrigatorios: produto_id, nome, tipo, valor.' }
  }

  const { error } = await supabase
    .from('variantes_produto')
    .insert({
      produto_id: produtoId,
      nome,
      tipo,
      valor,
      estoque: isNaN(estoque) ? 0 : estoque,
      preco_adicional: isNaN(precoAdicional) ? 0 : precoAdicional,
      sku: sku || null,
      ativo: true,
    })

  if (error) {
    console.error('Erro ao criar variante:', error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/admin/produtos/${produtoId}`)
  return { success: true }
}

// Exclui uma variante
export async function excluirVariante(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Busca a variante para pegar o produto_id antes de excluir
  const { data: variante } = await supabase
    .from('variantes_produto')
    .select('produto_id')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('variantes_produto')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir variante:', error)
    return { success: false, error: error.message }
  }

  if (variante) {
    revalidatePath(`/admin/produtos/${variante.produto_id}`)
  }

  return { success: true }
}
