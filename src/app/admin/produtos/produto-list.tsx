'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Pencil, Trash2, Package, Plus } from 'lucide-react'
import { Produto } from '@/types'
import { excluirProduto } from './actions'

// Formata preco em BRL: R$ XX,XX
function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

interface ProdutoListProps {
  produtos: Produto[]
}

// Componente client para listagem de produtos com busca e exclusao
export default function ProdutoList({ produtos }: ProdutoListProps) {
  const [busca, setBusca] = useState('')
  const [excluindo, setExcluindo] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Filtra produtos por nome
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  // Exclui produto com confirmacao
  const handleExcluir = (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) return

    setExcluindo(id)
    startTransition(async () => {
      const resultado = await excluirProduto(id)
      if (!resultado.success) {
        alert(`Erro ao excluir: ${resultado.error}`)
      }
      setExcluindo(null)
    })
  }

  return (
    <div className="space-y-4">
      {/* Barra de pesquisa */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar produtos por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:border-[#068c22]"
        />
      </div>

      {/* Estado vazio */}
      {produtosFiltrados.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
          <Package size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400 text-base mb-2">
            {busca ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
          </p>
          {!busca && (
            <Link
              href="/admin/produtos/novo"
              className="text-[#068c22] text-sm font-medium hover:underline"
            >
              Cadastrar primeiro produto
            </Link>
          )}
        </div>
      )}

      {/* Tabela desktop */}
      {produtosFiltrados.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-3 font-medium">Imagem</th>
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">Preco</th>
                  <th className="px-5 py-3 font-medium">Categoria</th>
                  <th className="px-5 py-3 font-medium">Estoque</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="hover:bg-gray-50 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-5 py-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                        {produto.imagens && produto.imagens.length > 0 ? (
                          <Image
                            src={produto.imagens[0]}
                            alt={produto.nome}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package size={20} className="text-gray-400" />
                        )}
                      </div>
                    </td>

                    {/* Nome */}
                    <td className="px-5 py-3">
                      <span className="font-medium text-gray-800">{produto.nome}</span>
                    </td>

                    {/* Preco */}
                    <td className="px-5 py-3">
                      <div>
                        <span className="text-gray-800">{formatarPreco(produto.preco)}</span>
                        {produto.preco_promocional && (
                          <span className="block text-xs text-green-600 font-medium">
                            {formatarPreco(produto.preco_promocional)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Categoria */}
                    <td className="px-5 py-3 text-gray-600">
                      {produto.categoria?.nome || '-'}
                    </td>

                    {/* Estoque */}
                    <td className="px-5 py-3">
                      <span
                        className={`font-medium ${
                          produto.estoque_total <= 0
                            ? 'text-red-600'
                            : produto.estoque_total <= 5
                            ? 'text-yellow-600'
                            : 'text-gray-800'
                        }`}
                      >
                        {produto.estoque_total}
                      </span>
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          produto.ativo
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {produto.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                      {produto.destaque && (
                        <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Destaque
                        </span>
                      )}
                    </td>

                    {/* Acoes */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/produtos/${produto.id}`}
                          className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-[#068c22] hover:bg-[#edfcf0] transition-colors"
                          aria-label={`Editar ${produto.nome}`}
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleExcluir(produto.id, produto.nome)}
                          disabled={excluindo === produto.id}
                          className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          aria-label={`Excluir ${produto.nome}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards mobile */}
      {produtosFiltrados.length > 0 && (
        <div className="md:hidden space-y-3">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {produto.imagens && produto.imagens.length > 0 ? (
                    <Image
                      src={produto.imagens[0]}
                      alt={produto.nome}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={24} className="text-gray-400" />
                  )}
                </div>

                {/* Informacoes */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">{produto.nome}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {produto.categoria?.nome || 'Sem categoria'}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-medium text-gray-800">
                      {formatarPreco(produto.preco)}
                    </span>
                    {produto.preco_promocional && (
                      <span className="text-xs font-medium text-green-600">
                        {formatarPreco(produto.preco_promocional)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rodape do card: status + acoes */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      produto.ativo
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {produto.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Estoque: {produto.estoque_total}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/produtos/${produto.id}`}
                    className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-[#068c22] hover:bg-[#edfcf0] transition-colors"
                    aria-label={`Editar ${produto.nome}`}
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleExcluir(produto.id, produto.nome)}
                    disabled={excluindo === produto.id}
                    className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    aria-label={`Excluir ${produto.nome}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
