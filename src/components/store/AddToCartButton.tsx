'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react'
import type { ItemCarrinho } from '@/types'

interface AddToCartButtonProps {
  produto_id: string
  nome: string
  preco: number
  imagem: string | null
  variante_id?: string | null
  variante_descricao?: string | null
}

export default function AddToCartButton({
  produto_id,
  nome,
  preco,
  imagem,
  variante_id = null,
  variante_descricao = null,
}: AddToCartButtonProps) {
  const [quantidade, setQuantidade] = useState(1)
  const [adicionado, setAdicionado] = useState(false)

  function diminuir() {
    setQuantidade((q) => Math.max(1, q - 1))
  }

  function aumentar() {
    setQuantidade((q) => q + 1)
  }

  function adicionarAoCarrinho() {
    // Ler carrinho atual do localStorage
    let carrinho: ItemCarrinho[] = []
    try {
      const raw = localStorage.getItem('carrinho')
      if (raw) carrinho = JSON.parse(raw)
    } catch {
      carrinho = []
    }

    // Verificar se item já existe (mesmo produto + mesma variante)
    const idx = carrinho.findIndex(
      (item) =>
        item.produto_id === produto_id && item.variante_id === (variante_id ?? null)
    )

    if (idx >= 0) {
      carrinho[idx].quantidade += quantidade
    } else {
      carrinho.push({
        produto_id,
        variante_id: variante_id ?? null,
        quantidade,
        nome,
        preco,
        imagem,
        variante_descricao: variante_descricao ?? null,
      })
    }

    // Salvar
    localStorage.setItem('carrinho', JSON.stringify(carrinho))

    // Disparar evento para atualizar header/badge
    window.dispatchEvent(new Event('carrinho-atualizado'))

    // Feedback visual
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 2000)
  }

  return (
    <div>
      {/* Seletor de quantidade */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">Quantidade</span>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={diminuir}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
            className="h-11 w-16 rounded-lg border border-gray-300 text-center text-base focus:border-[#068c22] focus:ring-1 focus:ring-[#068c22]"
          />
          <button
            type="button"
            onClick={aumentar}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Botao adicionar */}
      <button
        type="button"
        onClick={adicionarAoCarrinho}
        disabled={adicionado}
        className={`w-full rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#068c22] focus:ring-offset-2 min-h-[44px] flex items-center justify-center gap-2 ${
          adicionado
            ? 'bg-green-600'
            : 'bg-[#068c22] hover:bg-[#057a1e] active:scale-[0.98]'
        }`}
      >
        {adicionado ? (
          <>
            <Check size={20} />
            Adicionado!
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Adicionar ao Carrinho
          </>
        )}
      </button>
    </div>
  )
}
