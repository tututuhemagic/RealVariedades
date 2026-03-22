'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Upload, Plus, ArrowLeft } from 'lucide-react'

// Página de cadastro de novo produto (Client Component)
export default function NovoProdutoPage() {
  // Estado do formulário
  const [nome, setNome] = useState('')
  const [slug, setSlug] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [precoPromocional, setPrecoPromocional] = useState('')
  const [categoria, setCategoria] = useState('')
  const [estoque, setEstoque] = useState('')
  const [destaque, setDestaque] = useState(false)

  // Gera o slug automaticamente a partir do nome
  const gerarSlug = (valor: string) => {
    return valor
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Atualiza nome e gera slug automaticamente
  const handleNomeChange = (valor: string) => {
    setNome(valor)
    setSlug(gerarSlug(valor))
  }

  // Submissão do formulário (placeholder)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de salvamento
    console.log({ nome, slug, descricao, preco, precoPromocional, categoria, estoque, destaque })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Cabeçalho com botão de voltar */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/produtos"
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Voltar para produtos"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Novo Produto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações básicas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Informações Básicas
          </h2>

          {/* Nome do produto */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => handleNomeChange(e.target.value)}
              placeholder="Ex: Camiseta Básica Algodão"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o produto..."
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Preços */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Preços</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preço principal */}
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Preço promocional */}
            <div>
              <label htmlFor="precoPromocional" className="block text-sm font-medium text-gray-700 mb-1">
                Preço Promocional (R$)
              </label>
              <input
                id="precoPromocional"
                type="number"
                step="0.01"
                min="0"
                value={precoPromocional}
                onChange={(e) => setPrecoPromocional(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Categoria e Estoque */}
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
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Selecione uma categoria</option>
                {/* TODO: Carregar categorias do banco de dados */}
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Toggle de destaque */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDestaque(!destaque)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${destaque ? 'bg-indigo-600' : 'bg-gray-300'}
              `}
              role="switch"
              aria-checked={destaque}
            >
              <span
                className={`
                  inline-block h-4 w-4 rounded-full bg-white transition-transform
                  ${destaque ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            <label className="text-sm font-medium text-gray-700">
              Produto em destaque
            </label>
          </div>
        </div>

        {/* Upload de imagens (placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Imagens</h2>

          {/* Área de upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Clique ou arraste imagens para fazer upload
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG ou WebP (máx. 5MB)
            </p>
          </div>
        </div>

        {/* Variantes (placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Variantes</h2>

          <p className="text-sm text-gray-500">
            Adicione variantes como tamanho, cor, etc.
          </p>

          {/* Botão para adicionar variante */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            <Plus size={18} />
            Adicionar Variante
          </button>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Link
            href="/admin/produtos"
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Salvar Produto
          </button>
        </div>
      </form>
    </div>
  )
}
