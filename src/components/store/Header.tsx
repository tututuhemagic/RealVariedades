'use client'

// Cabeçalho da loja - sticky, design limpo com sombra sutil

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User } from 'lucide-react'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'

/** Categorias placeholder - substituir por dados dinâmicos futuramente */
const categorias = [
  { label: 'Novidades', href: '/produtos?categoria=novidades' },
  { label: 'Mais Vendidos', href: '/produtos?categoria=mais-vendidos' },
  { label: 'Promoções', href: '/produtos?categoria=promocoes' },
  { label: 'Categorias', href: '/categorias' },
]

export default function Header() {
  // Controle do menu mobile
  const [menuAberto, setMenuAberto] = useState(false)
  // Controle da barra de busca mobile
  const [buscaAberta, setBuscaAberta] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Linha principal do header */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Botão hamburger (mobile) */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors lg:hidden"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            RealVariedades
          </Link>

          {/* Barra de busca (desktop) */}
          <div className="hidden flex-1 max-w-lg mx-auto lg:block">
            <SearchBar />
          </div>

          {/* Ações do lado direito */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Botão de busca (mobile) */}
            <button
              onClick={() => setBuscaAberta(!buscaAberta)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors lg:hidden"
              aria-label="Buscar"
            >
              <Search size={24} />
            </button>

            {/* Ícone de usuário */}
            <Link
              href="/login"
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Minha conta"
            >
              <User size={24} />
            </Link>

            {/* Ícone do carrinho */}
            <CartIcon />
          </div>
        </div>

        {/* Barra de busca expandida (mobile) */}
        {buscaAberta && (
          <div className="pb-3 lg:hidden">
            <SearchBar />
          </div>
        )}

        {/* Navegação por categorias (desktop) */}
        <nav className="hidden lg:block border-t border-gray-100">
          <ul className="flex items-center gap-8 py-2">
            {categorias.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile (dropdown) */}
      {menuAberto && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <ul className="flex flex-col gap-1">
              {categorias.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    onClick={() => setMenuAberto(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700
                               transition-colors hover:bg-gray-50 hover:text-blue-600"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}

              {/* Separador */}
              <li className="my-2 border-t border-gray-100" />

              {/* Links de conta no menu mobile */}
              <li>
                <Link
                  href="/login"
                  onClick={() => setMenuAberto(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700
                             transition-colors hover:bg-gray-50 hover:text-blue-600"
                >
                  Entrar / Criar conta
                </Link>
              </li>
              <li>
                <Link
                  href="/minha-conta"
                  onClick={() => setMenuAberto(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700
                             transition-colors hover:bg-gray-50 hover:text-blue-600"
                >
                  Minha Conta
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
