# 竜門 RYŪMON: Escopo do novo perfil GitHub

> **Codinome:** RYŪMON (竜門, "Portão do Dragão")
> **Dono:** Gustavo Hudson · CTO
> **Repositório:** `GustavoHuds/gustavohuds`
> **Versão do escopo:** 1.0 · 2026-10-26
> **Status:** 🟢 Fases 1 e 3 em andamento · ver o [registro de progresso](#registro-de-progresso)

### Registro de progresso

| Data | Entrega |
|---|---|
| 2026-10-26 | Pipeline de build (`npm run build`), fontes embutidas, validação (`npm run validate`) |
| 2026-10-26 | Hero com onda **provisória** em código, divisor, botões, 4 kamon (em código, o asset F virou opcional), prancha da stack, rodapé |
| 2026-10-26 | README reestruturado; mapa GeoJSON com as 8 lojas + distribuidora; prancha de surf 3D gerada em código (`build/surfboard.mjs`) |
| 2026-10-27 | Imagens A–F vetorizadas (`npm run vectorize`): onda no hero, dragão no rodapé, kamon da IA, montanha no Off-duty, nuvens no painel. Mapa GeoJSON e prancha 3D **removidos** do README |
| 2026-10-27 | Telemetria **no próprio VPS** (`live/`): serviço Docker que lê o `/metrics` do Uptime Kuma pela rede interna e serve `/telemetry.svg`; substitui o Worker do Cloudflare (§11). Instalação: `live/README.md` |
| 2026-10-27 | Activity em seigaiha (`build/activity.mjs` + Action diária no branch `output`), no lugar do ghchart. CI de validação (`validate.yml`) |
| 2026-10-27 | Revisão sênior do README: menos emoji e repetição, sem "For AI agents" nem índice de palavras-chave, crédito honesto da arte (IA + pipeline), monogramas no lugar dos glifos genéricos da stack |
| — | Aguardando: deploy no VPS + domínio do painel (`npm run telemetry -- https://…`), marcos da carreira (Route, usa a carpa C), revisão nativa do japonês |

**Decisões tomadas:** stack curada com ~30 itens só de produção (Go entra no Core; Java vai para o índice); ERP com glifo neutro; carimbo em katakana グスタボ (pendente revisão nativa); a seção Route entra quando os marcos chegarem, e a numeração das seções é ajustada nessa hora.

---

## Sumário

1. [Visão em uma frase](#1-visão-em-uma-frase)
2. [Objetivos, não-objetivos e critérios de sucesso](#2-objetivos-não-objetivos-e-critérios-de-sucesso)
3. [Quem é o Gustavo (o retrato que o README precisa passar)](#3-quem-é-o-gustavo-o-retrato-que-o-readme-precisa-passar)
4. [O conceito](#4-o-conceito)
5. [Design system](#5-design-system)
6. [Arquitetura da informação (o README seção por seção)](#6-arquitetura-da-informação-o-readme-seção-por-seção)
7. [Inventário de assets](#7-inventário-de-assets)
8. [Prompts para a IA de imagem](#8-prompts-para-a-ia-de-imagem)
9. [Pipeline: imagem gerada → SVG animado](#9-pipeline-imagem-gerada--svg-animado)
10. [Arquitetura técnica](#10-arquitetura-técnica)
11. [Serviço ao vivo (Cloudflare Worker)](#11-serviço-ao-vivo-cloudflare-worker)
12. [O 3D: prancha de surf no README](#12-o-3d-prancha-de-surf-no-readme)
13. [Mapa GeoJSON](#13-mapa-geojson)
14. [Textos finais (copy deck)](#14-textos-finais-copy-deck)
15. [Orçamentos: desempenho, acessibilidade e compatibilidade](#15-orçamentos-desempenho-acessibilidade-e-compatibilidade)
16. [Roadmap por fases](#16-roadmap-por-fases)
17. [Decisões pendentes / insumos do Gustavo](#17-decisões-pendentes--insumos-do-gustavo)
18. [Riscos e mitigações](#18-riscos-e-mitigações)
19. [Ideias guardadas (fora do escopo, de propósito)](#19-ideias-guardadas-fora-do-escopo-de-propósito)
20. [Apêndice: referência técnica do que o GitHub permite](#20-apêndice-referência-técnica-do-que-o-github-permite)

---

## 1. Visão em uma frase

> **Um perfil em forma de gravura japonesa viva: a Grande Onda nasce no ponto mais oriental das Américas, uma carpa sobe a cachoeira e vira dragão, e por trás da arte tem telemetria real de sistemas em produção.**

Quem bater o olho tem que pensar, nesta ordem:

1. *"Uau, isso é diferente."* (estética)
2. *"Peraí, isso está ao vivo?"* (engenharia)
3. *"Esse cara é CTO e entrega coisa de verdade."* (conteúdo)

A arte chama a atenção. **A engenharia por trás dela é o argumento.** Qualquer um copia um cabeçalho bonito. Ninguém copia um perfil com backend próprio, dados de produção, mar em tempo real e um modelo 3D nativo.

---

## 2. Objetivos, não-objetivos e critérios de sucesso

### Objetivos

| # | Objetivo |
|---|---|
| O1 | Posicionar o Gustavo como **CTO multissetor** que entrega sistemas em produção (varejo é **um** setor, não a identidade) |
| O2 | Ser **memorável**: identidade visual própria, que ninguém mais tem |
| O3 | **Provar** competência técnica pelo próprio perfil: SVG artesanal, serviço ao vivo, pipeline de dados, segurança |
| O4 | Mostrar a **pessoa** (mar, trilha, estrada) sem virar bagunça |
| O5 | Seguir legível, rápido e acessível em qualquer tela e tema |

### Não-objetivos

- ❌ Não é um portfólio de arte. A arte serve ao conteúdo.
- ❌ Não vai empilhar widgets genéricos (streak, trophies, stats cards de terceiros).
- ❌ Não vai inflar métrica (commits falsos, números sem fonte).
- ❌ Não vai expor nada de infraestrutura (hostnames, IPs, rotas, versões).

### Critérios de sucesso (mensuráveis)

| Critério | Meta |
|---|---|
| **Teste dos 10 segundos:** um recrutador sabe cargo, especialidade e contato sem rolar a página | ✅ obrigatório |
| Peso total das imagens do perfil (primeira carga) | **≤ 1,5 MB** |
| Animação de abertura do cabeçalho | **≤ 5 s** e depois para (só micro-loops leves) |
| Funciona com `prefers-reduced-motion` | Mostra o quadro final, sem animação |
| Temas claro e escuro | Cada peça tem versão própria e **nenhuma** fica ilegível |
| Mobile (360 px de largura) | Nenhum texto essencial fica preso dentro de SVG (ver [§15](#15-orçamentos-desempenho-acessibilidade-e-compatibilidade)) |
| Serviço ao vivo fora do ar | O README continua inteiro: só a faixa ao vivo mostra "sem sinal" |

---

## 3. Quem é o Gustavo (o retrato que o README precisa passar)

**Arquétipo: o construtor-operador.** Não é o CTO que só desenha slide nem o dev que só fecha ticket. É quem acha o problema real do negócio, desenha a arquitetura, escreve o código, sobe pra produção e **fica de plantão no resultado**.

| Traço | Como aparece no perfil |
|---|---|
| **Dono de ponta a ponta** | Projetos descritos por *problema → sistema → resultado em produção* |
| **Pragmático, sem firula** | Texto curto e direto, números com fonte, zero buzzword vazia |
| **Ambicioso e visual** | A estética ukiyo-e/wabori, feita com capricho |
| **Acorda cedo, gosta do mar** | O sol nasce primeiro em João Pessoa; a faixa "Condições" mostra o mar real |
| **Gosta de chão, trilha e estrada** | Montanha e trilha no cenário; moto e estrada no "Off-duty" |
| **IA como sistema operacional do negócio** | O dragão (que comanda água, nuvem e tempestade) é o símbolo do CTO com IA |
| **Segurança e responsabilidade** | Telemetria por envio (nada exposto); o próprio escopo trata privacidade |
| **Curioso, gosta de coisa "a mais"** | Detalhes escondidos para quem cava: haiku, arte ASCII, seção para agentes de IA |

**Públicos, em ordem de prioridade:**

1. Fundadores e empresários com um problema de negócio, que podem contratar ou ser sócios.
2. Recrutadores e headhunters de cargos de liderança técnica.
3. Outros CTOs e devs seniores, que reconhecem o capricho técnico.

---

## 4. O conceito

### 4.1 Três camadas, cada uma com uma função

| Camada | Função | Regra |
|---|---|---|
| **Identidade** (conteúdo) | Dizer quem ele é | Sempre em Markdown/texto real, nunca preso dentro de imagem |
| **Linguagem visual** (estética) | Ser memorável | Ukiyo-e + wabori, com disciplina (ver princípios em [§5.1](#51-princípios)) |
| **Personalidade** (detalhes) | Ser humano | Aparece **dentro** da estética; só existe **uma** seção pessoal, e ela é recolhida |

**Proporção:** uns 80% trabalho e uns 20% pessoa.

### 4.2 Mapa de símbolos

| Elemento | Motivo | Onde aparece | Significado |
|---|---|---|---|
| 🌊 Surf | **A Grande Onda** + padrão **seigaiha** (青海波) | Cabeçalho, fundos, calendário de atividade | O mar como terreno que ele lê todo dia |
| ⛰️ Trilha | Montanha, pinheiros, faixas de névoa | Faixa "Condições", "About" | Subida, persistência, ar livre |
| ☀️ João Pessoa | **Disco solar** (só o círculo, sem raios) | Cabeçalho | Ponto mais oriental das Américas: o sol nasce primeiro aqui |
| 🐟→🐉 Carreira | **Carpa sobe a cachoeira e vira dragão**: 登竜門 *tōryūmon* | Seção "Route" | Em japonês, *tōryūmon* virou sinônimo de "porta de entrada para o sucesso". É a lenda que dá nome ao projeto |
| 🐉 CTO + IA | **Dragão** (竜 *ryū*) | Route (grande, **uma vez**) e rodapé (pequeno) | No wabori, o dragão comanda água, nuvem e tempestade, ou seja, governa sistemas caóticos |
| ☁️ Estrutura | Nuvens **kumo** (雲) e linhas de vento | Divisores de seção, molduras | No wabori, o fundo de ondas, nuvens e vento é o que unifica a composição |
| 🏮 Setores | **Kamon** (家紋, brasões de família) | Cabeçalho de cada setor de projetos | Cada setor tem seu brasão: varejo, fintech, entretenimento, plataformas |
| 🔴 Assinatura | **Hanko** (判子, carimbo vermelho) | Fim do cabeçalho e rodapé | O artista assina a gravura |
| 🏍️ Estrada | Só em texto | "Off-duty" | Sem motivo clássico natural; forçar viraria bagunça |

### 4.3 O arco narrativo: um dia em João Pessoa

O README é lido de cima para baixo como **um dia**:

```
 ┌──────────────────────────────────────────────┐
 │  AMANHECER   Cabeçalho: o sol nasce sobre a   │  ← primeira impressão
 │              Grande Onda; o carimbo assina    │
 ├──────────────────────────────────────────────┤
 │  MANHÃ       Condições do mar (ao vivo)       │  ← "isso é ao vivo?"
 │              Telemetria (ao vivo)             │  ← "esse cara opera produção"
 ├──────────────────────────────────────────────┤
 │  DIA         About · Route (carpa → dragão)   │  ← quem é, de onde veio
 │              Trabalho por setor (kamon)       │  ← o que entrega
 │              Dandori · Kenshō · Kaizen        │  ← como entrega
 │              Stack · Atividade (seigaiha)     │
 ├──────────────────────────────────────────────┤
 │  ANOITECER   Off-duty (recolhido)             │  ← a pessoa
 │              Para agentes de IA (recolhido)   │  ← detalhe para curiosos
 ├──────────────────────────────────────────────┤
 │  NOITE       Rodapé: lua, dragão pequeno,     │  ← fechamento + CTA
 │              carimbo, chamada para contato    │
 └──────────────────────────────────────────────┘
```

Isso dá coerência sem precisar explicar nada: o visitante só **sente** que a página começa clara e termina noturna.

---

## 5. Design system

### 5.1 Princípios

Quatro princípios da estética japonesa, usados como **regras de projeto** (não como enfeite):

| Princípio | Significado | Regra prática |
|---|---|---|
| **間 Ma** | O espaço vazio é intencional | Cada peça tem pelo menos 30% de área "respirando". Seção sem arte é permitido, e é bom |
| **簡素 Kanso** | Simplicidade, eliminar o supérfluo | No máximo **um** motivo principal por peça. Se precisar explicar, sai |
| **渋い Shibui** | Elegância discreta | Vermelho só no carimbo. Animação lenta. Nada pisca rápido |
| **動き Ugoki** | Movimento com propósito | Animação só para **revelar** (abertura) ou **mostrar vida** (micro-loop). Nunca só para chamar atenção |

**Regra do japonês:** no máximo **um** termo japonês por seção, sempre com o significado em inglês ao lado. Kanji só se for **correto** e revisado.

### 5.2 Paleta (tokens)

| Token | Tema escuro | Tema claro | Nome tradicional | Uso |
|---|---|---|---|---|
| `--bg` | `#0B1A33` | `#F3EBDD` | 墨藍 sumi-ai / 和紙 washi | Fundo das peças |
| `--ink` | `#E8E1D3` | `#13213D` | — | Traço principal, texto em SVG |
| `--wave` | `#2B5BA8` | `#1E3A6E` | 紺 kon / azul da Prússia | Corpo das ondas, preenchimentos |
| `--accent` | `#2563EB` | `#2563EB` | — | **O azul atual do perfil** (continuidade da marca) |
| `--foam` | `#F3EBDD` | `#FFFFFF` | — | Espuma, nuvens, realces |
| `--mist` | `#1E3A6E` @ 40% | `#1E3A6E` @ 12% | 霞 kasumi | Névoa, seigaiha de fundo |
| `--shu` | `#D7263D` | `#B5122A` | 朱 shu | **Somente** carimbo e no máximo um detalhe por peça |
| `--kin` | `#C9A227` | `#A8841A` | 金 kin | Reservado (kintsugi, se for usado; ver [§19](#19-ideias-guardadas-fora-do-escopo-de-propósito)) |
| `--ok` / `--warn` / `--off` | `#3FB68B` / `#E0A43A` / `#6B7280` | iguais | — | LEDs da telemetria |

**Contraste:** texto dentro de SVG precisa de **≥ 4.5:1** contra `--bg` nos dois temas.

### 5.3 Tipografia (dentro dos SVGs)

O texto do Markdown usa a fonte do GitHub, que não dá para trocar. Dentro dos SVGs:

| Papel | Fonte | Licença | Uso |
|---|---|---|---|
| Títulos | **Shippori Mincho** (serifada, tem latim e japonês) | OFL (Google Fonts) | Nome no cabeçalho, títulos das peças, kanji |
| Dados | **JetBrains Mono** | OFL | Telemetria, condições, coordenadas |

**Como embutir:** reduzir a fonte só aos caracteres usados e embutir em base64 (`pyftsubset … --flavor=woff2`). Meta: **≤ 15 KB por fonte por peça**.

### 5.4 Biblioteca de motivos

| Motivo | Quem produz | Técnica |
|---|---|---|
| Grande Onda (cabeçalho) | **IA de imagem** → vetorização | Ver [§8](#8-prompts-para-a-ia-de-imagem) e [§9](#9-pipeline-imagem-gerada--svg-animado) |
| Dragão | **IA de imagem** → vetorização | idem |
| Carpa + cachoeira | **IA de imagem** → vetorização | idem |
| Nuvens kumo (6 variações) | **IA de imagem** → vetorização | idem |
| Montanha + pinheiros + névoa | **IA de imagem** → vetorização | idem |
| 4 kamon dos setores | **IA de imagem** → vetorização (+ ajuste geométrico manual) | idem |
| Seigaiha | **Claude, em código** | `<pattern>` SVG com arcos concêntricos |
| Linhas de vento, ondas pequenas, divisores | **Claude, em código** | `<path>` paramétrico |
| Sol, lua | **Claude, em código** | `<circle>` + máscara |
| Hanko (carimbo) | **Claude, em código** | Texto real + borda irregular (IA de imagem estraga letras) |
| Painéis (condições, telemetria) | **Claude, em código** | Geração no servidor |
| Botões de contato | **Claude, em código** | SVG estático |

### 5.5 Linguagem de animação

| Tipo | Duração | Curva | Exemplos |
|---|---|---|---|
| **Abertura (uma vez)** | total ≤ 5 s | `cubic-bezier(.65,0,.35,1)` | traço se desenhando, sol subindo, carimbo |
| **Carimbo** | 0,35 s | `cubic-bezier(.2,1.4,.4,1)` (leve impacto) | escala 1.15 → 1, opacidade 0 → 1 |
| **Micro-loop** | 8–60 s | `ease-in-out`, alternado | onda oscila 2 px, nuvem desliza, LED pulsa |
| **Limite** | no máximo **2 micro-loops por peça** | — | Mais que isso vira ruído |

**Regra obrigatória em todo SVG animado:**

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  .draw { stroke-dashoffset: 0 !important; }
  .reveal { opacity: 1 !important; }
}
```

**Técnica de "desenhar" o traço:** `pathLength="1"` + `stroke-dasharray: 1` + `stroke-dashoffset: 1 → 0`. Para formas vetorizadas a partir de imagem (que são preenchimentos, não traços), usar **revelação por máscara**: um traço grosso na máscara percorre a forma e vai revelando o desenho.

---

## 6. Arquitetura da informação (o README seção por seção)

### 6.0 Visão geral

```
00  Cabeçalho ............ hero-{dark,light}.svg            [estático, animado]
01  Posicionamento ....... texto + 4 botões SVG
02  Condições ............ /conditions.svg                  [AO VIVO]
03  一 Telemetry ......... /telemetry.svg                   [AO VIVO]
04  二 About ............. texto + bloco ts
05  三 Route ............. route-{dark,light}.svg + tabela  [estático, animado]
06  四 Work by sector .... kamon + cards + mapa GeoJSON
07  五 How I ship ........ Dandori · Kenshō · Kaizen
08  六 Stack ............. stack-{dark,light}.svg           [gerado no build]
09  七 Activity .......... activity-{dark,light}.svg        [gerado diariamente]
10  Off-duty ............. <details> terminal + prancha 3D
11  For AI agents ........ <details> resumo estruturado
12  Rodapé ............... footer-{dark,light}.svg + CTA
--  Escondidos ........... haiku e arte ASCII em comentários HTML
```

Os números das seções usam os **numerais formais** japoneses (壱 弐 参 肆 伍 陸, *daiji*, os usados em documentos oficiais). Os simples (一 二 三) foram testados e descartados: na fonte do GitHub parecem traços (—, =, ≡).

### 6.1 Seção por seção

#### 00 · Cabeçalho (hero)
- **Conteúdo visual:** a Grande Onda à esquerda (55% da largura), mar calmo à direita, montanha pequena no horizonte, o **disco solar** nascendo, faixas de névoa.
- **Texto no SVG (grande, poucas palavras):** `GUSTAVO HUDSON`, `Chief Technology Officer`, `7°09′S 34°47′W`.
- **Sequência de abertura (5 s):**
  | t | Evento |
  |---|---|
  | 0,0 s | Fundo e seigaiha aparecem (fade 0,4 s) |
  | 0,2–2,4 s | A onda se desenha (revelação por máscara, da base para a crista) |
  | 1,6–3,0 s | O sol sobe 40 px atrás do horizonte |
  | 2,4–3,4 s | Névoa e nuvens entram deslizando |
  | 3,2–4,2 s | O nome aparece (letra a letra, com atraso de 40 ms) |
  | 4,4 s | O carimbo cai (efeito de impacto) |
  | depois | Micro-loops: a espuma oscila (10 s) e uma nuvem desliza (45 s) |
- **Proporção:** `1200 × 400` (3:1).
- **Arquivos:** `assets/hero-dark.svg`, `assets/hero-light.svg`, servidos com `<picture>`.

#### 01 · Posicionamento
- Uma linha forte em Markdown (ver o texto em [§14](#14-textos-finais-copy-deck)).
- 4 botões SVG próprios, no estilo do tema (no lugar dos shields coloridos): **Email · LinkedIn · Live in production · Open source**.
- Uma linha de tags discretas: `João Pessoa, BR` · `Remote / On-site` · `PT / EN` · `Open to projects`.

#### 02 · Condições (ao vivo)
- Faixa fina `1200 × 120`.
- O **céu muda conforme o horário real** (aurora, dia, entardecer, noite), calculado pelos horários de **nascer e pôr do sol reais** (Open-Meteo).
- A **altura das ondas é proporcional ao swell real**, e o **período** controla a velocidade da animação.
- Texto (mono): `Ponta do Seixas · 05:12 BRT · Swell 1.4 m · 11 s · Wind 12 km/h offshore`.
- **Privacidade:** mostra a **região**, nunca "estou surfando agora".

#### 03 · 一 Telemetry (ao vivo)
- Substitui a tabela "Impact at a Glance".
- Painel `1200 × 260` com moldura de nuvens kumo nos cantos e dados limpos no centro:
  ```
  ● 15/15 SYSTEMS ONLINE                     30d UPTIME  99.97%
  BELPonto    ▁▂▃▅▇▆▅   OK   1,204 tests ✓   deployed 2d ago
  BELeads     ▂▃▃▄▆▇▇   OK   2,147 tests ✓   deployed 3h ago
  …
  updated 16:42 BRT · data pushed from production, sanitized
  ```
- Sem dados há mais de 15 minutos → `● no signal` em cinza (o painel nunca mente).
- Antes do Worker existir: versão estática com a data "as of".

#### 04 · 二 About
- 2 parágrafos curtos: o CTO multissetor e a IA como sistema operacional do negócio.
- Mantém o bloco `ts` (é bom e combina com dev), revisado.
- A tabela "How I apply AI" fica, enxugada para no máximo 6 linhas.

#### 05 · 三 Route: carpa → dragão
- Peça `1200 × 360`. À esquerda, uma **cachoeira com a carpa subindo**; ao longo da peça, **marcos da carreira** sobre linhas de água e nuvem; à direita, no alto, o **dragão** entre nuvens, onde fica **CTO**.
- Animação: a cachoeira cai (loop lento), a carpa sobe (uma vez), os marcos acendem em sequência e o dragão surge da névoa.
- Rótulos dentro do SVG: **só ano + cargo**, em fonte grande. Os detalhes vão numa **tabela em Markdown** logo abaixo (legível em celular).
- Insumo do Gustavo: lista de marcos com anos (ver [§17](#17-decisões-pendentes--insumos-do-gustavo)).

#### 06 · 四 Work by sector
Cada setor tem um **kamon** (brasão) como cabeçalho:

| Setor | Kamon | Projetos |
|---|---|---|
| **Retail** (Lojas Belmont) | Cortina **noren** (a cortina da entrada das lojas japonesas) | BELPonto, BELeads, Website, ExtractNeoron, BELPreço, Catalog Pipeline, BINAH |
| **Fintech** | **Moeda antiga** japonesa (círculo com furo quadrado) | NinjaCash |
| **Entertainment** | **Lanterna** chōchin de festival | Txintxa do Gigi |
| **Platforms, Infra & Open Source** | Treliça **kikkō** (hexágonos, como nós de uma rede) | Belmont Monitor, Ttalk Bot Manager (OSS), Cockpit, MAPservice, Google Maps Scraper Kit, WifiLive |

- Os projetos principais seguem em cards de 2 colunas (como hoje). O resto fica em tabela compacta.
- No setor **Retail**, um `<details>` com o **mapa GeoJSON** das lojas: *"Where this software runs"*.

#### 07 · 五 How I ship
Os três pilares atuais ganham nomes de três conceitos japoneses **reais**:

| Pilar | Conceito | Por quê |
|---|---|---|
| Plan first | **段取り Dandori** (preparação) | Ditado japonês: *段取り八分、仕事二分*, "preparação é 80% do trabalho" |
| Prove it works | **検証 Kenshō** (verificação) | Testes, scans, revisão |
| Own it in production | **改善 Kaizen** (melhoria contínua) | Monitoramento, postmortem, backups com teste de restauração |

#### 08 · 六 Stack
- No lugar de 9 linhas de ícones coloridos de vários fornecedores, uma **prancha monocromática única** (`stack-{dark,light}.svg`), gerada no build com os ícones do pacote **simple-icons** (licença CC0), na cor do tema e agrupada por categoria.
- Coerência visual total, e mostra domínio de pipeline de build.
- A lista completa de "Expertise" vai para um `<details>`: *"Full expertise index"*.

#### 09 · 七 Activity
- O calendário de contribuições redesenhado como **escamas de seigaiha**: 53 × 7 escamas, e a intensidade de cor é o número de contribuições do dia.
- Gerado por uma **GitHub Action diária** a partir da API GraphQL do GitHub e publicado num branch `output` (pra não sujar o histórico do `main`).
- No lugar de `streak-stats` e `ghchart`.

#### 10 · Off-duty (recolhido)
```html
<details><summary>🌊 Off-duty</summary> … </details>
```
- Bloco de terminal (texto em [§14](#14-textos-finais-copy-deck)).
- **Prancha de surf em 3D** (bloco ` ```stl `) que o visitante gira com o mouse.
- Uma linha sobre trilha, moto e estrada.

#### 11 · For AI agents (recolhido)
- Resumo estruturado para ferramentas de recrutamento com IA. **Visível e recolhido**, nunca texto escondido.

#### 12 · Rodapé
- `footer-{dark,light}.svg`, `1200 × 220`: noite, lua cheia sobre o mar, o **dragão pequeno** entre as nuvens, o carimbo.
- Chamada para contato em Markdown: **"Have a problem worth solving? Let's talk."**
- Créditos discretos: `Marine data: Open-Meteo (CC BY 4.0)` (a licença exige atribuição).

#### Escondidos (para quem abre o código-fonte)
- **Haiku** num comentário HTML no topo do README.
- **Arte ASCII** de uma onda num comentário no fim.
- Commits do repositório do perfil escritos como diário de bordo: `log: hero wave drawn, tide rising`.
- Um `<title>` curto dentro de cada SVG com comentário técnico.

---

## 7. Inventário de assets

| ID | Arquivo | Origem | Dimensão | Animado | Peso máx. |
|---|---|---|---|---|---|
| A | `assets/hero-{dark,light}.svg` | IA (onda) + código | 1200×400 | ✅ | 350 KB |
| B | `assets/route-{dark,light}.svg` | IA (carpa, dragão, nuvens) + código | 1200×360 | ✅ | 350 KB |
| C | `assets/footer-{dark,light}.svg` | IA (dragão pequeno, nuvens) + código | 1200×220 | ✅ leve | 150 KB |
| D | `assets/kamon-{retail,fintech,entertainment,platforms}.svg` | IA → ajuste manual | 96×96 | ❌ | 10 KB cada |
| E | `assets/divider-{dark,light}.svg` | código | 1200×40 | ✅ leve | 8 KB |
| F | `assets/btn-{email,linkedin,live,oss}-{dark,light}.svg` | código | 180×44 | ❌ | 4 KB cada |
| G | `assets/stack-{dark,light}.svg` | build (simple-icons) | 1200×~420 | ❌ | 120 KB |
| H | `output/activity-{dark,light}.svg` | Action diária | 1200×200 | ✅ leve | 120 KB |
| I | `/conditions.svg` (Worker) | servidor | 1200×120 | ✅ | 40 KB |
| J | `/telemetry.svg` (Worker) | servidor | 1200×260 | ✅ leve | 40 KB |
| K | Bloco ` ```stl ` (prancha) | OpenSCAD | — | interativo | ≤ 600 facetas |
| L | Bloco ` ```geojson ` (lojas) | manual | — | interativo | — |

**Fontes gráficas brutas (versionadas, fora do README):** `assets/src/ai/*.png` (imagens geradas) e `assets/src/vector/*.svg` (vetorizadas e limpas).

---

## 8. Prompts para a IA de imagem

### 8.1 Como usar

1. Use o **bloco de estilo-mestre** (8.2) **antes** de cada prompt de asset (8.3). Ele garante que todas as peças pareçam da mesma mão.
2. Gere **4 variações** de cada asset e escolha a melhor pelo checklist (8.5).
3. Peça sempre na **maior resolução** disponível (mínimo 2048 px no lado maior; o ideal é 4096).
4. Salve em `assets/src/ai/` com o nome indicado em cada asset.
5. **Ferramentas:** os prompts estão em inglês (os modelos rendem mais) e têm duas versões: **linguagem natural** (ChatGPT/GPT-Image, Gemini, Ideogram, Flux) e **Midjourney** (com parâmetros).

### 8.2 Bloco de estilo-mestre (colar antes de todos)

```text
STYLE: Traditional Japanese ukiyo-e woodblock print linework combined with classic
wabori (Japanese traditional tattoo) stencil style. Pure black ink lines on a pure
white background. Bold, confident, clean contour lines with consistent stroke weight,
like a professional tattoo stencil or a carved woodblock key-block. Clean closed shapes,
crisp edges, high contrast.

STRICT RULES: no shading, no gradients, no gray tones, no hatching or cross-hatching,
no stippling, no color, no paper texture, no grain, no text, no letters, no kanji,
no signature, no red seal, no watermark, no frame, no border. Flat 2D, vector-friendly,
generous negative space. Original composition inspired by Edo-period masters — do not
copy any existing artwork.
```

**Negativo (para ferramentas que aceitam):**
```text
text, letters, kanji, signature, seal, stamp, watermark, logo, frame, border, color,
shading, gradient, gray, hatching, stippling, texture, paper grain, photo, 3d render,
blurry, sketchy lines, double lines, noise
```

### 8.3 Prompts por asset

---

#### 🅐 Grande Onda (cabeçalho) → `A-hero-wave.png`

**Linguagem natural:**
```text
[STYLE BLOCK]

SUBJECT: A wide panoramic seascape. On the LEFT half, one towering, powerful breaking
wave curling toward the right, its crest breaking into claw-like fingers of foam with
small spiral foam droplets. Two smaller rolling waves in the foreground echo its shape.
On the RIGHT half, the sea becomes calm: only a few long, gentle horizontal wave lines
and lots of empty white space (this area will hold a title). On the far horizon at the
right third, a small, simple mountain peak silhouette (outline only). Above the horizon
near the right, a single plain circle representing the rising sun — just an outline
circle, absolutely no rays. Two or three thin horizontal mist bands near the horizon.

COMPOSITION: 3:1 panoramic, wave occupying the left ~55%, horizon at ~65% height.
```

**Midjourney:**
```text
ukiyo-e woodblock and wabori tattoo stencil line art, pure black ink on pure white,
towering breaking wave on the left curling right with claw-like foam fingers and spiral
droplets, two smaller foreground waves, calm sea with few long horizontal lines and
empty space on the right, tiny mountain peak outline on the far right horizon, plain
outline circle rising sun without rays, thin mist bands, bold clean uniform contours,
original composition, flat 2D vector-friendly
--ar 3:1 --style raw --stylize 50 --v 7
--no text, letters, kanji, signature, seal, watermark, frame, color, shading, gradient, gray, hatching, texture
```

---

#### 🅑 Dragão (Route + rodapé) → `B-dragon.png`

**Linguagem natural:**
```text
[STYLE BLOCK]

SUBJECT: A Japanese dragon (ryū) in classic wabori tattoo style. Long serpentine body
coiling horizontally through stylized swirling clouds, forming an elegant S-curve
across the image. Head on the RIGHT, facing right and slightly upward, mouth slightly
open, long flowing whiskers, flame-like mane, expressive eye. Clearly defined scales
drawn as clean outlined arcs, a ridge of dorsal spines along the back, three-clawed
feet (Japanese tradition) reaching forward. Swirling clouds (kumo) with spiral ends
wrap around parts of the body, partially hiding it. The tail on the LEFT disappears
into clouds.

COMPOSITION: 3:1 panoramic, the dragon fills the width, lots of white space above and
below the clouds. Clean, majestic, calm power — not aggressive.
```

**Midjourney:**
```text
Japanese dragon ryu in classic wabori tattoo stencil style, ukiyo-e woodblock linework,
long serpentine body coiling horizontally in an S-curve through swirling kumo clouds
with spiral ends, head on the right facing right and slightly upward, flowing whiskers,
flame-like mane, outlined scales, dorsal spines, three-clawed feet, tail fading into
clouds on the left, pure black ink on pure white, bold clean uniform contours, calm
majestic power, original composition, flat 2D vector-friendly
--ar 3:1 --style raw --stylize 75 --v 7
--no text, letters, kanji, signature, seal, watermark, frame, color, shading, gradient, gray, hatching, texture
```

---

#### 🅒 Carpa subindo a cachoeira (Route) → `C-koi-waterfall.png`

**Linguagem natural:**
```text
[STYLE BLOCK]

SUBJECT: A single koi carp leaping and swimming UPWARD against a waterfall, in wabori
tattoo style. The waterfall is drawn as long parallel vertical flowing lines, with a
splash of curling water and foam spirals at its base. The koi is in the center, body
curved in a strong S-shape, head pointing up, mouth open, fins spread, tail fanning
downward. Scales drawn as clean outlined overlapping arcs, a few water droplets around.

COMPOSITION: 2:3 vertical, waterfall top to bottom, koi in the middle third,
white space on both sides.
```

**Midjourney:**
```text
single koi carp leaping upward against a waterfall, wabori tattoo stencil and ukiyo-e
woodblock linework, waterfall as long parallel vertical lines, curling splash with foam
spirals at the base, koi in strong S-curve head up mouth open fins spread, outlined
overlapping scales, few droplets, pure black ink on pure white, bold clean uniform
contours, original composition, flat 2D vector-friendly
--ar 2:3 --style raw --stylize 50 --v 7
--no text, letters, kanji, signature, seal, watermark, frame, color, shading, gradient, gray, hatching, texture
```

---

#### 🅓 Conjunto de nuvens kumo → `D-clouds-set.png`

**Linguagem natural:**
```text
[STYLE BLOCK]

SUBJECT: A sprite sheet of SIX separate, isolated stylized Japanese clouds (kumo) as
used in wabori tattoo backgrounds and ukiyo-e prints. Each cloud has soft rounded
lobes and characteristic spiral/curl endings. Variety: two long horizontal clouds,
two medium clouds, two small compact clouds. Each cloud fully separated from the
others with wide white gaps — no overlapping.

COMPOSITION: 3:2, arranged in a clean 3×2 grid, each cloud centered in its cell.
```

**Midjourney:**
```text
sprite sheet of six separate isolated stylized Japanese kumo clouds, wabori tattoo
background style, ukiyo-e linework, rounded lobes with spiral curl endings, two long,
two medium, two small, arranged in a clean 3x2 grid with wide white gaps, no overlap,
pure black ink on pure white, bold clean uniform contours, flat 2D vector-friendly
--ar 3:2 --style raw --stylize 25 --v 7
--no text, letters, kanji, signature, seal, watermark, frame, color, shading, gradient, gray, hatching, texture
```

---

#### 🅔 Montanha, trilha e pinheiros → `E-mountain-trail.png`

**Linguagem natural:**
```text
[STYLE BLOCK]

SUBJECT: A minimal panoramic mountain landscape. A layered mountain ridge (two or three
overlapping ridgelines) with a thin winding trail climbing toward the summit. In the
foreground on the left, two Japanese black pine trees with characteristic flat, cloud-
like foliage pads and twisted trunks. Two long horizontal mist bands crossing the
mountains. Very clean and sparse.

COMPOSITION: 4:1 ultra-wide panoramic, mostly empty sky above, ridges in the lower half.
```

**Midjourney:**
```text
minimal panoramic Japanese mountain landscape, ukiyo-e woodblock linework, two or three
overlapping ridgelines, thin winding trail climbing to the summit, two Japanese black
pines in the left foreground with flat cloud-like foliage pads and twisted trunks, long
horizontal mist bands, sparse, lots of empty sky, pure black ink on pure white, bold
clean uniform contours, flat 2D vector-friendly
--ar 4:1 --style raw --stylize 25 --v 7
--no text, letters, kanji, signature, seal, watermark, frame, color, shading, gradient, gray, hatching, texture
```

---

#### 🅕 Quatro kamon dos setores → `F-kamon-set.png` *(OPCIONAL: já feitos em código)*

> Kamon são brasões geométricos e simétricos. Os quatro já existem em código (`build/pieces/kamon.mjs`). Gere só se quiser uma versão com mais traço artesanal.

**Linguagem natural:**
```text
STYLE: Traditional Japanese family crests (kamon). Solid black shapes on a pure white
background, perfectly symmetrical, geometric, minimal, bold, each enclosed in a thin
circular ring. Flat 2D, no shading, no gradients, no gray, no text, no kanji, no
texture, no frame around the whole image.

SUBJECT: Four separate kamon arranged in a 2×2 grid with wide white gaps:
1. TOP-LEFT — a shop entrance noren curtain: a stylized split hanging curtain with
   three panels, viewed from the front.
2. TOP-RIGHT — an ancient Japanese coin: a circle with a square hole in the center
   and four simple geometric marks around the hole (no readable characters).
3. BOTTOM-LEFT — a festival paper lantern (chōchin): an oval lantern with horizontal
   ribs and small top and bottom caps.
4. BOTTOM-RIGHT — a kikkō tortoise-shell lattice: a central hexagon surrounded by six
   hexagons, connected like nodes of a network.

COMPOSITION: 1:1, 2×2 grid, each crest the same size and centered in its cell.
```

**Midjourney:**
```text
four separate Japanese kamon family crests in a 2x2 grid, solid black on pure white,
perfectly symmetrical geometric minimal bold, each in a thin circular ring: noren shop
curtain with three panels, ancient coin with square hole and four geometric marks,
festival chochin paper lantern with horizontal ribs, kikko tortoise-shell hexagon
lattice of seven hexagons, equal sizes, wide gaps, flat 2D vector
--ar 1:1 --style raw --stylize 0 --v 7
--no text, letters, kanji, characters, signature, seal, watermark, color, shading, gradient, gray, texture
```

---

#### 🅖 (Opcional) Cena do "Off-duty" → `G-offduty-coast.png`

> Só se sobrar fôlego. O "Off-duty" já funciona com terminal + 3D.

```text
[STYLE BLOCK]

SUBJECT: A small panoramic coastal scene: a winding coastal road along a cliff with a
single motorcycle and rider in silhouette outline, a small surfer riding a modest wave
in the sea below, a mountain with a trail in the background. Tiny, elegant, lots of
negative space.

COMPOSITION: 4:1 ultra-wide.
```

---

### 8.4 Por que não pedir à IA

| Peça | Motivo |
|---|---|
| Carimbo (hanko) | IA de imagem **erra letras e kanji**. Faço com fonte real em SVG |
| Seigaiha, linhas de vento, sol, lua | Formas geométricas: em código fica perfeito e muito mais leve |
| Painéis, botões, textos | Precisam de dados reais e de texto selecionável e nítido |

### 8.5 Checklist de aceitação de cada imagem gerada

- [ ] Fundo **branco puro** e traço **preto puro** (sem cinza, sem textura)
- [ ] Nenhuma letra, kanji, assinatura ou carimbo inventado
- [ ] Traços fechados e contínuos, sem linhas duplas nem "rabiscos"
- [ ] Espessura de traço consistente
- [ ] A composição respeita a proporção pedida e a **área vazia** (no cabeçalho, para o nome)
- [ ] Não lembra demais uma obra existente específica
- [ ] Resolução ≥ 2048 px no lado maior

**Fallback:** se o dragão não ficar bom após 3 rodadas, usar um dragão de uma gravura de **domínio público** do próprio Hokusai (os volumes do *Hokusai Manga* têm vários) e vetorizar. É mais autêntico e não tem risco de direitos autorais.

---

## 9. Pipeline: imagem gerada → SVG animado

```
PNG gerado ─▶ limpeza ─▶ vetorização ─▶ separação em camadas ─▶ tema + animação ─▶ otimização
 (você)       (você/eu)     (eu)              (eu)                    (eu)             (eu)
```

| Etapa | Ferramenta | Detalhe |
|---|---|---|
| 1. Ampliar (se precisar) | Upscaler da própria ferramenta, ou Real-ESRGAN | Meta: 4096 px |
| 2. Limpar | Photoshop/GIMP → **Limiar 50%** | Deixa tudo 100% preto ou branco e remove pontos soltos |
| 3. Vetorizar | **vtracer** | `vtracer --input A.png --output A.svg --colormode bw --mode spline --filter_speckle 8 --corner_threshold 60 --path_precision 2` |
| 4. Separar camadas | Inkscape + edição manual | Agrupar em `<g id="crest">`, `<g id="body">`, `<g id="foam">`, `<g id="bg">` para animar cada parte |
| 5. Tema | Edição | Trocar cores fixas por tokens; gerar as versões dark e light |
| 6. Animar | CSS dentro do SVG | Revelação por máscara + atrasos por grupo (ver [§5.5](#55-linguagem-de-animação)) |
| 7. Otimizar | **SVGO** com config própria | **Desligar** plugins que apagam `id`, `<style>` ou `mask` (senão a animação quebra) |
| 8. Validar | Script de CI | Peso, XML válido, nenhuma referência externa (ver [§10.4](#104-ci-de-validação)) |

**Por que revelação por máscara:** a vetorização gera **contornos preenchidos**, não traços. A animação de `stroke-dashoffset` direto neles fica estranha. A técnica certa é colocar na `<mask>` um traço branco grosso que percorre o desenho e vai revelando a arte por baixo, como um pincel passando.

---

## 10. Arquitetura técnica

### 10.1 Estrutura do repositório

```
gustavohuds/
├─ README.md
├─ docs/
│  └─ ESCOPO-RYUMON.md          ← este documento
├─ assets/
│  ├─ hero-{dark,light}.svg
│  ├─ route-{dark,light}.svg
│  ├─ footer-{dark,light}.svg
│  ├─ divider-{dark,light}.svg
│  ├─ kamon-*.svg
│  ├─ btn-*.svg
│  ├─ stack-{dark,light}.svg
│  └─ src/
│     ├─ ai/                    ← PNGs gerados (originais)
│     ├─ vector/                ← SVGs vetorizados e limpos
│     └─ templates/             ← templates das peças (com tokens)
├─ build/
│  ├─ build.mjs                 ← monta templates + tokens + fontes → assets/
│  ├─ fonts.mjs                 ← reduz e embute as fontes
│  ├─ stack.mjs                 ← gera a prancha da stack (simple-icons)
│  ├─ activity.mjs              ← gera o calendário seigaiha
│  ├─ validate.mjs              ← orçamentos e checagens
│  └─ svgo.config.mjs
├─ models/
│  ├─ surfboard.scad            ← fonte da prancha 3D
│  └─ surfboard.stl             ← exportado (ASCII)
├─ geo/
│  └─ stores.geojson
├─ live/                        ← Cloudflare Worker
│  ├─ src/index.ts
│  ├─ src/scenes/*.ts
│  └─ wrangler.toml
└─ .github/workflows/
   ├─ activity.yml              ← diário: gera activity-*.svg no branch output
   └─ validate.yml              ← em PR/push: valida orçamentos e SVGs
```

### 10.2 Branches

| Branch | Conteúdo |
|---|---|
| `main` | README, fontes, assets estáticos |
| `output` | Só os SVGs gerados automaticamente (atividade). Pra não poluir o histórico do `main` com commits diários |

URL de uso: `https://raw.githubusercontent.com/GustavoHuds/gustavohuds/output/activity-dark.svg`

### 10.3 Action diária de atividade

- **Gatilho:** `schedule: cron "0 9 * * *"` (06:00 BRT) + `workflow_dispatch`.
- **Dados:** GraphQL `user(login:"GustavoHuds") { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } }`.
- **Contribuições privadas:** só entram se a opção **"Private contributions"** estiver ligada no perfil. A Action usa um token pessoal só de leitura (`read:user`) guardado em secret.
- **Saída:** `activity-{dark,light}.svg` no branch `output`.

### 10.4 CI de validação

`validate.yml` roda `build/validate.mjs` e falha se:

- algum SVG passa do orçamento de peso (tabela da [§7](#7-inventário-de-assets));
- o XML é inválido;
- algum SVG referencia URL externa (`href="http…"` fora do `xmlns`), que **não carrega** no GitHub;
- falta a regra de `prefers-reduced-motion` num SVG animado;
- falta o par `dark`/`light` de alguma peça;
- algum `<img>` do README está sem `alt`;
- existe link quebrado no README.

---

## 11. Serviço ao vivo (Cloudflare Worker)

> **Atualização 2026-10-27:** a implementação final roda **no VPS**, ao lado do Uptime Kuma (`live/`). O serviço lê o Kuma direto pela rede Docker; não há conta externa, cron, KV nem push do VPS. O resto desta seção fica como registro do desenho original. Contrato atual: `live/README.md`.

### 11.1 Por que Worker (e não o VPS)

Grátis, rápido em qualquer lugar do mundo, sem manutenção, e **isola** o perfil da infraestrutura da empresa. Se o perfil tomar tráfego, o VPS da Belmont nem fica sabendo. (O VPS com Caddy é a alternativa, se o Gustavo preferir.)

### 11.2 Endpoints

| Método | Rota | Função | Cache |
|---|---|---|---|
| `GET` | `/conditions.svg?theme=dark\|light` | Faixa de condições (céu + mar) | `no-cache` |
| `GET` | `/telemetry.svg?theme=dark\|light` | Painel de telemetria | `no-cache` |
| `POST` | `/ingest` | Recebe métricas higienizadas (VPS e CI) | — |
| `GET` | `/health` | Diagnóstico | — |

**Cabeçalhos dos SVGs:**
```
content-type: image/svg+xml; charset=utf-8
cache-control: no-cache, no-store, max-age=0, must-revalidate
```

### 11.3 Regra de ouro: o endpoint de imagem nunca chama API externa

O proxy de imagens do GitHub (camo) desiste de respostas lentas. Então:

```
Cron Trigger (a cada 30 min) ──▶ Open-Meteo ──▶ KV "conditions"
VPS (a cada 1 min) / CI ──POST /ingest──▶ KV "telemetry:<sistema>"

GET /*.svg ──▶ só lê o KV e monta o SVG  (< 10 ms)
```

### 11.4 Condições: fontes e regras

| Dado | Fonte |
|---|---|
| Swell, período, direção | `https://marine-api.open-meteo.com/v1/marine?latitude=-7.15&longitude=-34.79&current=wave_height,wave_period,wave_direction,swell_wave_height,swell_wave_period` |
| Vento, nascer e pôr do sol | `https://api.open-meteo.com/v1/forecast?latitude=-7.15&longitude=-34.79&current=wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=America%2FFortaleza` |

- **Fuso:** `America/Fortaleza` (UTC−3, sem horário de verão). É o fuso da Paraíba.
- **Fase do céu:** aurora (nascer −40 min até nascer +30), dia, entardecer (pôr −40 até pôr +30), noite.
- **Vento terral/maral (aproximado):** a costa de João Pessoa olha para leste. Vento **de** 225°–315° = `offshore`; de 45°–135° = `onshore`; o resto = `cross-shore`.
- **Ondas:** amplitude visual = `clamp(swell_m × 14px, 6px, 40px)`; duração do loop = `período × 0,8 s`.
- **Atribuição:** Open-Meteo, CC BY 4.0 (vai no rodapé).

### 11.5 Telemetria: contrato de dados

```jsonc
// POST /ingest   Authorization: Bearer <INGEST_TOKEN>
{
  "system": "BELeads",                  // precisa estar na lista permitida
  "status": "up",                       // "up" | "degraded" | "down"
  "uptime30d": 99.97,                   // %
  "latencyMs": [120, 118, 131, ...],    // últimas ≤ 20 medições
  "tests": 2147,                        // opcional (vem do CI)
  "deployedAt": "2026-10-26T13:05:00-03:00" // opcional
}
```

**Lado do VPS:** um script Python (do Belmont Monitor) lê a API **local** do Uptime Kuma a cada minuto, filtra e envia. **Nada do Kuma fica exposto na internet** (o Authelia continua protegendo tudo).

**Lado do CI** (passo no repositório privado de cada sistema):
```yaml
- name: Publish profile telemetry
  if: success() && github.ref == 'refs/heads/main'
  run: |
    PASSED=$(jq '.numPassedTests' test-results.json)
    curl -fsS -X POST "$INGEST_URL" \
      -H "Authorization: Bearer $INGEST_TOKEN" \
      -H "content-type: application/json" \
      -d "{\"system\":\"BELeads\",\"tests\":$PASSED,\"deployedAt\":\"$(date -Iseconds)\"}"
  env:
    INGEST_URL: ${{ secrets.PROFILE_INGEST_URL }}
    INGEST_TOKEN: ${{ secrets.PROFILE_INGEST_TOKEN }}
```

### 11.6 Checklist de segurança

- [ ] O token do `/ingest` só **escreve** e fica em secrets (Worker + CI + VPS)
- [ ] **Lista permitida** de sistemas: qualquer outro nome é recusado
- [ ] Validação de esquema (tipos, limites, tamanho máximo do corpo: 4 KB)
- [ ] Nunca guardar nem desenhar hostname, IP, URL, rota, mensagem de erro ou **versão de software**
- [ ] Limite de requisições por IP no `/ingest`
- [ ] Dado com mais de 15 min → `no signal` (o painel nunca mente)
- [ ] Todo texto que vai para o SVG é escapado (`& < > " '`) para evitar injeção de SVG
- [ ] Se o Worker cair, o `alt` da imagem explica o que ela mostraria

---

## 12. O 3D: prancha de surf no README

### 12.1 Como funciona

O GitHub transforma um bloco de código ` ```stl ` (STL em **texto ASCII**) num **visualizador 3D interativo**: dá pra girar, aproximar e ver em wireframe. Quase ninguém usa isso num perfil.

### 12.2 Modelo (paramétrico)

> **Implementado em `build/surfboard.mjs`** (Node, sem depender do OpenSCAD): 552 facetas, injetado no README entre `<!-- stl:start -->` e `<!-- stl:end -->`. O OpenSCAD abaixo fica como referência.

```openscad
// models/surfboard.scad — prancha shortboard low-poly
$fn = 20;            // poucas faces: o README não pode pesar
L = 180;             // comprimento
W = 48;              // largura
T = 6;               // espessura

module board() {
  hull() {
    translate([ L*0.18, 0, 0]) scale([L*0.32, W*0.42, T*0.50]) sphere(1);  // bico
    translate([-L*0.10, 0, 0]) scale([L*0.38, W*0.50, T*0.55]) sphere(1);  // meio
    translate([-L*0.38, 0, 0]) scale([L*0.12, W*0.34, T*0.45]) sphere(1);  // rabeta
  }
}

module fin(x, y, a) {
  translate([x, y, -T*0.4]) rotate([0, 0, a]) rotate([90, 0, 0])
    linear_extrude(height = 1.2, center = true)
      polygon([[0,0], [12,0], [3,-11]]);
}

board();
fin(-L*0.42,  W*0.18,  6);   // quilha lateral
fin(-L*0.42, -W*0.18, -6);   // quilha lateral
fin(-L*0.46,  0,       0);   // quilha central
```

**Export:** `openscad -o models/surfboard.stl --export-format asciistl models/surfboard.scad`

### 12.3 Regras

- **Orçamento:** ≤ 600 facetas (o STL ASCII usa 7 linhas por faceta, então ~4.200 linhas, invisíveis para o visitante).
- **Posição:** dentro do `<details>` "Off-duty", com a frase *"Drag to rotate. Yes, this is a 3D model rendered natively by GitHub."*
- **Validar na Fase 0:** se o bloco renderiza no **perfil** e dentro de `<details>`. Plano B: o arquivo `models/surfboard.stl` abre no visualizador 3D do GitHub, e o README aponta para ele.
- **Extra (se sobrar fôlego):** um modelo low-poly de um **servidor em rack** ou do **kamon kikkō** em relevo no setor "Platforms". Fica opcional para não poluir.

---

## 13. Mapa GeoJSON

- **Onde:** dentro do setor **Retail**, num `<details>` *"🗺️ Where this software runs"*.
- **Conteúdo:** um ponto por loja + um polígono suave da região atendida.
- **Formato:** coordenadas **[longitude, latitude]** (ao contrário, o pino vai parar no oceano).

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-34.8611, -7.1195] },
      "properties": {
        "title": "Lojas Belmont · <unit>",
        "description": "BELPonto kiosk · BELPreço · Website",
        "marker-color": "#2563EB",
        "marker-size": "medium",
        "marker-symbol": "shop"
      }
    }
  ]
}
```

- **Insumo:** os endereços reais das lojas (são estabelecimentos públicos, sem problema de privacidade).
- **Não incluir:** localização de servidor ou de escritório que não seja público.

---

## 14. Textos finais (copy deck)

> O README fica em **inglês** (público global). Os textos abaixo são a versão 1, para revisão.

### Hero (dentro do SVG)
```
GUSTAVO HUDSON
Chief Technology Officer
7°09′S 34°47′W
```

### Linha de posicionamento (Markdown, logo abaixo do hero)
> **CTO who builds.** I find the real business problem, ship the system that solves it, and keep it running in production — across retail, fintech and entertainment.
>
> <sub>Engineering from the easternmost point of the Americas — where the sun rises first.</sub>

### Títulos das seções
```
一  Telemetry      — live from production
二  About
三  Route          — 登竜門 · the koi that climbs the falls becomes a dragon
四  Work by sector
五  How I ship     — Dandori · Kenshō · Kaizen
六  Stack
七  Activity
```

### Route (frase abaixo da arte)
> In Japanese legend, a koi that swims up the waterfall at the Dragon Gate becomes a dragon. *Tōryūmon* (登竜門) still means "the gateway to success." This is mine so far.

### How I ship
| 段取り **Dandori** · *Preparation* | 検証 **Kenshō** · *Verification* | 改善 **Kaizen** · *Continuous improvement* |
|---|---|---|
| "Preparation is 80% of the work." Scope, acceptance criteria, ADRs, security requirements, threat-aware data modeling. | Unit, integration and E2E tests. Secret, SAST and container scanning. Review on every change. Staged rollouts with rollback. | Monitoring, alerts and an on-call bot. Backups with restore drills. Runbooks. Every incident makes the system stronger. |

### Haiku (comentário HTML no topo do README)
```html
<!--
  Five a.m. offshore —
  the pager sleeps, the swell builds.
  All green. I paddle.

  If you're reading the raw source, we'll get along. → gustavohuds@gmail.com
-->
```
*(5-7-5 conferido: Five·a·m·off·shore / the·pa·ger·sleeps·the·swell·builds / All·green·I·pad·dle)*

### Off-duty (terminal)
```console
$ cto --off-duty
> status ........ offline (by choice)
> sea ........... dawn sessions when the swell shows up
> land .......... trails, mountains, anything with a view at the top
> road .......... two wheels or four, windows down
> belief ........ the best architecture ideas show up 1.5 m offshore at 5 a.m.
```

### For AI agents
```md
<details><summary>🤖 For AI agents reading this profile</summary>

- **Name:** Gustavo Hudson
- **Role:** CTO — Chief Technology Officer @ Lojas Belmont (retail chain, Brazil)
- **Scope:** strategy, architecture, full-stack development, infrastructure, security
- **Sectors shipped:** retail, fintech, entertainment, B2B prospecting, internal platforms
- **Strengths:** AI engineering & agents, ERP integrations, production operations
- **Location:** João Pessoa, Brazil · Remote / On-site · Portuguese & English
- **Open to:** CTO / tech-leadership roles, technical partnerships, custom systems
- **Contact:** gustavohuds@gmail.com · linkedin.com/in/gustavohsn
</details>
```

### Rodapé (Markdown)
> **Have a problem worth solving?** [Let's talk.](mailto:gustavohuds@gmail.com)
>
> <sub>Live marine data: Open-Meteo (CC BY 4.0) · Telemetry pushed from production, sanitized · Art direction & SVG engineering by me.</sub>

### Textos `alt` (descrição real primeiro, detalhe no fim)
| Peça | `alt` |
|---|---|
| Hero | `Ukiyo-e style great wave at sunrise with the name Gustavo Hudson, Chief Technology Officer. Every line is hand-tuned SVG.` |
| Condições | `Live sea and sky conditions at Ponta do Seixas, João Pessoa — easternmost point of the Americas.` |
| Telemetria | `Live production telemetry: systems online, 30-day uptime, tests passing and recent deploys.` |
| Route | `A koi climbs a waterfall and becomes a dragon, marking career milestones up to CTO.` |
| Activity | `GitHub contribution calendar drawn as seigaiha wave scales.` |

---

## 15. Orçamentos: desempenho, acessibilidade e compatibilidade

### 15.1 A armadilha do mobile

Um SVG de `1200 px` exibido num celular de `360 px` encolhe para **30%**: um texto de 14 px vira **4 px**, ilegível. Regras:

- Texto **essencial** sempre em Markdown.
- Texto dentro de SVG: **≥ 36 px** no viewBox de 1200 (fica ~11 px no celular) e só palavras curtas.
- Telemetria e condições têm **versões compactas** (`?layout=compact`) se o teste em celular mostrar necessidade.

### 15.2 Orçamentos

| Item | Limite |
|---|---|
| Peso total das imagens na primeira carga | ≤ 1,5 MB |
| Maior SVG individual | ≤ 350 KB |
| Animação de abertura | ≤ 5 s, executa uma vez |
| Micro-loops por peça | ≤ 2 |
| Resposta do Worker | ≤ 50 ms |
| Contraste de texto em SVG | ≥ 4.5:1 |

### 15.3 Matriz de testes

| Ambiente | Tema escuro | Tema claro | Reduzir movimento |
|---|---|---|---|
| Chrome (Windows) | ☐ | ☐ | ☐ |
| Firefox | ☐ | ☐ | ☐ |
| Safari (macOS/iOS) | ☐ | ☐ | ☐ |
| App GitHub (Android/iOS) | ☐ | ☐ | — |
| Leitor de tela (NVDA) | `alt` e ordem de leitura ☐ | | |
| Celular de 360 px | ☐ | ☐ | |

---

## 16. Roadmap por fases

| Fase | Entrega | Pronto quando… |
|---|---|---|
| **0 · Teste rápido** (½ dia) | Repositório de teste validando: `<picture>` claro/escuro, ` ```stl ` no perfil e dentro de `<details>`, ` ```geojson `, máscara animada no camo, fonte embutida, cabeçalhos `no-cache` | Cada técnica validada ✅ ou com plano B definido |
| **1 · Design system + Hero** | Tokens, fontes, seigaiha, sol, carimbo, `hero-{dark,light}.svg` (primeiro com onda provisória em código) | O Gustavo aprova o cabeçalho nos dois temas |
| **2 · Imagens da IA** | Gustavo gera A–F com os prompts da [§8](#8-prompts-para-a-ia-de-imagem); eu vetorizo e integro | Todas passam no checklist [§8.5](#85-checklist-de-aceitação-de-cada-imagem-gerada) |
| **3 · Seções estáticas** | Route, kamon, setores, How I ship, stack, rodapé, divisores, botões, mapa, 3D, escondidos | README completo funcionando sem nenhum serviço ao vivo |
| **4 · Ao vivo** | Worker + KV + cron Open-Meteo + `/conditions.svg` + `/telemetry.svg` + script do VPS + passo de CI | Dados reais aparecendo; teste de queda passa ("no signal") |
| **5 · Atividade** | Action diária + calendário seigaiha no branch `output` | Roda 3 dias seguidos sem falha |
| **6 · QA + lançamento** | Matriz de testes completa, CI de validação, revisão de textos e do japonês | Todos os critérios da [§2](#2-objetivos-não-objetivos-e-critérios-de-sucesso) ✅ → commit `log: ryūmon — the gate is open` |

**Paralelismo:** a Fase 2 (você gerando imagens) roda **ao mesmo tempo** que a Fase 1 (eu fazendo o design system). As peças em código não dependem das imagens.

---

## 17. Decisões pendentes / insumos do Gustavo

| # | Preciso de | Pra quê | Bloqueia |
|---|---|---|---|
| 1 | **Marcos da carreira com anos** (ex.: suporte/redes → infra → full-stack → IA → CTO) | Route | Fase 3 |
| 2 | **Endereços das lojas** (ou autorização para eu buscar) | Mapa | Fase 3 |
| 3 | **Carimbo:** katakana グスタボ (Gu-su-ta-bo, 2×2) **ou** monograma latino "GH" estilo carimbo | Hanko | Fase 1 |
| 4 | **Revisão do japonês** por um falante nativo antes do lançamento (carimbo, títulos) | Evitar gafe | Fase 6 |
| 5 | **Cloudflare** (conta) **ou VPS** para o serviço ao vivo | Worker | Fase 4 |
| 6 | **Lista de sistemas** que aparecem na telemetria (e quais têm CI com testes) | Telemetria | Fase 4 |
| 7 | Ligar **"Private contributions"** no perfil do GitHub | Atividade | Fase 5 |
| 8 | Qual **IA de imagem** você vai usar (pra eu ajustar os prompts se precisar) | Fase 2 | — |
| 9 | Números atuais validados (sistemas, testes, SKUs) | Telemetria estática | Fase 3 |

---

## 18. Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Ficar "fantasia demais" e o conteúdo se perder | Média | Alto | Princípios Ma/Kanso, proporção 80/20, teste dos 10 segundos em cada fase |
| A IA não entregar um dragão bom | Média | Médio | 3 rodadas → fallback em gravura de domínio público do Hokusai |
| Safari quebrar animação ou máscara | Média | Médio | Evitar `foreignObject`, testar na Fase 0, e o quadro final estático é sempre bonito sozinho |
| STL não renderizar no perfil | Baixa | Baixo | Plano B: arquivo `.stl` com link |
| Cache do camo atrasar o "ao vivo" | Alta | Baixo | Cabeçalhos `no-cache`; o design tolera minutos de atraso |
| Vazar algo da infraestrutura | Baixa | **Alto** | Modelo por envio, lista permitida, sem nenhum identificador técnico (§11.6) |
| Japonês errado ou culturalmente ofensivo | Baixa | Alto | Sem bandeira do sol com raios, kanji mínimo, revisão nativa |
| Peso alto deixando o perfil lento | Média | Médio | Orçamentos + CI que bloqueia |
| Manutenção virar fardo | Baixa | Médio | Tudo automatizado (Action, cron, CI). Se o Worker cair, o perfil degrada sem quebrar |

---

## 19. Ideias guardadas (fora do escopo, de propósito)

Kanso também é saber o que **não** entra agora:

| Ideia | Por que ficou de fora | Quando reconsiderar |
|---|---|---|
| **"Me traga um problema"** (issue → Claude responde com arquitetura) | Muito forte, mas tem custo, moderação e risco de prompt injection. Merece lançamento próprio | v2, como "segunda onda" de divulgação |
| **Kintsugi** (金継ぎ) para postmortems, com fissuras douradas | Bonito, mas seria o 5º motivo e quebra o Kanso | Se a seção Kaizen pedir mais peso |
| Abertura de cinema de 12 s | Atrasa o teste dos 10 segundos | Nunca no topo; talvez como vídeo no Off-duty |
| Cena de moto (asset G) | Opcional; o Off-duty já funciona | Se sobrar fôlego na Fase 3 |
| Carpas nadando no calendário de atividade | Bonito, mas pesado em SVG | v2 |

---

## 20. Apêndice: referência técnica do que o GitHub permite

**Removido do Markdown:** `<script>`, `<style>`, `style=""`, `class`, `<iframe>`, `<form>`, `<input>`, JavaScript de qualquer tipo.

**Permitido:** `div`, `table`, `img`, `a`, `picture/source` (com `prefers-color-scheme`), `details/summary`, `kbd`, `sub/sup`, `br`, atributos `align`, `width`, `height`, `alt`.

**SVG usado como `<img>`:**
- ✅ CSS dentro do SVG (`<style>`, `@keyframes`, media queries), SMIL, máscaras, filtros, gradientes, fontes embutidas em base64
- ❌ JavaScript, eventos (hover/clique), recursos externos (fontes e imagens por URL não carregam)
- ⚠️ `foreignObject` tem bugs no Safari

**Renderização nativa do GitHub em Markdown:** ` ```mermaid `, ` ```geojson `, ` ```topojson `, ` ```stl `, `$$ LaTeX $$`, alertas `> [!NOTE]`, notas de rodapé, vídeos MP4 enviados pelo editor.

**Imagens externas:** passam pelo proxy `camo.githubusercontent.com`, que guarda cache e desiste de respostas lentas. Conteúdo "ao vivo" precisa de `Cache-Control: no-cache` e resposta rápida.

---

<div align="center">

**竜門** · *the gate is the beginning, not the end.*

</div>
