-- Politicas temporarias para desenvolvimento do painel admin
-- REMOVER EM PRODUCAO e substituir por politicas baseadas em role admin
-- Estas politicas permitem que o usuario anonimo (anon) faca CRUD completo
-- nas tabelas de admin. Em producao, restringir para usuarios autenticados com role 'admin'.

-- Categorias: permitir todas as operacoes para anon
CREATE POLICY "categorias_anon_all" ON categorias
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

-- Produtos: permitir todas as operacoes para anon
CREATE POLICY "produtos_anon_all" ON produtos
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

-- Variantes de produto: permitir todas as operacoes para anon
CREATE POLICY "variantes_produto_anon_all" ON variantes_produto
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);
