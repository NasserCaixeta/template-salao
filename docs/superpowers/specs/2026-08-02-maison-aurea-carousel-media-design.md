# Maison Auréa — direção de mídia do carrossel

**Data:** 2026-08-02  
**Status:** aprovado no Brainstorm

## Objetivo

Atualizar as quatro mídias do carrossel de serviços para comunicar resultados de cabelo com uma linguagem editorial, cinematográfica e coerente com a identidade dourada, branca e taupe da Maison Auréa.

O hero atual não faz parte desta alteração. Sua primeira imagem continua preservada, em tela cheia, com as animações já existentes.

## Decisão visual aprovada

O carrossel terá exatamente esta sequência:

1. Foto — modelo com corte curto, refletida em uma estação de salão.
2. Vídeo — cabelo loiro longo sendo exibido em movimento dentro do salão.
3. Foto — outra modelo com ondas longas diante de um espelho profissional.
4. Foto — outra modelo com cachos curtos dentro do salão.

“Mesmo modelo” significa o mesmo modelo visual de card: dimensões, tratamento, tipografia, sobreposição e movimento consistentes. Não significa repetir a mesma pessoa. As quatro posições devem mostrar pessoas ou resultados diferentes.

## Fontes de mídia

### Posição 01 — corte editorial

- Página: https://www.pexels.com/photo/crop-attentive-woman-reflecting-in-mirror-of-hairdressing-salon-5368630/
- Imagem: `https://images.pexels.com/photos/5368630/pexels-photo-5368630.jpeg`
- Contexto visível: espelho, bancada, produtos e estação profissional.

### Posição 02 — vídeo obrigatório

- Página: https://www.pexels.com/video/blonde-woman-showcasing-silky-long-hair-36707549/
- Identificador Pexels: `36707549`
- Poster: `https://images.pexels.com/videos/36707549/pexels-photo-36707549.jpeg`
- Comportamento: autoplay mudo, `playsInline`, loop curto, poster local e fallback estático.
- Contexto visível: interior de salão; cabelo finalizado ocupa a maior parte do quadro.

### Posição 03 — cor e dimensão

- Página: https://www.pexels.com/photo/stylish-woman-posing-in-salon-interior-36784894/
- Imagem: `https://images.pexels.com/photos/36784894/pexels-photo-36784894.jpeg`
- Contexto visível: espelho e interior profissional do salão.

### Posição 04 — textura e forma

- Página: https://www.pexels.com/photo/woman-in-white-and-black-polka-dot-shirt-and-blue-denim-jeans-smiling-7755651/
- Imagem: `https://images.pexels.com/photos/7755651/pexels-photo-7755651.jpeg`
- Contexto visível: cadeira, profissional e interior do salão.

## Regras de composição

- Toda mídia precisa remeter inequivocamente a um salão.
- Fotos de estúdio, quartos, ambientes domésticos ou externas são proibidas.
- O cabelo finalizado é o protagonista; o salão funciona como contexto.
- Cada card mostra uma pessoa e um resultado diferentes.
- A ordem foto → vídeo → foto → foto é fixa.
- O vídeo ocupa obrigatoriamente a segunda posição.
- O tratamento de cor será quente e levemente dessaturado para integrar as mídias ao taupe mineral `#A99A83`, dourado e marfim.
- O recorte deve preservar cabelo e rosto sem distorção, com `object-fit: cover` e posição ajustada por mídia.

## Movimento e acessibilidade

- O vídeo inicia automaticamente apenas quando permitido pelo navegador, sempre sem áudio.
- Não haverá controle de som nem elemento decorativo relacionado a áudio.
- Com `prefers-reduced-motion: reduce`, o poster substitui o movimento automático.
- O vídeo deve pausar quando estiver fora da área visível, evitando consumo desnecessário.
- Todas as mídias terão texto alternativo descritivo.
- A sobreposição deve manter contraste legível em todas as imagens.

## Armazenamento e desempenho

- Fotos, poster e vídeo serão salvos em `public/media`; o site não dependerá de URLs remotas em produção.
- As fotos devem ser redimensionadas e comprimidas para o maior tamanho realmente exibido.
- O poster deve carregar antes do vídeo.
- A mídia não deve causar mudança de layout durante o carregamento.

## Critérios de aceitação

- O hero continua visualmente e funcionalmente inalterado.
- O carrossel exibe quatro resultados distintos na ordem aprovada.
- O segundo card contém o vídeo e nenhum outro card contém vídeo.
- Todas as quatro cenas têm elementos reconhecíveis de salão.
- Nenhuma pessoa ou sessão fotográfica é repetida entre os cards.
- O vídeo funciona sem áudio, em loop e com poster/fallback.
- A experiência respeita redução de movimento.
- Testes unitários, testes de navegador e build continuam passando.

