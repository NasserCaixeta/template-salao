# Maison Auréa — Especificação de design aprovada

**Data:** 1 de agosto de 2026  
**Status:** direção visual e arquitetura de movimento aprovadas  
**Entrega:** landing page conceitual em React + Vite

## 1. Objetivo

Criar uma apresentação digital cinematográfica para um salão conceitual chamado Maison Auréa. A página deve comunicar luxo silencioso, precisão técnica e atendimento individual, preservando a identidade branca e dourada do material inicial.

A experiência terá como referência estrutural o site PieterKoopt: mídia em tela cheia, navegação persistente, grandes blocos editoriais, seções presas ao scroll e cartões que entram e se sobrepõem. Não será uma cópia de marca ou conteúdo; a linguagem de movimento será reinterpretada para o universo de cabelo e beleza.

## 2. Princípios aprovados

- Aparência de campanha editorial, não de template comercial.
- Uma única landing page narrativa e cinematográfica.
- Fotografia e vídeo devem mostrar inequivocamente salão, cabelo, profissionais e atendimento.
- Hero com mídia ocupando toda a área útil, sem imagem pequena ou contida.
- Dourado fosco, champagne, branco quente e preto levemente esverdeado.
- Tipografia de contraste: grotesca limpa para interface e títulos principais; serifada editorial em itálico para ênfase.
- Movimento funcional: cada animação indica progressão, troca de cena ou hierarquia.
- Conversão clara para WhatsApp no header, hero e fechamento.

## 3. Tipografia

A família proprietária da referência não será copiada sem licença. O produto usará equivalentes licenciáveis com proporções próximas:

- **Sans principal:** `DM Sans` ou equivalente grotesca aprovada na implementação, pesos 300–500.
- **Serif editorial:** `Italiana` ou equivalente de alto contraste, usada principalmente em itálicos e frases emocionais.
- Títulos sans com tracking negativo e line-height compacto.
- Navegação, índices e metadados em caixa alta, pequenos e espaçados.
- Textos corridos em sans leve, com largura limitada para leitura.

Não usar Cormorant Garamond como fonte dominante, pois sua personalidade se distancia da referência aprovada.

## 4. Paleta e materiais

- `Ink` — `#151917`: fundo principal escuro.
- `Ivory` — `#F2EEE5`: texto e superfícies claras.
- `Champagne` — `#D6C39C`: ênfase editorial.
- `Aged Gold` — `#A98A51`: índices, detalhes e assinatura.
- `Olive Gold` — `#858C68`: grandes painéis de transição.
- Linhas claras com baixa opacidade, entre 20% e 32%.

O acabamento deve parecer mineral, fosco e natural. Evitar gradientes metálicos brilhantes, sombras pesadas, rosa e ornamentos genéricos de beleza.

## 5. Header

O header permanece visível durante a narrativa e segue a geometria observada na referência:

- Caixa fina com borda de 1 px, cantos discretamente arredondados e fundo escuro translúcido.
- Desktop dividido em três áreas: marca à esquerda, navegação central e CTA à direita.
- Links centrais: Serviços, Método e Histórias.
- CTA principal: “Agendar”, apontando para WhatsApp.
- Hover dos links com troca vertical/rolagem do texto.
- Hover do CTA movimenta a seta dentro do botão.
- Ao sair do topo, a margem externa é reduzida e o header assume estado compacto, sem desaparecer.
- Sem controle de som, ícone de WhatsApp isolado ou monograma “W”.
- Mobile: marca, CTA compacto e botão de menu; o menu abre uma camada própria.

## 6. Arquitetura da página e movimento

### 6.1 Abertura automática

- A página inicia escura e revela a marca e o hero automaticamente.
- A transição usa máscara/clip vertical e mudança controlada de opacidade.
- Não há modal, escolha “com som/sem som” nem reprodução de áudio.
- Com `prefers-reduced-motion`, a abertura é substituída por um fade curto.

### 6.2 Hero em tela inteira

- Vídeo local e licenciado de um salão premium cobrindo integralmente a moldura.
- Fallback de imagem editorial também relacionado a salão.
- Headline permanece ancorada na parte inferior esquerda.
- O vídeo troca de enquadramentos por cortes, sem zoom genérico contínuo.
- Header fica sobre a mídia; moldura externa fina permanece perceptível.
- Ao rolar, o próximo painel sobe com cantos arredondados enquanto o hero perde espaço.

### 6.3 Serviços em pilha

- Um painel champagne/oliva fica preso durante vários trechos de scroll.
- Manifesto curto permanece fixo à esquerda no desktop.
- Quatro cartões entram de baixo, com pequenas rotações alternadas, e se sobrepõem progressivamente:
  1. Cortes autorais.
  2. Cor e iluminação.
  3. Tratamentos.
  4. Noivas e eventos.
