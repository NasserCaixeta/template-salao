# DESIGN SYSTEM — MAISON AURÉA

## 1. Conceito

Uma experiência digital de luxo editorial para salão de beleza. A página deve parecer uma narrativa de moda e beleza, não um template comercial. O design combina a sofisticação de uma revista, o ritmo de um filme de campanha e a clareza de uma página de conversão.

Referência estrutural: PieterKoopt® — uso de storytelling, contraste entre serif e sans, conteúdo em grandes blocos, mídia em tela cheia, navegação minimalista, sequência sticky e deslocamento horizontal.

## 2. Personalidade

- Refinada, contemporânea e acolhedora.
- Luxo silencioso: poucos elementos, materiais visuais ricos e muito espaço.
- Técnica sem parecer clínica.
- Feminina sem recorrer a rosa, ornamentos óbvios ou símbolos genéricos de beleza.

## 3. Paleta

- Ivory `#F6F1E8`: fundo principal.
- Paper `#FBF8F3`: superfícies claras.
- Champagne `#E6D8C3`: áreas de transição.
- Gold `#B58A48`: cor de ação e assinatura.
- Gold Light `#D3B176`: destaques sobre fundos escuros.
- Bronze `#70512D`: texto editorial e profundidade.
- Ink `#1C1814`: fundo escuro e texto principal.

O dourado é fosco e terroso. Evitar amarelo metálico saturado e gradientes brilhantes de “luxo genérico”.

## 4. Tipografia

### Display
Cormorant Garamond, pesos 400–600, com itálico para frases emocionais. Tracking negativo em títulos grandes.

### Interface
Manrope, pesos 400–600, em caixa alta e tracking amplo para navegação, legendas, números e índices.

### Escala desktop
- Hero: 64–150 px.
- Heading de seção: 52–112 px.
- Subtítulo editorial: 36–72 px.
- Corpo: 11–14 px com line-height de 1.65–1.85.
- Metadados: 9–10 px em caixa alta.

## 5. Estrutura da home

### 5.1 Entrada cinematográfica
- Tela escura em fullscreen.
- Monograma central e título em serif.
- Escolha “com som” ou “sem som”.
- Fechamento por clip-path vertical.
- Escala da mídia do hero durante a transição.

### 5.2 Hero
- Fotografia fullscreen com tratamento quente e camada escura.
- Cabeçalho transparente.
- Metadados nas extremidades superiores.
- Headline de duas linhas em serif grande.
- CTA circular.
- Parallax suave e redução de opacidade ao sair da seção.

### 5.3 Manifesto
- Grid assimétrico: título grande à esquerda e texto estreito à direita.
- Retrato vertical com legenda editorial.
- Citação serifada em bronze.

### 5.4 Princípios
- Fundo dourado fosco.
- Marquee contínuo.
- Três benefícios em colunas, separados por linhas finas.

### 5.5 Serviços em scroll horizontal
- Quatro cartões grandes ocupando 70–85% da viewport.
- Imagem dominante e bloco de texto lateral.
- A seção fixa enquanto os cartões se movem horizontalmente.
- Em mobile, os cartões retornam a uma lista vertical.

### 5.6 Método sticky
- Altura total de 300vh.
- Viewport dividida em imagem e conteúdo.
- Imagem permanece fixa e troca em três estágios.
- Passo ativo muda com o progresso do scroll.
- Contador 01/03 sincronizado.

### 5.7 História real
- Fotografia vertical.
- Depoimento grande em itálico.
- Assinatura e contexto em microtipografia.

### 5.8 CTA final
- Fundo quase preto.
- Esfera dourada abstrata com movimento lento.
- Título em escala de campanha.
- Botão pill para WhatsApp.

### 5.9 Footer
- Logotipo tipográfico muito grande.
- Links organizados em três colunas.
- Linha final com copyright, localização e retorno ao topo.

## 6. Motion design

- Easing principal: `cubic-bezier(.22, 1, .36, 1)`.
- Revelação de títulos palavra por palavra, partindo de `translateY(110%)`.
- Clip-path vertical em imagens e transições de entrada.
- Parallax de 8%–18%, nunca agressivo.
- Hover magnético em botões e marca.
- Cursor circular customizado apenas em dispositivos com mouse.
- Cabeçalho é ocultado ao rolar para baixo e reaparece ao subir.
- Marquee com velocidade constante.
- Respeitar `prefers-reduced-motion`.

## 7. Fotografia

- Composição editorial, luz natural ou luz suave de estúdio.
- Tons de pele e cabelo preservados.
- Interiores claros com madeira clara, pedra, bronze e tecidos crus.
- Evitar fotografias de banco excessivamente sorridentes ou poses comerciais.
- Combinar detalhes de cabelo, mãos em processo, retratos e arquitetura do salão.

## 8. Conversão

A sofisticação não deve esconder a ação principal. “Agendar horário” permanece no header, aparece no hero e volta como CTA final. O WhatsApp deve abrir com mensagem previamente preenchida e permitir encaminhamento para o profissional correto.
