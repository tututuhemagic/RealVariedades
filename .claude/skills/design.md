---
name: design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
user_invocable: true
arguments:
  - name: descricao
    description: O que precisa ser desenhado ou criado
    required: true
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

## Contexto do Projeto: RealVariedades

Este e um e-commerce de loja de variedades. Stack: Next.js 15, TypeScript, Tailwind CSS, Supabase, lucide-react.

### Mobile-First (OBRIGATORIO)
- Base CSS sempre para telas de 375px
- Breakpoints progressivos: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Touch targets minimo 44x44px em botoes, links e elementos interativos
- Inputs com `text-base` (16px) para evitar zoom no iOS
- Botoes `w-full` no mobile, tamanho normal em telas maiores

### Paleta de Cores - RealVariedades
- **Primaria:** #068c22 (verde) / #057a1e (escuro) / #07a328 (claro)
- **Secundaria:** #2ab84a (verde claro) / #045a16 (verde escuro)
- **Sucesso:** emerald-500 (#10B981)
- **Alerta:** amber-500 (#F59E0B)
- **Erro:** red-500 (#EF4444)
- **Fundo:** white / gray-50
- **Texto:** gray-900 (titulos), gray-600 (corpo), gray-400 (placeholder)

### Padroes de E-commerce
- Precos sempre formatados: `R$ 99,90`
- Badges de desconto: porcentagem ou "Oferta"
- Estrelas de avaliacao (1-5)
- Galeria de imagens com thumbnails
- Selector de variantes (cor com swatch, tamanho com botoes)
- Breadcrumb navigation

### Estrutura do Codigo
- TypeScript com tipagem correta
- Server Components por padrao, `'use client'` so quando necessario
- Importar tipos de `@/types`
- Importar icones de `lucide-react`
- Comentarios em portugues

## Ao receber a solicitacao

1. Analise o que foi pedido em `$ARGUMENTS`
2. Pense no Design Thinking: proposito, tom, diferenciais
3. Pense no layout mobile primeiro
4. Crie o componente/pagina com codigo production-grade
5. Adicione micro-interacoes, animacoes e detalhes visuais marcantes
6. Garanta acessibilidade e performance
7. Teste mentalmente em 375px, 768px e 1280px
