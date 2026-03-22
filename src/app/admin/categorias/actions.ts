'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Categoria } from '@/types'

// Gera slug a partir do nome: remove acentos, lowercase, troca espaços por hifens
function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove caracteres especiais
    .replace(/\s+/g, '-') // espaços viram hifens
    .replace(/-+/g, '-') // remove hifens duplicados
}

// Busca todas as categorias (incluindo inativas), ordenadas por 'ordem'
export async function buscarCategorias(): Promise<Categoria[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('ordem', { ascending: true })
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }

  return data ?? []
}

// Busca uma categoria pelo ID
export async function buscarCategoriaPorId(id: string): Promise<Categoria | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar categoria:', error)
    return null
  }

  return data
}

// Cria uma nova categoria
// NOTA: Requer politica RLS temporaria para anon (ver supabase/admin-policies-temp.sql)
// Em producao, restringir para usuarios com role 'admin'
export async function criarCategoria(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const nome = formData.get('nome') as string
  const descricao = (formData.get('descricao') as string) || null
  const imagem_url = (formData.get('imagem_url') as string) || null
  const ativo = formData.get('ativo') === 'true'
  const ordem = parseInt(formData.get('ordem') as string) || 0
  const slugCustom = formData.get('slug') as string

  // Usa slug customizado se fornecido, senão gera a partir do nome
  const slug = slugCustom ? slugify(slugCustom) : slugify(nome)

  if (!nome || !slug) {
    return { success: false, error: 'Nome é obrigatório' }
  }

  const { error } = await supabase
    .from('categorias')
    .insert({
      nome,
      slug,
      descricao,
      imagem_url,
      ativo,
      ordem,
    })

  if (error) {
    console.error('Erro ao criar categoria:', error)
    // Verificar se é erro de slug duplicado
    if (error.code === '23505') {
      return { success: false, error: 'Já existe uma categoria com esse slug' }
    }
    return { success: false, error: 'Erro ao criar categoria' }
  }

  revalidatePath('/admin/categorias')
  return { success: true }
}

// Atualiza uma categoria existente
export async function atualizarCategoria(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const nome = formData.get('nome') as string
  const descricao = (formData.get('descricao') as string) || null
  const imagem_url = (formData.get('imagem_url') as string) || null
  const ativo = formData.get('ativo') === 'true'
  const ordem = parseInt(formData.get('ordem') as string) || 0
  const slugCustom = formData.get('slug') as string

  const slug = slugCustom ? slugify(slugCustom) : slugify(nome)

  if (!nome || !slug) {
    return { success: false, error: 'Nome é obrigatório' }
  }

  const { error } = await supabase
    .from('categorias')
    .update({
      nome,
      slug,
      descricao,
      imagem_url,
      ativo,
      ordem,
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar categoria:', error)
    if (error.code === '23505') {
      return { success: false, error: 'Já existe uma categoria com esse slug' }
    }
    return { success: false, error: 'Erro ao atualizar categoria' }
  }

  revalidatePath('/admin/categorias')
  return { success: true }
}

// Exclui uma categoria pelo ID
export async function excluirCategoria(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('categorias')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao excluir categoria:', error)
    // Verificar se há produtos vinculados (foreign key)
    if (error.code === '23503') {
      return { success: false, error: 'Não é possível excluir: há produtos vinculados a esta categoria' }
    }
    return { success: false, error: 'Erro ao excluir categoria' }
  }

  revalidatePath('/admin/categorias')
  return { success: true }
}

// Reordena categorias atualizando o campo 'ordem' com base na posição no array
export async function reordenarCategorias(ids: string[]): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Atualiza cada categoria com sua nova ordem
  const updates = ids.map((id, index) =>
    supabase
      .from('categorias')
      .update({ ordem: index })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const erro = results.find((r) => r.error)

  if (erro?.error) {
    console.error('Erro ao reordenar categorias:', erro.error)
    return { success: false, error: 'Erro ao reordenar categorias' }
  }

  revalidatePath('/admin/categorias')
  return { success: true }
}

// Alterna o status ativo/inativo de uma categoria
export async function toggleAtivoCategoria(
  id: string,
  ativo: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('categorias')
    .update({ ativo })
    .eq('id', id)

  if (error) {
    console.error('Erro ao alterar status da categoria:', error)
    return { success: false, error: 'Erro ao alterar status' }
  }

  revalidatePath('/admin/categorias')
  return { success: true }
}
