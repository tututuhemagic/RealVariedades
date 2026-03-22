'use client'

// Barra de busca da loja - redireciona para /produtos?busca=query

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

interface SearchBarProps {
  /** Classes CSS adicionais */
  className?: string
  /** Placeholder do campo de busca */
  placeholder?: string
}

export default function SearchBar({
  className = '',
  placeholder = 'Buscar produtos...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  // Envia a busca e redireciona para a página de produtos
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const termo = query.trim()
    if (!termo) return
    router.push(`/produtos?busca=${encodeURIComponent(termo)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-base
                   min-h-[44px] text-gray-700 placeholder-gray-400 outline-none transition-colors
                   focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
      />
      {/* Ícone de busca posicionado dentro do input */}
      <button
        type="submit"
        className="absolute left-3 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-1.5 text-gray-400 hover:text-blue-500 transition-colors"
        aria-label="Buscar"
      >
        <Search size={18} />
      </button>
    </form>
  )
}
