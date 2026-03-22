-- ============================================================
-- Real Variedades - Schema Supabase
-- ============================================================

-- Extensoes
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABELAS
-- ============================================================

-- CATEGORIAS
CREATE TABLE categorias (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        TEXT        NOT NULL,
  slug        TEXT        UNIQUE NOT NULL,
  descricao   TEXT,
  imagem_url  TEXT,
  ativo       BOOLEAN     DEFAULT TRUE,
  ordem       INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- PRODUTOS
CREATE TABLE produtos (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              TEXT          NOT NULL,
  slug              TEXT          UNIQUE NOT NULL,
  descricao         TEXT,
  preco             NUMERIC(10,2) NOT NULL,
  preco_promocional NUMERIC(10,2),
  categoria_id      UUID          REFERENCES categorias(id) ON DELETE SET NULL,
  estoque_total     INTEGER       DEFAULT 0,
  ativo             BOOLEAN       DEFAULT TRUE,
  destaque          BOOLEAN       DEFAULT FALSE,
  imagens           JSONB         DEFAULT '[]'::jsonb,
  created_at        TIMESTAMPTZ   DEFAULT now(),
  updated_at        TIMESTAMPTZ   DEFAULT now()
);

-- VARIANTES DE PRODUTO
CREATE TABLE variantes_produto (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id      UUID          NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  nome            TEXT          NOT NULL,
  tipo            TEXT          NOT NULL CHECK (tipo IN ('cor', 'tamanho', 'outro')),
  valor           TEXT          NOT NULL,
  estoque         INTEGER       DEFAULT 0,
  preco_adicional NUMERIC(10,2) DEFAULT 0,
  sku             TEXT,
  ativo           BOOLEAN       DEFAULT TRUE
);

-- USUARIOS
CREATE TABLE usuarios (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome       TEXT,
  email      TEXT,
  telefone   TEXT,
  cpf        TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ENDERECOS
CREATE TABLE enderecos (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id   UUID    NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  cep          TEXT    NOT NULL,
  rua          TEXT    NOT NULL,
  numero       TEXT    NOT NULL,
  complemento  TEXT,
  bairro       TEXT    NOT NULL,
  cidade       TEXT    NOT NULL,
  estado       TEXT    NOT NULL CHECK (char_length(estado) = 2),
  principal    BOOLEAN DEFAULT FALSE
);

-- PEDIDOS
CREATE TABLE pedidos (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id        UUID          REFERENCES usuarios(id) ON DELETE SET NULL,
  status            TEXT          DEFAULT 'pendente' CHECK (status IN ('pendente','pago','separando','enviado','entregue','cancelado')),
  total             NUMERIC(10,2) NOT NULL,
  subtotal          NUMERIC(10,2) NOT NULL,
  frete             NUMERIC(10,2) DEFAULT 0,
  nome_cliente      TEXT          NOT NULL,
  email_cliente     TEXT          NOT NULL,
  telefone_cliente  TEXT,
  endereco_entrega  JSONB,
  pix_txid          TEXT,
  pix_qrcode        TEXT,
  pix_copia_cola    TEXT,
  pix_expiracao     TIMESTAMPTZ,
  created_at        TIMESTAMPTZ   DEFAULT now(),
  updated_at        TIMESTAMPTZ   DEFAULT now()
);

-- ITENS DO PEDIDO
CREATE TABLE itens_pedido (
  id                 UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id          UUID          NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id         UUID          REFERENCES produtos(id) ON DELETE SET NULL,
  variante_id        UUID          REFERENCES variantes_produto(id) ON DELETE SET NULL,
  quantidade         INTEGER       NOT NULL CHECK (quantidade > 0),
  preco_unitario     NUMERIC(10,2) NOT NULL,
  subtotal           NUMERIC(10,2) NOT NULL,
  nome_produto       TEXT          NOT NULL,
  variante_descricao TEXT
);

-- AVALIACOES
CREATE TABLE avaliacoes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id  UUID        NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  usuario_id  UUID        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nota        INTEGER     NOT NULL CHECK (nota >= 1 AND nota <= 5),
  comentario  TEXT,
  aprovado    BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_categorias_slug        ON categorias(slug);
CREATE INDEX idx_produtos_slug          ON produtos(slug);
CREATE INDEX idx_produtos_categoria_id  ON produtos(categoria_id);
CREATE INDEX idx_pedidos_usuario_id     ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_status         ON pedidos(status);
CREATE INDEX idx_variantes_produto_id   ON variantes_produto(produto_id);
CREATE INDEX idx_enderecos_usuario_id   ON enderecos(usuario_id);
CREATE INDEX idx_itens_pedido_pedido_id ON itens_pedido(pedido_id);
CREATE INDEX idx_avaliacoes_produto_id  ON avaliacoes(produto_id);

-- ============================================================
-- FUNCAO E TRIGGER: updated_at automatico
-- ============================================================

CREATE OR REPLACE FUNCTION atualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_produtos_updated_at
  BEFORE UPDATE ON produtos
  FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();

CREATE TRIGGER trigger_pedidos_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW EXECUTE FUNCTION atualizar_updated_at();

-- ============================================================
-- FUNCAO E TRIGGER: criar usuario ao cadastrar em auth.users
-- ============================================================

CREATE OR REPLACE FUNCTION criar_usuario_ao_registrar()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, created_at)
  VALUES (NEW.id, NEW.email, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_criar_usuario
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION criar_usuario_ao_registrar();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE categorias        ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE variantes_produto ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios          ENABLE ROW LEVEL SECURITY;
ALTER TABLE enderecos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido      ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes        ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CATEGORIAS
-- ============================================================

CREATE POLICY "categorias_select_publico"
  ON categorias FOR SELECT
  USING (ativo = TRUE);

CREATE POLICY "categorias_admin_all"
  ON categorias FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- PRODUTOS
-- ============================================================

CREATE POLICY "produtos_select_publico"
  ON produtos FOR SELECT
  USING (ativo = TRUE);

CREATE POLICY "produtos_admin_all"
  ON produtos FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- VARIANTES_PRODUTO
-- ============================================================

CREATE POLICY "variantes_select_publico"
  ON variantes_produto FOR SELECT
  USING (TRUE);

CREATE POLICY "variantes_admin_all"
  ON variantes_produto FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- USUARIOS
-- ============================================================

CREATE POLICY "usuarios_select_proprio"
  ON usuarios FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "usuarios_update_proprio"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "usuarios_admin_all"
  ON usuarios FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- ENDERECOS
-- ============================================================

CREATE POLICY "enderecos_select_proprio"
  ON enderecos FOR SELECT
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "enderecos_insert_proprio"
  ON enderecos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "enderecos_update_proprio"
  ON enderecos FOR UPDATE
  TO authenticated
  USING (auth.uid() = usuario_id)
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "enderecos_delete_proprio"
  ON enderecos FOR DELETE
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "enderecos_admin_all"
  ON enderecos FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- PEDIDOS
-- ============================================================

CREATE POLICY "pedidos_select_proprio"
  ON pedidos FOR SELECT
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "pedidos_insert_autenticado"
  ON pedidos FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "pedidos_admin_all"
  ON pedidos FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- ITENS_PEDIDO
-- ============================================================

CREATE POLICY "itens_pedido_select_proprio"
  ON itens_pedido FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pedidos
      WHERE pedidos.id = itens_pedido.pedido_id
        AND pedidos.usuario_id = auth.uid()
    )
  );

CREATE POLICY "itens_pedido_admin_all"
  ON itens_pedido FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- AVALIACOES
-- ============================================================

CREATE POLICY "avaliacoes_select_publico"
  ON avaliacoes FOR SELECT
  USING (aprovado = TRUE);

CREATE POLICY "avaliacoes_insert_autenticado"
  ON avaliacoes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "avaliacoes_update_proprio"
  ON avaliacoes FOR UPDATE
  TO authenticated
  USING (auth.uid() = usuario_id)
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "avaliacoes_delete_proprio"
  ON avaliacoes FOR DELETE
  TO authenticated
  USING (auth.uid() = usuario_id);

CREATE POLICY "avaliacoes_admin_all"
  ON avaliacoes FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);
