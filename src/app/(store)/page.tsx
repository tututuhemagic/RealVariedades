import Link from "next/link";
import {
  Truck,
  QrCode,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Sparkles,
  Star,
  Package,
} from "lucide-react";

/** Categorias placeholder */
const categorias = [
  { nome: "Eletronicos", slug: "eletronicos", icone: "📱", cor: "from-blue-500 to-cyan-400" },
  { nome: "Casa & Deco", slug: "casa-decoracao", icone: "🏠", cor: "from-amber-500 to-orange-400" },
  { nome: "Moda", slug: "moda", icone: "👗", cor: "from-pink-500 to-rose-400" },
  { nome: "Beleza", slug: "beleza", icone: "💄", cor: "from-purple-500 to-fuchsia-400" },
  { nome: "Esportes", slug: "esportes", icone: "⚽", cor: "from-emerald-500 to-green-400" },
  { nome: "Brinquedos", slug: "brinquedos", icone: "🧸", cor: "from-yellow-500 to-amber-400" },
];

/** Beneficios da loja */
const beneficios = [
  {
    icone: Truck,
    titulo: "Entrega Rapida",
    desc: "Enviamos para todo o Brasil com rastreio completo",
    cor: "bg-blue-50 text-blue-600",
  },
  {
    icone: QrCode,
    titulo: "PIX Instantaneo",
    desc: "Pague com PIX e tenha o pedido confirmado na hora",
    cor: "bg-emerald-50 text-emerald-600",
  },
  {
    icone: ShieldCheck,
    titulo: "Compra Segura",
    desc: "Seus dados protegidos com criptografia de ponta",
    cor: "bg-purple-50 text-purple-600",
  },
  {
    icone: Headphones,
    titulo: "Suporte Humano",
    desc: "Atendimento real via WhatsApp em horario comercial",
    cor: "bg-amber-50 text-amber-600",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 noise-bg">
        {/* Esferas decorativas */}
        <div className="absolute top-[-120px] right-[-80px] h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] h-[300px] w-[300px] rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8 lg:pt-32 lg:pb-36">
          <div className="text-center">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              Novidades toda semana
            </div>

            {/* Titulo principal */}
            <h1
              className="animate-fade-in-up delay-100 mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl"
              style={{ fontFamily: "Sora, sans-serif", opacity: 0 }}
            >
              Tudo o que voce
              <br />
              <span className="text-gradient">precisa esta aqui</span>
            </h1>

            {/* Subtitulo */}
            <p
              className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
              style={{ opacity: 0 }}
            >
              Produtos de qualidade com os melhores precos.
              <br className="hidden sm:block" />
              Pague com PIX e receba rapido na sua casa.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-in-up delay-300 mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
              style={{ opacity: 0 }}
            >
              <Link
                href="/produtos"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98] min-h-[44px]"
              >
                Ver Produtos
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/produtos?categoria=promocoes"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25 active:scale-[0.98] min-h-[44px]"
              >
                <Star size={18} />
                Ofertas do Dia
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="animate-fade-in-up delay-500 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-blue-400 to-indigo-500"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  <strong className="text-white">2.500+</strong> clientes satisfeitos
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-sm text-slate-400 ml-1">
                  <strong className="text-white">4.9</strong>/5 avaliacoes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Onda decorativa no bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path
              d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 36.7 768 43.3 864 45C960 46.7 1056 43.3 1152 38.3C1248 33.3 1344 26.7 1392 23.3L1440 20V60H0Z"
              fill="#fafafa"
            />
          </svg>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="relative z-10 -mt-1 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {beneficios.map((b, i) => (
              <div
                key={b.titulo}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 sm:p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${b.cor} transition-transform group-hover:scale-110`}>
                  <b.icone size={22} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 sm:text-base" style={{ fontFamily: "Sora, sans-serif" }}>
                  {b.titulo}
                </h3>
                <p className="hidden text-xs leading-relaxed text-gray-500 sm:block">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIAS ===== */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Categorias
              </h2>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Encontre exatamente o que procura
              </p>
            </div>
            <Link
              href="/produtos"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {categorias.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl bg-white p-5 sm:p-6 text-center border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent"
              >
                {/* Gradiente de fundo no hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.cor} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]`} />

                <span className="relative text-4xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  {cat.icone}
                </span>
                <span className="relative text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  {cat.nome}
                </span>
              </Link>
            ))}
          </div>

          {/* Link mobile */}
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
            >
              Ver todas as categorias <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRODUTOS EM DESTAQUE ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Produtos em Destaque
              </h2>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Os mais queridos pelos nossos clientes
              </p>
            </div>
            <Link
              href="/produtos"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>

          {/* Placeholder - sera conectado ao Supabase */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-3 sm:p-4 transition-all hover:shadow-md hover:-translate-y-1"
              >
                {/* Imagem placeholder */}
                <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center overflow-hidden">
                  <Package size={40} className="text-gray-300" />
                </div>
                {/* Info placeholder */}
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-3/4 rounded-lg bg-gray-200" />
                  <div className="h-3 w-1/2 rounded-lg bg-gray-200" />
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-5 w-20 rounded-lg bg-blue-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Cadastre produtos pelo painel admin para ve-los aqui
            </p>
          </div>
        </div>
      </section>

      {/* ===== BANNER CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 noise-bg">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <h2
            className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Pronto para encontrar o que precisa?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-blue-100">
            Navegue por centenas de produtos com os melhores precos e pague facilmente via PIX.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl active:scale-[0.98] min-h-[44px]"
            >
              Explorar Loja
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
