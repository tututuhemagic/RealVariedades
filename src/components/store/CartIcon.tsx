'use client'

// Ícone do carrinho com badge de quantidade de itens

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import type { ItemCarrinho } from '@/types'

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0)

  // Lê a quantidade de itens do carrinho salvo no localStorage
  useEffect(() => {
    function atualizarContagem() {
      try {
        const dados = localStorage.getItem('carrinho')
        if (dados) {
          const itens: ItemCarrinho[] = JSON.parse(dados)
          // Soma todas as quantidades dos itens
          const total = itens.reduce((acc, item) => acc + item.quantidade, 0)
          setItemCount(total)
        } else {
          setItemCount(0)
        }
      } catch {
        setItemCount(0)
      }
    }

    // Carrega na montagem
    atualizarContagem()

    // Escuta evento customizado para atualizar quando o carrinho mudar
    window.addEventListener('carrinho-atualizado', atualizarContagem)

    // Escuta mudanças no storage vindas de outras abas
    window.addEventListener('storage', atualizarContagem)

    return () => {
      window.removeEventListener('carrinho-atualizado', atualizarContagem)
      window.removeEventListener('storage', atualizarContagem)
    }
  }, [])

  return (
    <Link
      href="/carrinho"
      className="relative min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
      aria-label={`Carrinho com ${itemCount} itens`}
    >
      <ShoppingBag size={24} />

      {/* Badge com a contagem de itens */}
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center
                     rounded-full bg-blue-600 text-[10px] font-bold text-white"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}
