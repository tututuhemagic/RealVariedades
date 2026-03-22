// Card de produto para listagem na loja

import Link from 'next/link'
import Image from 'next/image'
import type { Produto } from '@/types'

interface ProductCardProps {
  produto: Produto
}

/** Formata valor em reais (BRL) */
function formatarPreco(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export default function ProductCard({ produto }: ProductCardProps) {
  const temPromocao =
    produto.preco_promocional !== null && produto.preco_promocional < produto.preco

  // Usa a primeira imagem do produto ou um placeholder
  const imagemSrc = produto.imagens.length > 0 ? produto.imagens[0] : null

  return (
    <Link
      href={`/produto/${produto.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white
                 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Imagem do produto */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {imagemSrc ? (
          <Image
            src={imagemSrc}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // Placeholder quando não há imagem
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badge de destaque */}
        {produto.destaque && (
          <span
            className="absolute left-2 top-2 rounded-full bg-yellow-400 px-3 py-1
                       text-xs font-semibold text-yellow-900 shadow-sm"
          >
            Destaque
          </span>
        )}

        {/* Badge de promoção */}
        {temPromocao && (
          <span
            className="absolute right-2 top-2 rounded-full bg-red-500 px-3 py-1
                       text-xs font-bold text-white shadow-sm"
          >
            Oferta
          </span>
        )}
      </div>

      {/* Informações do produto */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-[#068c22] sm:text-base">
          {produto.nome}
        </h3>

        {/* Preço */}
        <div className="mt-2">
          {temPromocao ? (
            <>
              {/* Preço original riscado */}
              <span className="block text-xs text-gray-400 line-through">
                {formatarPreco(produto.preco)}
              </span>
              {/* Preço promocional */}
              <span className="text-lg font-bold text-red-600">
                {formatarPreco(produto.preco_promocional!)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {formatarPreco(produto.preco)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
