'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'

const categorias = [
  { label: 'Novidades', href: '/produtos?categoria=novidades' },
  { label: 'Mais Vendidos', href: '/produtos?categoria=mais-vendidos' },
  { label: 'Ofertas', href: '/produtos?categoria=promocoes' },
  { label: 'Categorias', href: '/categorias' },
]

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [buscaAberta, setBuscaAberta] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detecta scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-gray-200/60 shadow-lg shadow-black/[0.03]'
          : 'bg-white/95 border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:text-[#068c22] hover:bg-[#edfcf0] active:scale-95 transition-all lg:hidden"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#068c22] text-white font-bold text-sm transition-transform group-hover:scale-105 group-active:scale-95">
              RV
            </div>
            <span className="hidden sm:block text-lg font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Real<span className="text-[#068c22]">Variedades</span>
            </span>
          </Link>

          {/* Busca desktop */}
          <div className="hidden flex-1 max-w-lg mx-auto lg:block">
            <SearchBar />
          </div>

          {/* Acoes */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setBuscaAberta(!buscaAberta)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:text-[#068c22] hover:bg-[#edfcf0] active:scale-95 transition-all lg:hidden"
              aria-label="Buscar"
            >
              <Search size={22} />
            </button>

            <Link
              href="/login"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:text-[#068c22] hover:bg-[#edfcf0] active:scale-95 transition-all"
              aria-label="Minha conta"
            >
              <User size={22} />
            </Link>

            <CartIcon />
          </div>
        </div>

        {/* Busca mobile expandida */}
        {buscaAberta && (
          <div className="pb-3 animate-fade-in-up lg:hidden">
            <SearchBar />
          </div>
        )}

        {/* Nav desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 -mb-px">
            {categorias.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="relative block px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-[#068c22] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-[#068c22] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile overlay */}
      {menuAberto && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/20 z-40 animate-fade-in lg:hidden"
            onClick={() => setMenuAberto(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 animate-fade-in-up lg:hidden">
            <nav className="mx-auto max-w-7xl px-4 py-3">
              <ul className="flex flex-col gap-0.5">
                {categorias.map((cat, i) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      onClick={() => setMenuAberto(false)}
                      className="flex items-center rounded-xl px-4 py-3.5 min-h-[44px] text-base font-medium text-gray-700 transition-all hover:bg-[#edfcf0] hover:text-[#068c22] active:scale-[0.98]"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
                <li className="my-2 border-t border-gray-100" />
                <li>
                  <Link
                    href="/login"
                    onClick={() => setMenuAberto(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 min-h-[44px] text-base font-medium text-[#068c22] bg-[#edfcf0] transition-all hover:bg-[#d4f5dc] active:scale-[0.98]"
                  >
                    <User size={20} />
                    Entrar / Criar conta
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
