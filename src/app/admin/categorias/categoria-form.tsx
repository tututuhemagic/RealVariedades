'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, ArrowLeft } from 'lucide-react'
import { Categoria } from '@/types'
import { criarCategoria, atualizarCategoria } from './actions'
import Link from 'next/link'

// Gera slug no cliente para preview em tempo real
function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

interface CategoriaFormProps {
  categoria?: Categoria // Se fornecido, modo edição
}

export default function CategoriaForm({ categoria }: CategoriaFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Estado dos campos do formulário
  const [nome, setNome] = useState(categoria?.nome ?? '')
  const [slug, setSlug] = useState(categoria?.slug ?? '')
  const [slugEditado, setSlugEditado] = useState(false) // Se o usuario editou o slug manualmente
  const [descricao, setDescricao] = useState(categoria?.descricao ?? '')
  const [imagemUrl, setImagemUrl] = useState(categoria?.imagem_url ?? '')
  const [ativo, setAtivo] = useState(categoria?.ativo ?? true)
  const [ordem, setOrdem] = useState(categoria?.ordem ?? 0)
  const [erro, setErro] = useState<string | null>(null)

  // Atualiza nome e gera slug automaticamente (se não foi editado manualmente)
  const handleNomeChange = (value: string) => {
    setNome(value)
    if (!slugEditado) {
      setSlug(slugify(value))
    }
  }

  // Quando o usuario edita o slug manualmente
  const handleSlugChange = (value: string) => {
    setSlugEditado(true)
    setSlug(slugify(value))
  }

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErro(null)

    const formData = new FormData()
    formData.set('nome', nome)
    formData.set('slug', slug)
    formData.set('descricao', descricao)
    formData.set('imagem_url', imagemUrl)
    formData.set('ativo', ativo.toString())
    formData.set('ordem', ordem.toString())

    startTransition(async () => {
      const resultado = categoria
        ? await atualizarCategoria(categoria.id, formData)
        : await criarCategoria(formData)

      if (resultado.success) {
        router.push('/admin/categorias')
        router.refresh()
      } else {
        setErro(resultado.error ?? 'Erro desconhecido')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Link voltar */}
      <Link
        href="/admin/categorias"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors min-h-[44px]"
      >
        <ArrowLeft size={16} />
        Voltar para categorias
      </Link>

      {/* Mensagem de erro */}
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {erro}
        </div>
      )}

      {/* Campo: Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nome *
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => handleNomeChange(e.target.value)}
          placeholder="Ex: Roupas Femininas"
          className="w-full px-4 py-3 min-h-[44px] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-transparent transition-colors"
        />
      </div>

      {/* Campo: Slug (gerado automaticamente, editável) */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1.5">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          placeholder="roupas-femininas"
          className="w-full px-4 py-3 min-h-[44px] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-transparent transition-colors bg-gray-50"
        />
        <p className="mt-1 text-xs text-gray-400">
          Gerado automaticamente a partir do nome. Pode ser editado manualmente.
        </p>
      </div>

      {/* Campo: Descrição */}
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1.5">
          Descrição
        </label>
        <textarea
          id="descricao"
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da categoria (opcional)"
          className="w-full px-4 py-3 min-h-[44px] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-transparent transition-colors resize-vertical"
        />
      </div>

      {/* Campo: URL da Imagem */}
      <div>
        <label htmlFor="imagem_url" className="block text-sm font-medium text-gray-700 mb-1.5">
          URL da Imagem
        </label>
        <input
          id="imagem_url"
          type="url"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          className="w-full px-4 py-3 min-h-[44px] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-transparent transition-colors"
        />
      </div>

      {/* Campo: Ordem */}
      <div>
        <label htmlFor="ordem" className="block text-sm font-medium text-gray-700 mb-1.5">
          Ordem de exibição
        </label>
        <input
          id="ordem"
          type="number"
          min={0}
          value={ordem}
          onChange={(e) => setOrdem(parseInt(e.target.value) || 0)}
          className="w-full px-4 py-3 min-h-[44px] text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-transparent transition-colors"
        />
      </div>

      {/* Campo: Status ativo/inativo (toggle) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={ativo}
          onClick={() => setAtivo(!ativo)}
          className={`
            relative inline-flex h-7 w-12 min-w-[48px] items-center rounded-full
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:ring-offset-2
            ${ativo ? 'bg-[#068c22]' : 'bg-gray-300'}
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 transform rounded-full bg-white shadow-sm
              transition-transform duration-200 ease-in-out
              ${ativo ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {ativo ? 'Ativa' : 'Inativa'}
        </span>
      </div>

      {/* Botão de submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 bg-[#068c22] text-white px-6 py-3 min-h-[44px] w-full sm:w-auto rounded-lg text-base font-medium hover:bg-[#057a1e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save size={18} />
              {categoria ? 'Salvar Alterações' : 'Criar Categoria'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