- Cada cartão combina título, descrição curta e mídia de salão coerente com o serviço.
- As rotações são contidas; o foco é sensação física de cartões, não efeito lúdico.

### 6.4 Método por etapas

- Seção escura introduzida por título grande e texto breve.
- Três cartões amplos entram pelo rodapé e ficam presos em sequência, cobrindo parcialmente o anterior:
  1. Escuta e diagnóstico.
  2. Criação sob medida.
  3. Finalização e continuidade.
- Desktop: texto e número à esquerda, vídeo ou fotografia à direita.
- A chegada do cartão seguinte é dirigida pelo progresso do scroll, sem autoplay independente.

### 6.5 História em tela cheia

- Resultado real, transformação ou depoimento ocupa o viewport em mídia full-bleed com cantos arredondados.
- Headline editorial à esquerda; depoimento, contexto e CTA à direita.
- A mídia escurece progressivamente na saída e se mistura ao fundo do encerramento.
- Não usar imagens abstratas ou cenas desconectadas de um salão.

### 6.6 CTA final e rodapé

- Fundo escuro contínuo, sem esfera dourada decorativa.
- Headline de campanha, texto curto e botão para agendamento via WhatsApp.
- Rodapé com navegação grande, endereço conceitual, horários e redes sociais.
- O header permanece funcional até o fim da página.

## 7. Comportamento responsivo

O mobile recebe direção própria, baseada na adaptação observada na referência:

- Header reduzido a marca, CTA compacto e menu.
- Hero continua full-screen, com enquadramento vertical específico.
- Cartões de serviços deixam de girar e sobrepor; tornam-se uma lista vertical grande e legível.
- Cartões do método tornam-se verticais, com mídia primeiro e texto abaixo; entram em sequência com sobreposição leve quando houver espaço suficiente.
- A história continua visualmente dominante em tela cheia.
- Tipografia é redimensionada preservando quebras editoriais intencionais.
- Nenhuma interação depende de hover em telas de toque.

## 8. Fotografia e vídeo

- Priorizar material licenciado de Pexels ou Unsplash e armazená-lo localmente no projeto quando a licença permitir.
- Hero: plano aberto de salão real, com profissional trabalhando e arquitetura visível.
- Serviços: corte em execução, coloração/iluminação, aplicação de tratamento e penteado de evento.
- Método: mãos, diagnóstico de textura, preparação e finalização.
- História: cliente e resultado final em composição editorial.
- Direção de cor quente e natural, preservando tons de pele e cabelo.
- Evitar retratos genéricos, moda sem contexto, objetos aleatórios e fotos excessivamente posadas.

## 9. Implementação técnica

- React + Vite, mantendo o repositório atual.
- Componentes separados por seção e componentes reutilizáveis para header, cartões e CTAs.
- CSS responsivo com custom properties para cor, espaçamento e tipografia.
- Movimento dirigido por scroll com GSAP + ScrollTrigger, ou solução equivalente definida no plano de implementação.
- Mídias locais otimizadas, poster para vídeo e carregamento adiado fora do primeiro viewport.
- Links internos com navegação suave e WhatsApp com mensagem pré-preenchida.
- Nenhum sistema de áudio será incluído.

## 10. Acessibilidade e desempenho

- Respeitar `prefers-reduced-motion` em todas as sequências.
- Vídeos sem áudio, com `playsInline`, poster e fallback estático.
- Contraste mínimo adequado entre texto e superfícies.
- Foco de teclado visível e menu mobile operável por teclado.
- Elementos decorativos fora da árvore de acessibilidade.
- Otimizar imagens por tamanho de viewport e evitar layout shift.
- Não bloquear o primeiro conteúdo esperando scripts de animação.

## 11. Critérios de validação

A entrega será considerada fiel quando:

- O hero ocupar realmente a tela e usar mídia inequivocamente ligada a salão.
- O header apresentar a mesma lógica estrutural, compactação e microinterações da referência, adaptada à Maison Auréa.
- Os serviços formarem uma pilha sticky progressiva no desktop.
- O método formar uma segunda sequência de cartões sticky.
- As transições entre hero, painel claro, seção escura, história e footer forem contínuas.
- Desktop e mobile forem avaliados separadamente.
- O modo de movimento reduzido preservar todo o conteúdo e a navegação.
- Não existirem áudio, controle de som, “W” isolado ou conteúdo sem relação com salão.

## 12. Fora de escopo

- Sistema real de reservas, pagamentos ou área administrativa.
- Catálogo completo de profissionais e preços.
- Reprodução de áudio.
- Cópia literal de marca, textos, imagens ou código do PieterKoopt.

