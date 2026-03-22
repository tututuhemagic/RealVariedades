'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Loader2, ImageIcon } from 'lucide-react'
import { Produto, Categoria, VarianteProduto } from '@/types'
import { criarProduto, atualizarProduto, criarVariante, excluirVariante } from './actions'

interface ProdutoFormProps {
  produto?: Produto
  categorias: Categoria[]
}

// Gera slug a partir do nome
function gerarSlug(valor: string): string {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Componente de formulario de produto (criacao e edicao)
export default function ProdutoForm({ produto, categorias }: ProdutoFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isEdicao = !!produto

  // Campos do formulario
  const [nome, setNome] = useState(produto?.nome || '')
  const [slug, setSlug] = useState(produto?.slug || '')
  const [descricao, setDescricao] = useState(produto?.descricao || '')
  const [preco, setPreco] = useState(produto?.preco?.toString() || '')
  const [precoPromocional, setPrecoPromocional] = useState(
    produto?.preco_promocional?.toString() || ''
  )
  const [categoriaId, setCategoriaId] = useState(produto?.categoria_id || '')
  const [estoque, setEstoque] = useState(produto?.estoque_total?.toString() || '0')
  const [ativo, setAtivo] = useState(produto?.ativo ?? true)
  const [destaque, setDestaque] = useState(produto?.destaque ?? false)
  const [imagens, setImagens] = useState<string[]>(produto?.imagens || [])
  const [novaImagem, setNovaImagem] = useState('')
  const [erro, setErro] = useState('')

  // Estado para variantes (somente em modo edicao)
  const [mostrarFormVariante, setMostrarFormVariante] = useState(false)
  const [varianteNome, setVarianteNome] = useState('')
  const [varianteTipo, setVarianteTipo] = useState<'cor' | 'tamanho' | 'outro'>('tamanho')
  const [varianteValor, setVarianteValor] = useState('')
  const [varianteEstoque, setVarianteEstoque] = useState('0')
  const [variantePrecoAdicional, setVariantePrecoAdicional] = useState('0')
  const [varianteSku, setVarianteSku] = useState('')
  const [excluindoVariante, setExcluindoVariante] = useState<string | null>(null)

  // Atualiza nome e gera slug automaticamente
  const handleNomeChange = (valor: string) => {
    setNome(valor)
    setSlug(gerarSlug(valor))
  }

  // Adiciona URL de imagem a lista
  const handleAdicionarImagem = () => {
    const url = novaImagem.trim()
    if (url && !imagens.includes(url)) {
      setImagens([...imagens, url])
      setNovaImagem('')
    }
  }

  // Remove imagem da lista
  const handleRemoverImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index))
  }

  // Submissao do formulario principal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    const formData = new FormData()
    formData.set('nome', nome)
    formData.set('descricao', descricao)
    formData.set('preco', preco)
    formData.set('preco_promocional', precoPromocional)
    formData.set('categoria_id', categoriaId)
    formData.set('estoque_total', estoque)
    formData.set('ativo', ativo.toString())
    formData.set('destaque', destaque.toString())
    formData.set('imagens', JSON.stringify(imagens))

    startTransition(async () => {
      let resultado
      if (isEdicao) {
        resultado = await atualizarProduto(produto.id, formData)
      } else {
        resultado = await criarProduto(formData)
      }

      if (resultado.success) {
        router.push('/admin/produtos')
      } else {
        setErro(resultado.error || 'Erro ao salvar produto.')
      }
    })
  }

  // Submissao de nova variante
  const handleCriarVariante = () => {
    if (!varianteNome || !varianteValor) return

    const formData = new FormData()
    formData.set('produto_id', produto!.id)
    formData.set('nome', varianteNome)
    formData.set('tipo', varianteTipo)
    formData.set('valor', varianteValor)
    formData.set('estoque', varianteEstoque)
    formData.set('preco_adicional', variantePrecoAdicional)
    formData.set('sku', varianteSku)

    startTransition(async () => {
      const resultado = await criarVariante(formData)
      if (resultado.success) {
        // Limpa o form de variante
        setVarianteNome('')
        setVarianteValor('')
        setVarianteEstoque('0')
        setVariantePrecoAdicional('0')
        setVarianteSku('')
        setMostrarFormVariante(false)
        router.refresh()
      } else {
        setErro(resultado.error || 'Erro ao criar variante.')
      }
    })
  }

  // Excluir variante com confirmacao
  const handleExcluirVariante = (id: string, nomeVar: string) => {
    if (!confirm(`Excluir variante "${nomeVar}"?`)) return

    setExcluindoVariante(id)
    startTransition(async () => {
      const resultado = await excluirVariante(id)
      if (!resultado.success) {
        setErro(resultado.error || 'Erro ao excluir variante.')
      }
      setExcluindoVariante(null)
      router.refresh()
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Cabecalho com botao de voltar */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/produtos"
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Voltar para produtos"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdicao ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informacoes basicas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Informacoes Basicas
          </h2>

          {/* Nome do produto */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto *
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => handleNomeChange(e.target.value)}
              placeholder="Ex: Camiseta Basica Algodao"
              className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
              required
            />
          </div>

          {/* Slug (gerado automaticamente) */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL)
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="camiseta-basica-algodao"
              className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base text-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
            />
          </div>

          {/* Descricao */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descricao
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o produto..."
              rows={4}
              className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22] resize-none"
            />
          </div>
        </div>

        {/* Precos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Precos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                Preco (R$) *
              </label>
              <input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                required
              />
            </div>

            <div>
              <label htmlFor="precoPromocional" className="block text-sm font-medium text-gray-700 mb-1">
                Preco Promocional (R$)
              </label>
              <input
                id="precoPromocional"
                type="number"
                step="0.01"
                min="0"
                value={precoPromocional}
                onChange={(e) => setPrecoPromocional(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
              />
            </div>
          </div>
        </div>

        {/* Categoria, Estoque e Toggles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Categoria e Estoque
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                id="categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Estoque */}
            <div>
              <label htmlFor="estoque" className="block text-sm font-medium text-gray-700 mb-1">
                Estoque
              </label>
              <input
                id="estoque"
                type="number"
                min="0"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
              />
            </div>
          </div>

          {/* Toggle ativo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAtivo(!ativo)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                ativo ? 'bg-[#068c22]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={ativo}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  ativo ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <label className="text-sm font-medium text-gray-700">
              Produto ativo
            </label>
          </div>

          {/* Toggle destaque */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDestaque(!destaque)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                destaque ? 'bg-[#068c22]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={destaque}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  destaque ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <label className="text-sm font-medium text-gray-700">
              Produto em destaque
            </label>
          </div>
        </div>

        {/* Imagens (URLs) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Imagens</h2>

          {/* Lista de imagens adicionadas */}
          {imagens.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {imagens.map((url, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg bg-gray-100 overflow-hidden border border-gray-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoverImagem(index)}
                    className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remover imagem"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input para adicionar URL de imagem */}
          <div className="flex gap-2">
            <input
              type="url"
              value={novaImagem}
              onChange={(e) => setNovaImagem(e.target.value)}
              placeholder="Cole a URL da imagem..."
              className="flex-1 px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAdicionarImagem()
                }
              }}
            />
            <button
              type="button"
              onClick={handleAdicionarImagem}
              className="px-4 py-2.5 min-h-[44px] bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
            >
              <ImageIcon size={16} />
              Adicionar
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Adicione URLs de imagens. Upload via Supabase Storage sera implementado em breve.
          </p>
        </div>

        {/* Variantes (somente no modo edicao) */}
        {isEdicao && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Variantes</h2>

            {/* Lista de variantes existentes */}
            {produto.variantes && produto.variantes.length > 0 ? (
              <div className="space-y-2">
                {produto.variantes.map((v: VarianteProduto) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div>
                      <span className="font-medium text-gray-800 text-sm">{v.nome}</span>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-500 capitalize">{v.tipo}</span>
                        <span className="text-xs text-gray-500">Valor: {v.valor}</span>
                        <span className="text-xs text-gray-500">Estoque: {v.estoque}</span>
                        {v.preco_adicional > 0 && (
                          <span className="text-xs text-green-600">
                            +R$ {v.preco_adicional.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        {v.sku && (
                          <span className="text-xs text-gray-400">SKU: {v.sku}</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleExcluirVariante(v.id, v.nome)}
                      disabled={excluindoVariante === v.id}
                      className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      aria-label={`Excluir variante ${v.nome}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhuma variante cadastrada.
              </p>
            )}

            {/* Formulario de nova variante */}
            {mostrarFormVariante ? (
              <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700">Nova Variante</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nome *</label>
                    <input
                      type="text"
                      value={varianteNome}
                      onChange={(e) => setVarianteNome(e.target.value)}
                      placeholder="Ex: Azul M"
                      className="w-full px-3 py-2 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tipo *</label>
                    <select
                      value={varianteTipo}
                      onChange={(e) => setVarianteTipo(e.target.value as 'cor' | 'tamanho' | 'outro')}
                      className="w-full px-3 py-2 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                    >
                      <option value="cor">Cor</option>
                      <option value="tamanho">Tamanho</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Valor *</label>
                    <input
                      type="text"
                      value={varianteValor}
                      onChange={(e) => setVarianteValor(e.target.value)}
                      placeholder="Ex: Azul, M, 110V"
                      className="w-full px-3 py-2 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Estoque</label>
                    <input
                      type="number"
                      min="0"
                      value={varianteEstoque}
                      onChange={(e) => setVarianteEstoque(e.target.value)}
                      className="w-full px-3 py-2 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Preco Adicional (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={variantePrecoAdicional}
                      onChange={(e) => setVariantePrecoAdicional(e.target.value)}
                      className="w-full px-3 py-2 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">SKU</label>
                    <input
                      type="text"
                      value={varianteSku}
                      onChange={(e) => setVarianteSku(e.target.value)}
                      placeholder="Opcional"
                      className="w-full px-3 py-2 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCriarVariante}
                    disabled={isPending || !varianteNome || !varianteValor}
                    className="px-4 py-2.5 min-h-[44px] bg-[#068c22] text-white rounded-lg text-sm font-medium hover:bg-[#057a1e] transition-colors disabled:opacity-50"
                  >
                    {isPending ? 'Salvando...' : 'Salvar Variante'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarFormVariante(false)}
                    className="px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMostrarFormVariante(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-[#068c22] hover:text-[#068c22] transition-colors"
              >
                <Plus size={18} />
                Adicionar Variante
              </button>
            )}
          </div>
        )}

        {/* Botoes de acao */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Link
            href="/admin/produtos"
            className="px-6 py-2.5 min-h-[44px] w-full sm:w-auto border border-gray-300 rounded-lg text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 min-h-[44px] w-full sm:w-auto bg-[#068c22] text-white rounded-lg text-sm font-medium hover:bg-[#057a1e] transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending
              ? 'Salvando...'
              : isEdicao
              ? 'Atualizar Produto'
              : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  )
}
