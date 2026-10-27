<!--
  Five a.m. offshore —
  the pager sleeps, the swell builds.
  All green. I paddle.

  If you're reading the raw source, we'll get along. → gustavohuds@gmail.com
  (Every image on this page is hand-built SVG. Source: /build)
-->

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/hero-light.svg">
  <img width="100%" src="./assets/hero-dark.svg" alt="Ukiyo-e style great wave at sunrise with the name Gustavo Hudson, Chief Technology Officer, and a red hanko seal. Every line is hand-tuned SVG.">
</picture>

**CTO who builds.** I find the real business problem, ship the system that solves it,<br/>
and keep it running in production — across retail, fintech and entertainment.

<sub>Engineering from the easternmost point of the Americas — where the sun rises first.</sub>

<br/>

<a href="mailto:gustavohuds@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/btn-email-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/btn-email-light.svg"><img height="44" src="./assets/btn-email-dark.svg" alt="Email"></picture></a>
<a href="https://linkedin.com/in/gustavohsn"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/btn-linkedin-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/btn-linkedin-light.svg"><img height="44" src="./assets/btn-linkedin-dark.svg" alt="LinkedIn"></picture></a>
<a href="https://lojasbelmont.com.br"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/btn-live-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/btn-live-light.svg"><img height="44" src="./assets/btn-live-dark.svg" alt="Live in production: lojasbelmont.com.br"></picture></a>
<a href="https://github.com/GustavoHuds/Ttalk_bot_manager"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/btn-oss-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/btn-oss-light.svg"><img height="44" src="./assets/btn-oss-dark.svg" alt="Open source: Ttalk Bot Manager"></picture></a>

<sub>📍 João Pessoa, Brazil &nbsp;·&nbsp; 🌎 Remote / On-site &nbsp;·&nbsp; 🗣️ Portuguese & English &nbsp;·&nbsp; 🤝 Open to projects & partnerships</sub>

</div>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/divider-light.svg"><img width="100%" src="./assets/divider-dark.svg" alt=""></picture>

## 壱 · Impact

<div align="center">

| 🧩 **15+** | 🏬 **8 stores** | 🧪 **2,000+** | 📦 **1,600+** | 🔥 **780+** |
|:---:|:---:|:---:|:---:|:---:|
| systems designed, built<br/>and run in production | of a retail chain + a distribution<br/>center running on my software | automated tests in a<br/>single platform (BELeads) | SKUs unified into one<br/>catalog by my data pipeline | GitHub contributions<br/>(public + private) |

</div>

## 弐 · About

I'm the **CTO of Lojas Belmont**, a furniture and mattress retail chain in Paraíba, Brazil, and I own **everything technology**: strategy, architecture, code, infrastructure, security and support. When HR, sales, marketing, inventory or operations has a problem, I scope it, design it, ship it and keep it running.

Beyond retail, I've shipped platforms for **fintech** and **entertainment** with the same standard: production-grade, documented, tested, monitored.

```ts
const gustavo = {
  role:     "CTO — Chief Technology Officer @ Lojas Belmont",
  owns:     ["strategy", "architecture", "development", "infrastructure", "security", "support"],
  mission:  "Find the real business problem. Ship the solution. Own the result in production.",
  aiFirst:  ["engineering", "marketing", "sales", "prospecting", "analytics", "data extraction"],
  shipsTo:  "production — with docs, tests, security gates, monitoring and backups",
};
```

I don't use AI only to write code. **I run it as an operating system for the business:**

| Area | How I apply AI |
|------|----------------|
| 🧠 **Engineering** | Multi-agent workflows that plan, implement, review and test software behind production-grade gates |
| 📊 **Sales Analytics** | Lead extraction from WhatsApp/Instagram, conversion metrics, AI service scoring, weekly AI coaching per seller |
| 🎯 **Prospecting** | Google Maps lead collection, company enrichment, public-tender monitoring, AI-written outreach |
| 📄 **Data & Integrations** | Supplier PDFs, price tables and ERP reports turned into clean datasets; ERP, WhatsApp, Telegram, PIX |
| 🎨 **Marketing & Design** | AI product photography, campaign creatives, price posters, brand-consistent assets |
| 🔍 **SEO & Compliance** | Local SEO/GEO and AI-search visibility; consumer-law (CDC) review of promotions before print |

## 参 · Work by sector

> Every system below was **designed, built, deployed and operated by me**: requirements, architecture, code, infrastructure and documentation. Most are private company systems; **technical walkthroughs are available on request.**

### <picture><source media="(prefers-color-scheme: dark)" srcset="./assets/kamon-retail-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/kamon-retail-light.svg"><img width="30" align="top" src="./assets/kamon-retail-dark.svg" alt=""></picture> Retail · Lojas Belmont

<table>
<tr>
<td width="50%" valign="top">

#### ⏱️ BELPonto · `✅ Delivered`
**Workforce & time-attendance compliance platform**

Multi-company system with store kiosks, mobile PWA, geolocation, hours calculation, HR workflows, digital signatures, PDF reports, 2FA and an immutable audit trail.

- 🏛️ 53 architecture decisions + 26 security requirements
- 🔒 PostgreSQL **row-level security** per company
- ⚙️ Async workers: outbox, daily seal, data retention

`NestJS` `React PWA` `Prisma` `PostgreSQL` `MinIO` `Docker`

</td>
<td width="50%" valign="top">

#### 🎯 BELeads · `✅ Delivered`
**B2B prospecting & lead-generation platform**

Collects companies from Google Maps by Brazilian municipality, deduplicates and enriches them, and feeds a mobile call queue for the sales team.

- 🧪 **2,000+ automated tests**, 5 CI gates (Gitleaks, Semgrep, Trivy, E2E)
- 🤖 Claude-powered lead handling with human confirmation
- 🏛️ Public-tender monitoring + Telegram alerts

`NestJS` `React` `pg-boss` `Prisma` `PostgreSQL` `Leaflet` `Claude`

</td>
</tr>
<tr>
<td width="50%" valign="top">

#### 🌐 [Lojas Belmont Website](https://lojasbelmont.com.br) · `✅ Live`
**Conversion-focused digital storefront**

Product catalog, nearest-store routing, weekly promotions, admin panel, Google-review campaign, NPS surveys and local SEO/GEO.

- ⚡ **Lighthouse 94+**, optimized image pipeline
- 📍 Local SEO across every store location
- 🛠️ Full admin panel for the marketing team

`Next.js` `Prisma` `PostgreSQL` `Sharp` `Docker`

</td>
<td width="50%" valign="top">

#### 📊 ExtractNeoron · `✅ Delivered`
**AI sales-intelligence dashboard**

Extracts every lead from WhatsApp, Instagram DM and web chat, ranks the pipeline by urgency and builds the 24h call-back queue.

- 📈 Team conversion, first-response time and ticket metrics
- 🤖 AI service score per conversation
- 🧑‍🏫 **Weekly AI coaching report** per seller

`Node.js` `Express` `Firebase` `Claude Agent SDK`

</td>
</tr>
</table>

| Also in retail | What it does | Stack |
|---|---|---|
| 🏷️ **BELPreço** | Price-poster & shelf-label generator with brand templates and Code 128 barcodes. Any employee prints a correct poster in **under 1 minute**. | React · TS · Vite · Zustand |
| 📚 **Catalog Data Pipeline** | Consolidates supplier price PDFs and ERP exports into a **1,600+ SKU** catalog with AI-assisted product imagery. | Python · PDF parsing · AI imaging |
| 🧠 **BINAH** | Operational knowledge platform: documentation, troubleshooting, procedures and AI search. | React · AI Search |

<details>
<summary>🗺️ <b>Where this software runs</b> — interactive map of the stores</summary>

```geojson
{
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-34.8856, -7.1192] }, "properties": { "title": "Lojas Belmont · Centro", "description": "João Pessoa, PB", "marker-color": "#2563EB", "marker-symbol": "shop" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-34.8406, -7.1756] }, "properties": { "title": "Lojas Belmont + Belmont Colchões · Mangabeira", "description": "João Pessoa, PB · 2 units", "marker-color": "#2563EB", "marker-symbol": "shop" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-34.9115, -7.1923] }, "properties": { "title": "Belmont Distribuidora", "description": "Distrito Industrial, João Pessoa, PB · distribution center", "marker-color": "#B5122A", "marker-symbol": "warehouse" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-34.9146, -7.1225] }, "properties": { "title": "Lojas Belmont · Bayeux", "description": "Bayeux, PB", "marker-color": "#2563EB", "marker-symbol": "shop" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-35.3349, -7.3295] }, "properties": { "title": "Lojas Belmont · Itabaiana", "description": "Itabaiana, PB", "marker-color": "#2563EB", "marker-symbol": "shop" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-35.1229, -6.8369] }, "properties": { "title": "Lojas Belmont · Mamanguape", "description": "Mamanguape, PB", "marker-color": "#2563EB", "marker-symbol": "shop" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-35.1184, -7.4046] }, "properties": { "title": "Lojas Belmont · Itambé", "description": "Itambé, PE", "marker-color": "#2563EB", "marker-symbol": "shop" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-35.8913, -7.2156] }, "properties": { "title": "Belmont Colchões · Campina Grande", "description": "Campina Grande, PB", "marker-color": "#2563EB", "marker-symbol": "shop" } }
  ]
}
```

<sub>Rendered natively by GitHub. Pins are approximate.</sub>

</details>

### <picture><source media="(prefers-color-scheme: dark)" srcset="./assets/kamon-fintech-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/kamon-fintech-light.svg"><img width="30" align="top" src="./assets/kamon-fintech-dark.svg" alt=""></picture> Fintech

| Project | What it does | Stack |
|---|---|---|
| 💰 **NinjaCash** | Lending management platform: client portal, PIX payments, credit scoring, analytics and automated WhatsApp reminders. | Next.js · Express · PostgreSQL |

### <picture><source media="(prefers-color-scheme: dark)" srcset="./assets/kamon-entertainment-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/kamon-entertainment-light.svg"><img width="30" align="top" src="./assets/kamon-entertainment-dark.svg" alt=""></picture> Entertainment

| Project | What it does | Stack |
|---|---|---|
| 🎁 **Txintxa do Gigi** | Influencer affiliate platform with raffles and live bingo: real-time draws, payment validation and analytics. | NestJS · React 19 · BullMQ · Socket.IO · R2 |

### <picture><source media="(prefers-color-scheme: dark)" srcset="./assets/kamon-platforms-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/kamon-platforms-light.svg"><img width="30" align="top" src="./assets/kamon-platforms-dark.svg" alt=""></picture> Platforms, infra & open source

| Project | What it does | Stack |
|---|---|---|
| 🛡️ **Belmont Monitor** | Private observability & security stack: uptime, logs, intrusion detection, 2FA panels, daily backups, custom Telegram bot. Runs in **~420 MB RAM**. | Docker · Caddy · Authelia · CrowdSec · Python |
| 💬 **[Ttalk Bot Manager](https://github.com/GustavoHuds/Ttalk_bot_manager)** `OSS` | Self-hosted WhatsApp bots for small businesses (CV collection + group management) from one web panel. | TypeScript · Fastify · Baileys · SQLite |
| 🧭 **Cockpit** | Local-first AI engineering cockpit: monitors Git repos, analyzes progress with Claude, forecasts delivery. | Fastify · Next.js · Prisma · Recharts |
| 📍 **MAPservice** | Service-management platform with WhatsApp messaging, campaigns, contact capture and anti-ban rate limiting. | FastAPI · Next.js · PostgreSQL |
| 🔎 **Google Maps Scraper Kit** | Plug-and-play kit that lets an AI agent run Google Maps searches on autopilot and return clean lead lists. | Docker · Claude Skills |
| 📶 **WifiLive** | Real-time Wi-Fi site-survey tool (RSSI, latency, interference) to find dead zones and the best AP placement. | Node.js · Networking |

## 肆 · How I ship

| 段取り **Dandori** · *Preparation* | 検証 **Kenshō** · *Verification* | 改善 **Kaizen** · *Continuous improvement* |
|---|---|---|
| *"Preparation is 80% of the work."* Scope and acceptance criteria, architecture decision records, security requirements per system, threat-aware data modeling. | Unit, integration and E2E tests. Secret, SAST and container scanning. Code review on every change. Staged rollouts with rollback plans. | Monitoring, alerts and an on-call bot. Automated backups with restore drills. Runbooks and user manuals. Every incident makes the system stronger. |

## 伍 · Stack

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/stack-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/stack-light.svg">
  <img width="100%" src="./assets/stack-dark.svg" alt="Production stack. Core: TypeScript, Node.js, Python, Go, NestJS, Fastify, React, Next.js. Data: PostgreSQL, Prisma, Redis, SQLite. AI: Anthropic, Claude Agent SDK, MCP, OpenAI. Ops and security: Docker, Linux, Caddy, Authelia, CrowdSec, GitHub Actions, Trivy, Semgrep, Gitleaks. Integrations: WhatsApp, Telegram, PIX, Google Maps, ERP.">
</picture>

<sub>Only what runs in production today. Everything else lives in the index below.</sub>

<details>
<summary>📚 <b>Full expertise index</b></summary>

<br/>

**Leadership & business** — CTO · IT governance · technology strategy & digital transformation · team leadership & mentoring · process mapping · requirements & product management · vendor & ERP relationships · IT budgeting · retail operations, sales & inventory

**Software engineering** — full-stack · backend & REST/SOAP APIs · architecture & monorepos · multi-tenant systems & row-level security · queues & workers · real-time (WebSockets) · PWAs · automated testing · code review · technical writing · also: Java, Go (multi-agent systems)

**AI** — LLM applications · agents & multi-agent workflows · AI-assisted development · structured outputs · AI for marketing, content and data extraction · AI sales analytics & coaching

**Integrations & automation** — ERP (API, SOAP, files & RPA) · WhatsApp & Telegram bots · PIX payments · scraping & enrichment · ETL pipelines · workflow automation

**Infrastructure & security** — Linux administration · VPS hardening · Docker · CI/CD · monitoring & alerting · backup, restore & DR · secure-by-design · 2FA & access control · intrusion detection · vulnerability & secret scanning · LGPD-aware data handling

**Networks & hardware** — LAN/WAN, TCP/IP, DNS, DHCP · Wi-Fi design & site surveys · VPN, firewalls & routing · kiosks, printers & barcode devices · IoT (Arduino, Raspberry Pi)

**Marketing & design** — marketing technology · SEO, local SEO & GEO · Analytics & Search Console · brand identity & design systems · UI/UX · lead generation

</details>

## 陸 · Activity

<div align="center">

<img width="100%" src="https://ghchart.rshah.org/2563EB/GustavoHuds" alt="GitHub contribution calendar">

<sub>Most of my work lives in private company repositories. Contributions include private activity.</sub>

</div>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg"><source media="(prefers-color-scheme: light)" srcset="./assets/divider-light.svg"><img width="100%" src="./assets/divider-dark.svg" alt=""></picture>

<details>
<summary>🌊 <b>Off-duty</b></summary>

<br/>

```console
$ cto --off-duty
> status ........ offline (by choice)
> sea ........... dawn sessions when the swell shows up
> land .......... trails, mountains, anything with a view at the top
> road .......... two wheels or four, windows down
> belief ........ the best architecture ideas show up 1.5 m offshore at 5 a.m.
```

**Drag to rotate.** Yes, this is a 3D model, rendered natively by GitHub. Generated in code: [`build/surfboard.mjs`](./build/surfboard.mjs).

<!-- stl:start -->

```stl
solid surfboard
facet normal -0.277 0.713 0.644
outer loop
vertex -90.000 8.640 0.194
vertex -90.000 7.482 1.477
vertex -81.429 10.712 1.583
endloop
endfacet
facet normal -0.271 0.641 0.718
outer loop
vertex -90.000 8.640 0.194
vertex -81.429 10.712 1.583
vertex -81.429 12.369 0.105
endloop
endfacet
facet normal -0.051 0.141 0.989
outer loop
vertex -90.000 7.482 1.477
vertex -90.000 4.320 1.929
vertex -81.429 6.184 2.104
endloop
endfacet
facet normal -0.055 0.114 0.992
outer loop
vertex -90.000 7.482 1.477
vertex -81.429 6.184 2.104
vertex -81.429 10.712 1.583
endloop
endfacet
facet normal -0.023 0.033 0.999
outer loop
vertex -90.000 4.320 1.929
vertex -90.000 0.000 2.072
vertex -81.429 0.000 2.268
endloop
endfacet
facet normal -0.026 0.027 0.999
outer loop
vertex -90.000 4.320 1.929
vertex -81.429 0.000 2.268
vertex -81.429 6.184 2.104
endloop
endfacet
facet normal -0.028 -0.033 0.999
outer loop
vertex -90.000 0.000 2.072
vertex -90.000 -4.320 1.929
vertex -81.429 -6.184 2.104
endloop
endfacet
facet normal -0.023 -0.027 0.999
outer loop
vertex -90.000 0.000 2.072
vertex -81.429 -6.184 2.104
vertex -81.429 0.000 2.268
endloop
endfacet
facet normal -0.065 -0.141 0.988
outer loop
vertex -90.000 -4.320 1.929
vertex -90.000 -7.482 1.477
vertex -81.429 -10.712 1.583
endloop
endfacet
facet normal -0.045 -0.114 0.992
outer loop
vertex -90.000 -4.320 1.929
vertex -81.429 -10.712 1.583
vertex -81.429 -6.184 2.104
endloop
endfacet
facet normal -0.301 -0.708 0.639
outer loop
vertex -90.000 -7.482 1.477
vertex -90.000 -8.640 0.194
vertex -81.429 -12.369 0.105
endloop
endfacet
facet normal -0.252 -0.644 0.722
outer loop
vertex -90.000 -7.482 1.477
vertex -81.429 -12.369 0.105
vertex -81.429 -10.712 1.583
endloop
endfacet
facet normal -0.268 -0.657 -0.705
outer loop
vertex -90.000 -8.640 0.194
vertex -90.000 -7.482 -0.884
vertex -81.429 -10.712 -1.137
endloop
endfacet
facet normal -0.260 -0.579 -0.773
outer loop
vertex -90.000 -8.640 0.194
vertex -81.429 -10.712 -1.137
vertex -81.429 -12.369 0.105
endloop
endfacet
facet normal -0.079 -0.184 -0.980
outer loop
vertex -90.000 -7.482 -0.884
vertex -90.000 -4.320 -1.479
vertex -81.429 -6.184 -1.823
endloop
endfacet
facet normal -0.085 -0.149 -0.985
outer loop
vertex -90.000 -7.482 -0.884
vertex -81.429 -6.184 -1.823
vertex -81.429 -10.712 -1.137
endloop
endfacet
facet normal -0.044 -0.047 -0.998
outer loop
vertex -90.000 -4.320 -1.479
vertex -90.000 -0.000 -1.683
vertex -81.429 -0.000 -2.058
endloop
endfacet
facet normal -0.048 -0.038 -0.998
outer loop
vertex -90.000 -4.320 -1.479
vertex -81.429 -0.000 -2.058
vertex -81.429 -6.184 -1.823
endloop
endfacet
facet normal -0.050 0.047 -0.998
outer loop
vertex -90.000 -0.000 -1.683
vertex -90.000 4.320 -1.479
vertex -81.429 6.184 -1.823
endloop
endfacet
facet normal -0.044 0.038 -0.998
outer loop
vertex -90.000 -0.000 -1.683
vertex -81.429 6.184 -1.823
vertex -81.429 -0.000 -2.058
endloop
endfacet
facet normal -0.098 0.184 -0.978
outer loop
vertex -90.000 4.320 -1.479
vertex -90.000 7.482 -0.884
vertex -81.429 10.712 -1.137
endloop
endfacet
facet normal -0.072 0.149 -0.986
outer loop
vertex -90.000 4.320 -1.479
vertex -81.429 10.712 -1.137
vertex -81.429 6.184 -1.823
endloop
endfacet
facet normal -0.291 0.652 -0.700
outer loop
vertex -90.000 7.482 -0.884
vertex -90.000 8.640 0.194
vertex -81.429 12.369 0.105
endloop
endfacet
facet normal -0.242 0.582 -0.776
outer loop
vertex -90.000 7.482 -0.884
vertex -81.429 12.369 0.105
vertex -81.429 10.712 -1.137
endloop
endfacet
facet normal -0.155 0.657 0.737
outer loop
vertex -81.429 12.369 0.105
vertex -81.429 10.712 1.583
vertex -72.857 12.594 1.701
endloop
endfacet
facet normal -0.157 0.640 0.752
outer loop
vertex -81.429 12.369 0.105
vertex -72.857 12.594 1.701
vertex -72.857 14.542 0.043
endloop
endfacet
facet normal -0.036 0.114 0.993
outer loop
vertex -81.429 10.712 1.583
vertex -81.429 6.184 2.104
vertex -72.857 7.271 2.286
endloop
endfacet
facet normal -0.038 0.109 0.993
outer loop
vertex -81.429 10.712 1.583
vertex -72.857 7.271 2.286
vertex -72.857 12.594 1.701
endloop
endfacet
facet normal -0.024 0.027 0.999
outer loop
vertex -81.429 6.184 2.104
vertex -81.429 0.000 2.268
vertex -72.857 0.000 2.470
endloop
endfacet
facet normal -0.024 0.025 0.999
outer loop
vertex -81.429 6.184 2.104
vertex -72.857 0.000 2.470
vertex -72.857 7.271 2.286
endloop
endfacet
facet normal -0.025 -0.027 0.999
outer loop
vertex -81.429 0.000 2.268
vertex -81.429 -6.184 2.104
vertex -72.857 -7.271 2.286
endloop
endfacet
facet normal -0.024 -0.025 0.999
outer loop
vertex -81.429 0.000 2.268
vertex -72.857 -7.271 2.286
vertex -72.857 0.000 2.470
endloop
endfacet
facet normal -0.039 -0.114 0.993
outer loop
vertex -81.429 -6.184 2.104
vertex -81.429 -10.712 1.583
vertex -72.857 -12.594 1.701
endloop
endfacet
facet normal -0.035 -0.109 0.993
outer loop
vertex -81.429 -6.184 2.104
vertex -72.857 -12.594 1.701
vertex -72.857 -7.271 2.286
endloop
endfacet
facet normal -0.161 -0.657 0.737
outer loop
vertex -81.429 -10.712 1.583
vertex -81.429 -12.369 0.105
vertex -72.857 -14.542 0.043
endloop
endfacet
facet normal -0.151 -0.641 0.753
outer loop
vertex -81.429 -10.712 1.583
vertex -72.857 -14.542 0.043
vertex -72.857 -12.594 1.701
endloop
endfacet
facet normal -0.150 -0.593 -0.791
outer loop
vertex -81.429 -12.369 0.105
vertex -81.429 -10.712 -1.137
vertex -72.857 -12.594 -1.351
endloop
endfacet
facet normal -0.152 -0.575 -0.804
outer loop
vertex -81.429 -12.369 0.105
vertex -72.857 -12.594 -1.351
vertex -72.857 -14.542 0.043
endloop
endfacet
facet normal -0.053 -0.150 -0.987
outer loop
vertex -81.429 -10.712 -1.137
vertex -81.429 -6.184 -1.823
vertex -72.857 -7.271 -2.120
endloop
endfacet
facet normal -0.056 -0.143 -0.988
outer loop
vertex -81.429 -10.712 -1.137
vertex -72.857 -7.271 -2.120
vertex -72.857 -12.594 -1.351
endloop
endfacet
facet normal -0.038 -0.038 -0.999
outer loop
vertex -81.429 -6.184 -1.823
vertex -81.429 -0.000 -2.058
vertex -72.857 -0.000 -2.384
endloop
endfacet
facet normal -0.039 -0.036 -0.999
outer loop
vertex -81.429 -6.184 -1.823
vertex -72.857 -0.000 -2.384
vertex -72.857 -7.271 -2.120
endloop
endfacet
facet normal -0.039 0.038 -0.999
outer loop
vertex -81.429 -0.000 -2.058
vertex -81.429 6.184 -1.823
vertex -72.857 7.271 -2.120
endloop
endfacet
facet normal -0.038 0.036 -0.999
outer loop
vertex -81.429 -0.000 -2.058
vertex -72.857 7.271 -2.120
vertex -72.857 -0.000 -2.384
endloop
endfacet
facet normal -0.057 0.149 -0.987
outer loop
vertex -81.429 6.184 -1.823
vertex -81.429 10.712 -1.137
vertex -72.857 12.594 -1.351
endloop
endfacet
facet normal -0.052 0.143 -0.988
outer loop
vertex -81.429 6.184 -1.823
vertex -72.857 12.594 -1.351
vertex -72.857 7.271 -2.120
endloop
endfacet
facet normal -0.156 0.593 -0.790
outer loop
vertex -81.429 10.712 -1.137
vertex -81.429 12.369 0.105
vertex -72.857 14.542 0.043
endloop
endfacet
facet normal -0.146 0.576 -0.804
outer loop
vertex -81.429 10.712 -1.137
vertex -72.857 14.542 0.043
vertex -72.857 12.594 -1.351
endloop
endfacet
facet normal -0.142 0.641 0.754
outer loop
vertex -72.857 14.542 0.043
vertex -72.857 12.594 1.701
vertex -64.286 14.348 1.826
endloop
endfacet
facet normal -0.145 0.627 0.765
outer loop
vertex -72.857 14.542 0.043
vertex -64.286 14.348 1.826
vertex -64.286 16.568 0.008
endloop
endfacet
facet normal -0.034 0.109 0.993
outer loop
vertex -72.857 12.594 1.701
vertex -72.857 7.271 2.286
vertex -64.286 8.284 2.468
endloop
endfacet
facet normal -0.036 0.105 0.994
outer loop
vertex -72.857 12.594 1.701
vertex -64.286 8.284 2.468
vertex -64.286 14.348 1.826
endloop
endfacet
facet normal -0.023 0.025 0.999
outer loop
vertex -72.857 7.271 2.286
vertex -72.857 0.000 2.470
vertex -64.286 0.000 2.670
endloop
endfacet
facet normal -0.024 0.024 0.999
outer loop
vertex -72.857 7.271 2.286
vertex -64.286 0.000 2.670
vertex -64.286 8.284 2.468
endloop
endfacet
facet normal -0.024 -0.025 0.999
outer loop
vertex -72.857 0.000 2.470
vertex -72.857 -7.271 2.286
vertex -64.286 -8.284 2.468
endloop
endfacet
facet normal -0.023 -0.024 0.999
outer loop
vertex -72.857 0.000 2.470
vertex -64.286 -8.284 2.468
vertex -64.286 0.000 2.670
endloop
endfacet
facet normal -0.037 -0.109 0.993
outer loop
vertex -72.857 -7.271 2.286
vertex -72.857 -12.594 1.701
vertex -64.286 -14.348 1.826
endloop
endfacet
facet normal -0.034 -0.105 0.994
outer loop
vertex -72.857 -7.271 2.286
vertex -64.286 -14.348 1.826
vertex -64.286 -8.284 2.468
endloop
endfacet
facet normal -0.148 -0.641 0.753
outer loop
vertex -72.857 -12.594 1.701
vertex -72.857 -14.542 0.043
vertex -64.286 -16.568 0.008
endloop
endfacet
facet normal -0.140 -0.627 0.766
outer loop
vertex -72.857 -12.594 1.701
vertex -64.286 -16.568 0.008
vertex -64.286 -14.348 1.826
endloop
endfacet
facet normal -0.134 -0.577 -0.806
outer loop
vertex -72.857 -14.542 0.043
vertex -72.857 -12.594 -1.351
vertex -64.286 -14.348 -1.521
endloop
endfacet
facet normal -0.136 -0.562 -0.816
outer loop
vertex -72.857 -14.542 0.043
vertex -64.286 -14.348 -1.521
vertex -64.286 -16.568 0.008
endloop
endfacet
facet normal -0.045 -0.143 -0.989
outer loop
vertex -72.857 -12.594 -1.351
vertex -72.857 -7.271 -2.120
vertex -64.286 -8.284 -2.364
endloop
endfacet
facet normal -0.048 -0.138 -0.989
outer loop
vertex -72.857 -12.594 -1.351
vertex -64.286 -8.284 -2.364
vertex -64.286 -14.348 -1.521
endloop
endfacet
facet normal -0.031 -0.036 -0.999
outer loop
vertex -72.857 -7.271 -2.120
vertex -72.857 -0.000 -2.384
vertex -64.286 -0.000 -2.654
endloop
endfacet
facet normal -0.033 -0.035 -0.999
outer loop
vertex -72.857 -7.271 -2.120
vertex -64.286 -0.000 -2.654
vertex -64.286 -8.284 -2.364
endloop
endfacet
facet normal -0.033 0.036 -0.999
outer loop
vertex -72.857 -0.000 -2.384
vertex -72.857 7.271 -2.120
vertex -64.286 8.284 -2.364
endloop
endfacet
facet normal -0.031 0.035 -0.999
outer loop
vertex -72.857 -0.000 -2.384
vertex -64.286 8.284 -2.364
vertex -64.286 -0.000 -2.654
endloop
endfacet
facet normal -0.049 0.143 -0.989
outer loop
vertex -72.857 7.271 -2.120
vertex -72.857 12.594 -1.351
vertex -64.286 14.348 -1.521
endloop
endfacet
facet normal -0.044 0.138 -0.989
outer loop
vertex -72.857 7.271 -2.120
vertex -64.286 14.348 -1.521
vertex -64.286 8.284 -2.364
endloop
endfacet
facet normal -0.139 0.576 -0.805
outer loop
vertex -72.857 12.594 -1.351
vertex -72.857 14.542 0.043
vertex -64.286 16.568 0.008
endloop
endfacet
facet normal -0.131 0.562 -0.816
outer loop
vertex -72.857 12.594 -1.351
vertex -64.286 16.568 0.008
vertex -64.286 14.348 -1.521
endloop
endfacet
facet normal -0.203 0.620 0.757
outer loop
vertex -64.286 16.568 0.008
vertex -64.286 14.348 1.826
vertex -55.714 17.003 1.954
endloop
endfacet
facet normal -0.208 0.583 0.785
outer loop
vertex -64.286 16.568 0.008
vertex -55.714 17.003 1.954
vertex -55.714 19.633 0.000
endloop
endfacet
facet normal -0.039 0.105 0.994
outer loop
vertex -64.286 14.348 1.826
vertex -64.286 8.284 2.468
vertex -55.714 9.816 2.643
endloop
endfacet
facet normal -0.044 0.095 0.994
outer loop
vertex -64.286 14.348 1.826
vertex -55.714 9.816 2.643
vertex -55.714 17.003 1.954
endloop
endfacet
facet normal -0.022 0.024 0.999
outer loop
vertex -64.286 8.284 2.468
vertex -64.286 0.000 2.670
vertex -55.714 0.000 2.861
endloop
endfacet
facet normal -0.024 0.022 0.999
outer loop
vertex -64.286 8.284 2.468
vertex -55.714 0.000 2.861
vertex -55.714 9.816 2.643
endloop
endfacet
facet normal -0.025 -0.024 0.999
outer loop
vertex -64.286 0.000 2.670
vertex -64.286 -8.284 2.468
vertex -55.714 -9.816 2.643
endloop
endfacet
facet normal -0.022 -0.022 1.000
outer loop
vertex -64.286 0.000 2.670
vertex -55.714 -9.816 2.643
vertex -55.714 0.000 2.861
endloop
endfacet
facet normal -0.047 -0.105 0.993
outer loop
vertex -64.286 -8.284 2.468
vertex -64.286 -14.348 1.826
vertex -55.714 -17.003 1.954
endloop
endfacet
facet normal -0.037 -0.095 0.995
outer loop
vertex -64.286 -8.284 2.468
vertex -55.714 -17.003 1.954
vertex -55.714 -9.816 2.643
endloop
endfacet
facet normal -0.220 -0.618 0.755
outer loop
vertex -64.286 -14.348 1.826
vertex -64.286 -16.568 0.008
vertex -55.714 -19.633 0.000
endloop
endfacet
facet normal -0.193 -0.585 0.788
outer loop
vertex -64.286 -14.348 1.826
vertex -55.714 -19.633 0.000
vertex -55.714 -17.003 1.954
endloop
endfacet
facet normal -0.184 -0.558 -0.809
outer loop
vertex -64.286 -16.568 0.008
vertex -64.286 -14.348 -1.521
vertex -55.714 -17.003 -1.643
endloop
endfacet
facet normal -0.187 -0.520 -0.833
outer loop
vertex -64.286 -16.568 0.008
vertex -55.714 -17.003 -1.643
vertex -55.714 -19.633 0.000
endloop
endfacet
facet normal -0.046 -0.138 -0.989
outer loop
vertex -64.286 -14.348 -1.521
vertex -64.286 -8.284 -2.364
vertex -55.714 -9.816 -2.550
endloop
endfacet
facet normal -0.053 -0.125 -0.991
outer loop
vertex -64.286 -14.348 -1.521
vertex -55.714 -9.816 -2.550
vertex -55.714 -17.003 -1.643
endloop
endfacet
facet normal -0.024 -0.035 -0.999
outer loop
vertex -64.286 -8.284 -2.364
vertex -64.286 -0.000 -2.654
vertex -55.714 -0.000 -2.861
endloop
endfacet
facet normal -0.027 -0.032 -0.999
outer loop
vertex -64.286 -8.284 -2.364
vertex -55.714 -0.000 -2.861
vertex -55.714 -9.816 -2.550
endloop
endfacet
facet normal -0.028 0.035 -0.999
outer loop
vertex -64.286 -0.000 -2.654
vertex -64.286 8.284 -2.364
vertex -55.714 9.816 -2.550
endloop
endfacet
facet normal -0.024 0.032 -0.999
outer loop
vertex -64.286 -0.000 -2.654
vertex -55.714 9.816 -2.550
vertex -55.714 -0.000 -2.861
endloop
endfacet
facet normal -0.057 0.138 -0.989
outer loop
vertex -64.286 8.284 -2.364
vertex -64.286 14.348 -1.521
vertex -55.714 17.003 -1.643
endloop
endfacet
facet normal -0.044 0.125 -0.991
outer loop
vertex -64.286 8.284 -2.364
vertex -55.714 17.003 -1.643
vertex -55.714 9.816 -2.550
endloop
endfacet
facet normal -0.200 0.556 -0.807
outer loop
vertex -64.286 14.348 -1.521
vertex -64.286 16.568 0.008
vertex -55.714 19.633 0.000
endloop
endfacet
facet normal -0.174 0.522 -0.835
outer loop
vertex -64.286 14.348 -1.521
vertex -55.714 19.633 0.000
vertex -55.714 17.003 -1.643
endloop
endfacet
facet normal -0.122 0.592 0.797
outer loop
vertex -55.714 19.633 0.000
vertex -55.714 17.003 1.954
vertex -47.143 18.631 2.061
endloop
endfacet
facet normal -0.127 0.577 0.807
outer loop
vertex -55.714 19.633 0.000
vertex -47.143 18.631 2.061
vertex -47.143 21.513 0.000
endloop
endfacet
facet normal -0.027 0.095 0.995
outer loop
vertex -55.714 17.003 1.954
vertex -55.714 9.816 2.643
vertex -47.143 10.757 2.788
endloop
endfacet
facet normal -0.030 0.092 0.995
outer loop
vertex -55.714 17.003 1.954
vertex -47.143 10.757 2.788
vertex -47.143 18.631 2.061
endloop
endfacet
facet normal -0.018 0.022 1.000
outer loop
vertex -55.714 9.816 2.643
vertex -55.714 0.000 2.861
vertex -47.143 0.000 3.018
endloop
endfacet
facet normal -0.019 0.021 1.000
outer loop
vertex -55.714 9.816 2.643
vertex -47.143 0.000 3.018
vertex -47.143 10.757 2.788
endloop
endfacet
facet normal -0.019 -0.022 1.000
outer loop
vertex -55.714 0.000 2.861
vertex -55.714 -9.816 2.643
vertex -47.143 -10.757 2.788
endloop
endfacet
facet normal -0.018 -0.021 1.000
outer loop
vertex -55.714 0.000 2.861
vertex -47.143 -10.757 2.788
vertex -47.143 0.000 3.018
endloop
endfacet
facet normal -0.031 -0.095 0.995
outer loop
vertex -55.714 -9.816 2.643
vertex -55.714 -17.003 1.954
vertex -47.143 -18.631 2.061
endloop
endfacet
facet normal -0.027 -0.092 0.995
outer loop
vertex -55.714 -9.816 2.643
vertex -47.143 -18.631 2.061
vertex -47.143 -10.757 2.788
endloop
endfacet
facet normal -0.130 -0.591 0.796
outer loop
vertex -55.714 -17.003 1.954
vertex -55.714 -19.633 0.000
vertex -47.143 -21.513 0.000
endloop
endfacet
facet normal -0.120 -0.577 0.808
outer loop
vertex -55.714 -17.003 1.954
vertex -47.143 -21.513 0.000
vertex -47.143 -18.631 2.061
endloop
endfacet
facet normal -0.109 -0.527 -0.843
outer loop
vertex -55.714 -19.633 0.000
vertex -55.714 -17.003 -1.643
vertex -47.143 -18.631 -1.733
endloop
endfacet
facet normal -0.112 -0.512 -0.852
outer loop
vertex -55.714 -19.633 0.000
vertex -47.143 -18.631 -1.733
vertex -47.143 -21.513 0.000
endloop
endfacet
facet normal -0.030 -0.125 -0.992
outer loop
vertex -55.714 -17.003 -1.643
vertex -55.714 -9.816 -2.550
vertex -47.143 -10.757 -2.690
endloop
endfacet
facet normal -0.033 -0.121 -0.992
outer loop
vertex -55.714 -17.003 -1.643
vertex -47.143 -10.757 -2.690
vertex -47.143 -18.631 -1.733
endloop
endfacet
facet normal -0.018 -0.032 -0.999
outer loop
vertex -55.714 -9.816 -2.550
vertex -55.714 -0.000 -2.861
vertex -47.143 -0.000 -3.018
endloop
endfacet
facet normal -0.020 -0.030 -0.999
outer loop
vertex -55.714 -9.816 -2.550
vertex -47.143 -0.000 -3.018
vertex -47.143 -10.757 -2.690
endloop
endfacet
facet normal -0.020 0.032 -0.999
outer loop
vertex -55.714 -0.000 -2.861
vertex -55.714 9.816 -2.550
vertex -47.143 10.757 -2.690
endloop
endfacet
facet normal -0.018 0.030 -0.999
outer loop
vertex -55.714 -0.000 -2.861
vertex -47.143 10.757 -2.690
vertex -47.143 -0.000 -3.018
endloop
endfacet
facet normal -0.034 0.125 -0.992
outer loop
vertex -55.714 9.816 -2.550
vertex -55.714 17.003 -1.643
vertex -47.143 18.631 -1.733
endloop
endfacet
facet normal -0.029 0.121 -0.992
outer loop
vertex -55.714 9.816 -2.550
vertex -47.143 18.631 -1.733
vertex -47.143 10.757 -2.690
endloop
endfacet
facet normal -0.115 0.526 -0.842
outer loop
vertex -55.714 17.003 -1.643
vertex -55.714 19.633 0.000
vertex -47.143 21.513 0.000
endloop
endfacet
facet normal -0.106 0.512 -0.852
outer loop
vertex -55.714 17.003 -1.643
vertex -47.143 21.513 0.000
vertex -47.143 18.631 -1.733
endloop
endfacet
facet normal -0.023 0.582 0.813
outer loop
vertex -47.143 21.513 0.000
vertex -47.143 18.631 2.061
vertex -38.571 18.865 2.136
endloop
endfacet
facet normal -0.019 0.591 0.807
outer loop
vertex -47.143 21.513 0.000
vertex -38.571 18.865 2.136
vertex -38.571 21.784 0.000
endloop
endfacet
facet normal -0.013 0.092 0.996
outer loop
vertex -47.143 18.631 2.061
vertex -47.143 10.757 2.788
vertex -38.571 10.892 2.890
endloop
endfacet
facet normal -0.011 0.094 0.995
outer loop
vertex -47.143 18.631 2.061
vertex -38.571 10.892 2.890
vertex -38.571 18.865 2.136
endloop
endfacet
facet normal -0.013 0.021 1.000
outer loop
vertex -47.143 10.757 2.788
vertex -47.143 0.000 3.018
vertex -38.571 0.000 3.128
endloop
endfacet
facet normal -0.012 0.022 1.000
outer loop
vertex -47.143 10.757 2.788
vertex -38.571 0.000 3.128
vertex -38.571 10.892 2.890
endloop
endfacet
facet normal -0.012 -0.021 1.000
outer loop
vertex -47.143 0.000 3.018
vertex -47.143 -10.757 2.788
vertex -38.571 -10.892 2.890
endloop
endfacet
facet normal -0.013 -0.022 1.000
outer loop
vertex -47.143 0.000 3.018
vertex -38.571 -10.892 2.890
vertex -38.571 0.000 3.128
endloop
endfacet
facet normal -0.011 -0.092 0.996
outer loop
vertex -47.143 -10.757 2.788
vertex -47.143 -18.631 2.061
vertex -38.571 -18.865 2.136
endloop
endfacet
facet normal -0.013 -0.094 0.995
outer loop
vertex -47.143 -10.757 2.788
vertex -38.571 -18.865 2.136
vertex -38.571 -10.892 2.890
endloop
endfacet
facet normal -0.018 -0.582 0.813
outer loop
vertex -47.143 -18.631 2.061
vertex -47.143 -21.513 0.000
vertex -38.571 -21.784 0.000
endloop
endfacet
facet normal -0.023 -0.591 0.807
outer loop
vertex -47.143 -18.631 2.061
vertex -38.571 -21.784 0.000
vertex -38.571 -18.865 2.136
endloop
endfacet
facet normal -0.020 -0.515 -0.857
outer loop
vertex -47.143 -21.513 0.000
vertex -47.143 -18.631 -1.733
vertex -38.571 -18.865 -1.797
endloop
endfacet
facet normal -0.017 -0.524 -0.851
outer loop
vertex -47.143 -21.513 0.000
vertex -38.571 -18.865 -1.797
vertex -38.571 -21.784 0.000
endloop
endfacet
facet normal -0.013 -0.121 -0.993
outer loop
vertex -47.143 -18.631 -1.733
vertex -47.143 -10.757 -2.690
vertex -38.571 -10.892 -2.788
endloop
endfacet
facet normal -0.011 -0.123 -0.992
outer loop
vertex -47.143 -18.631 -1.733
vertex -38.571 -10.892 -2.788
vertex -38.571 -18.865 -1.797
endloop
endfacet
facet normal -0.013 -0.030 -0.999
outer loop
vertex -47.143 -10.757 -2.690
vertex -47.143 -0.000 -3.018
vertex -38.571 -0.000 -3.128
endloop
endfacet
facet normal -0.012 -0.031 -0.999
outer loop
vertex -47.143 -10.757 -2.690
vertex -38.571 -0.000 -3.128
vertex -38.571 -10.892 -2.788
endloop
endfacet
facet normal -0.012 0.030 -0.999
outer loop
vertex -47.143 -0.000 -3.018
vertex -47.143 10.757 -2.690
vertex -38.571 10.892 -2.788
endloop
endfacet
facet normal -0.013 0.031 -0.999
outer loop
vertex -47.143 -0.000 -3.018
vertex -38.571 10.892 -2.788
vertex -38.571 -0.000 -3.128
endloop
endfacet
facet normal -0.011 0.121 -0.993
outer loop
vertex -47.143 10.757 -2.690
vertex -47.143 18.631 -1.733
vertex -38.571 18.865 -1.797
endloop
endfacet
facet normal -0.013 0.123 -0.992
outer loop
vertex -47.143 10.757 -2.690
vertex -38.571 18.865 -1.797
vertex -38.571 10.892 -2.788
endloop
endfacet
facet normal -0.016 0.515 -0.857
outer loop
vertex -47.143 18.631 -1.733
vertex -47.143 21.513 0.000
vertex -38.571 21.784 0.000
endloop
endfacet
facet normal -0.021 0.524 -0.851
outer loop
vertex -47.143 18.631 -1.733
vertex -38.571 21.784 0.000
vertex -38.571 18.865 -1.797
endloop
endfacet
facet normal -0.046 0.590 0.806
outer loop
vertex -38.571 21.784 0.000
vertex -38.571 18.865 2.136
vertex -30.000 19.476 2.178
endloop
endfacet
facet normal -0.048 0.585 0.810
outer loop
vertex -38.571 21.784 0.000
vertex -30.000 19.476 2.178
vertex -30.000 22.489 0.000
endloop
endfacet
facet normal -0.010 0.094 0.996
outer loop
vertex -38.571 18.865 2.136
vertex -38.571 10.892 2.890
vertex -30.000 11.245 2.946
endloop
endfacet
facet normal -0.011 0.093 0.996
outer loop
vertex -38.571 18.865 2.136
vertex -30.000 11.245 2.946
vertex -30.000 19.476 2.178
endloop
endfacet
facet normal -0.007 0.022 1.000
outer loop
vertex -38.571 10.892 2.890
vertex -38.571 0.000 3.128
vertex -30.000 0.000 3.188
endloop
endfacet
facet normal -0.007 0.022 1.000
outer loop
vertex -38.571 10.892 2.890
vertex -30.000 0.000 3.188
vertex -30.000 11.245 2.946
endloop
endfacet
facet normal -0.007 -0.022 1.000
outer loop
vertex -38.571 0.000 3.128
vertex -38.571 -10.892 2.890
vertex -30.000 -11.245 2.946
endloop
endfacet
facet normal -0.007 -0.022 1.000
outer loop
vertex -38.571 0.000 3.128
vertex -30.000 -11.245 2.946
vertex -30.000 0.000 3.188
endloop
endfacet
facet normal -0.012 -0.094 0.995
outer loop
vertex -38.571 -10.892 2.890
vertex -38.571 -18.865 2.136
vertex -30.000 -19.476 2.178
endloop
endfacet
facet normal -0.010 -0.093 0.996
outer loop
vertex -38.571 -10.892 2.890
vertex -30.000 -19.476 2.178
vertex -30.000 -11.245 2.946
endloop
endfacet
facet normal -0.049 -0.590 0.806
outer loop
vertex -38.571 -18.865 2.136
vertex -38.571 -21.784 0.000
vertex -30.000 -22.489 0.000
endloop
endfacet
facet normal -0.046 -0.585 0.810
outer loop
vertex -38.571 -18.865 2.136
vertex -30.000 -22.489 0.000
vertex -30.000 -19.476 2.178
endloop
endfacet
facet normal -0.041 -0.524 -0.851
outer loop
vertex -38.571 -21.784 0.000
vertex -38.571 -18.865 -1.797
vertex -30.000 -19.476 -1.831
endloop
endfacet
facet normal -0.043 -0.519 -0.854
outer loop
vertex -38.571 -21.784 0.000
vertex -30.000 -19.476 -1.831
vertex -30.000 -22.489 0.000
endloop
endfacet
facet normal -0.011 -0.123 -0.992
outer loop
vertex -38.571 -18.865 -1.797
vertex -38.571 -10.892 -2.788
vertex -30.000 -11.245 -2.842
endloop
endfacet
facet normal -0.013 -0.122 -0.992
outer loop
vertex -38.571 -18.865 -1.797
vertex -30.000 -11.245 -2.842
vertex -30.000 -19.476 -1.831
endloop
endfacet
facet normal -0.007 -0.031 -0.999
outer loop
vertex -38.571 -10.892 -2.788
vertex -38.571 -0.000 -3.128
vertex -30.000 -0.000 -3.188
endloop
endfacet
facet normal -0.008 -0.031 -0.999
outer loop
vertex -38.571 -10.892 -2.788
vertex -30.000 -0.000 -3.188
vertex -30.000 -11.245 -2.842
endloop
endfacet
facet normal -0.008 0.031 -0.999
outer loop
vertex -38.571 -0.000 -3.128
vertex -38.571 10.892 -2.788
vertex -30.000 11.245 -2.842
endloop
endfacet
facet normal -0.007 0.031 -1.000
outer loop
vertex -38.571 -0.000 -3.128
vertex -30.000 11.245 -2.842
vertex -30.000 -0.000 -3.188
endloop
endfacet
facet normal -0.013 0.123 -0.992
outer loop
vertex -38.571 10.892 -2.788
vertex -38.571 18.865 -1.797
vertex -30.000 19.476 -1.831
endloop
endfacet
facet normal -0.011 0.122 -0.992
outer loop
vertex -38.571 10.892 -2.788
vertex -30.000 19.476 -1.831
vertex -30.000 11.245 -2.842
endloop
endfacet
facet normal -0.043 0.524 -0.851
outer loop
vertex -38.571 18.865 -1.797
vertex -38.571 21.784 0.000
vertex -30.000 22.489 0.000
endloop
endfacet
facet normal -0.040 0.519 -0.854
outer loop
vertex -38.571 18.865 -1.797
vertex -30.000 22.489 0.000
vertex -30.000 19.476 -1.831
endloop
endfacet
facet normal -0.052 0.585 0.809
outer loop
vertex -30.000 22.489 0.000
vertex -30.000 19.476 2.178
vertex -21.429 20.231 2.184
endloop
endfacet
facet normal -0.058 0.571 0.819
outer loop
vertex -30.000 22.489 0.000
vertex -21.429 20.231 2.184
vertex -21.429 23.361 0.000
endloop
endfacet
facet normal -0.006 0.093 0.996
outer loop
vertex -30.000 19.476 2.178
vertex -30.000 11.245 2.946
vertex -21.429 11.680 2.954
endloop
endfacet
facet normal -0.009 0.090 0.996
outer loop
vertex -30.000 19.476 2.178
vertex -21.429 11.680 2.954
vertex -21.429 20.231 2.184
endloop
endfacet
facet normal -0.001 0.022 1.000
outer loop
vertex -30.000 11.245 2.946
vertex -30.000 0.000 3.188
vertex -21.429 0.000 3.197
endloop
endfacet
facet normal -0.002 0.021 1.000
outer loop
vertex -30.000 11.245 2.946
vertex -21.429 0.000 3.197
vertex -21.429 11.680 2.954
endloop
endfacet
facet normal -0.002 -0.022 1.000
outer loop
vertex -30.000 0.000 3.188
vertex -30.000 -11.245 2.946
vertex -21.429 -11.680 2.954
endloop
endfacet
facet normal -0.001 -0.021 1.000
outer loop
vertex -30.000 0.000 3.188
vertex -21.429 -11.680 2.954
vertex -21.429 0.000 3.197
endloop
endfacet
facet normal -0.009 -0.093 0.996
outer loop
vertex -30.000 -11.245 2.946
vertex -30.000 -19.476 2.178
vertex -21.429 -20.231 2.184
endloop
endfacet
facet normal -0.006 -0.090 0.996
outer loop
vertex -30.000 -11.245 2.946
vertex -21.429 -20.231 2.184
vertex -21.429 -11.680 2.954
endloop
endfacet
facet normal -0.059 -0.585 0.809
outer loop
vertex -30.000 -19.476 2.178
vertex -30.000 -22.489 0.000
vertex -21.429 -23.361 0.000
endloop
endfacet
facet normal -0.051 -0.571 0.819
outer loop
vertex -30.000 -19.476 2.178
vertex -21.429 -23.361 0.000
vertex -21.429 -20.231 2.184
endloop
endfacet
facet normal -0.046 -0.519 -0.854
outer loop
vertex -30.000 -22.489 0.000
vertex -30.000 -19.476 -1.831
vertex -21.429 -20.231 -1.836
endloop
endfacet
facet normal -0.051 -0.505 -0.861
outer loop
vertex -30.000 -22.489 0.000
vertex -21.429 -20.231 -1.836
vertex -21.429 -23.361 0.000
endloop
endfacet
facet normal -0.007 -0.122 -0.993
outer loop
vertex -30.000 -19.476 -1.831
vertex -30.000 -11.245 -2.842
vertex -21.429 -11.680 -2.850
endloop
endfacet
facet normal -0.011 -0.118 -0.993
outer loop
vertex -30.000 -19.476 -1.831
vertex -21.429 -11.680 -2.850
vertex -21.429 -20.231 -1.836
endloop
endfacet
facet normal -0.001 -0.031 -1.000
outer loop
vertex -30.000 -11.245 -2.842
vertex -30.000 -0.000 -3.188
vertex -21.429 -0.000 -3.197
endloop
endfacet
facet normal -0.002 -0.030 -1.000
outer loop
vertex -30.000 -11.245 -2.842
vertex -21.429 -0.000 -3.197
vertex -21.429 -11.680 -2.850
endloop
endfacet
facet normal -0.002 0.031 -1.000
outer loop
vertex -30.000 -0.000 -3.188
vertex -30.000 11.245 -2.842
vertex -21.429 11.680 -2.850
endloop
endfacet
facet normal -0.001 0.030 -1.000
outer loop
vertex -30.000 -0.000 -3.188
vertex -21.429 11.680 -2.850
vertex -21.429 -0.000 -3.197
endloop
endfacet
facet normal -0.011 0.122 -0.992
outer loop
vertex -30.000 11.245 -2.842
vertex -30.000 19.476 -1.831
vertex -21.429 20.231 -1.836
endloop
endfacet
facet normal -0.007 0.118 -0.993
outer loop
vertex -30.000 11.245 -2.842
vertex -21.429 20.231 -1.836
vertex -21.429 11.680 -2.850
endloop
endfacet
facet normal -0.053 0.519 -0.853
outer loop
vertex -30.000 19.476 -1.831
vertex -30.000 22.489 0.000
vertex -21.429 23.361 0.000
endloop
endfacet
facet normal -0.045 0.506 -0.862
outer loop
vertex -30.000 19.476 -1.831
vertex -21.429 23.361 0.000
vertex -21.429 20.231 -1.836
endloop
endfacet
facet normal -0.030 0.572 0.820
outer loop
vertex -21.429 23.361 0.000
vertex -21.429 20.231 2.184
vertex -12.857 20.726 2.154
endloop
endfacet
facet normal -0.037 0.557 0.829
outer loop
vertex -21.429 23.361 0.000
vertex -12.857 20.726 2.154
vertex -12.857 23.933 0.000
endloop
endfacet
facet normal 0.002 0.090 0.996
outer loop
vertex -21.429 20.231 2.184
vertex -21.429 11.680 2.954
vertex -12.857 11.966 2.914
endloop
endfacet
facet normal -0.002 0.086 0.996
outer loop
vertex -21.429 20.231 2.184
vertex -12.857 11.966 2.914
vertex -12.857 20.726 2.154
endloop
endfacet
facet normal 0.005 0.021 1.000
outer loop
vertex -21.429 11.680 2.954
vertex -21.429 0.000 3.197
vertex -12.857 0.000 3.154
endloop
endfacet
facet normal 0.004 0.020 1.000
outer loop
vertex -21.429 11.680 2.954
vertex -12.857 0.000 3.154
vertex -12.857 11.966 2.914
endloop
endfacet
facet normal 0.004 -0.021 1.000
outer loop
vertex -21.429 0.000 3.197
vertex -21.429 -11.680 2.954
vertex -12.857 -11.966 2.914
endloop
endfacet
facet normal 0.005 -0.020 1.000
outer loop
vertex -21.429 0.000 3.197
vertex -12.857 -11.966 2.914
vertex -12.857 0.000 3.154
endloop
endfacet
facet normal -0.002 -0.090 0.996
outer loop
vertex -21.429 -11.680 2.954
vertex -21.429 -20.231 2.184
vertex -12.857 -20.726 2.154
endloop
endfacet
facet normal 0.002 -0.086 0.996
outer loop
vertex -21.429 -11.680 2.954
vertex -12.857 -20.726 2.154
vertex -12.857 -11.966 2.914
endloop
endfacet
facet normal -0.038 -0.572 0.820
outer loop
vertex -21.429 -20.231 2.184
vertex -21.429 -23.361 0.000
vertex -12.857 -23.933 0.000
endloop
endfacet
facet normal -0.029 -0.557 0.830
outer loop
vertex -21.429 -20.231 2.184
vertex -12.857 -23.933 0.000
vertex -12.857 -20.726 2.154
endloop
endfacet
facet normal -0.027 -0.506 -0.862
outer loop
vertex -21.429 -23.361 0.000
vertex -21.429 -20.231 -1.836
vertex -12.857 -20.726 -1.812
endloop
endfacet
facet normal -0.033 -0.492 -0.870
outer loop
vertex -21.429 -23.361 0.000
vertex -12.857 -20.726 -1.812
vertex -12.857 -23.933 0.000
endloop
endfacet
facet normal 0.001 -0.118 -0.993
outer loop
vertex -21.429 -20.231 -1.836
vertex -21.429 -11.680 -2.850
vertex -12.857 -11.966 -2.811
endloop
endfacet
facet normal -0.004 -0.113 -0.994
outer loop
vertex -21.429 -20.231 -1.836
vertex -12.857 -11.966 -2.811
vertex -12.857 -20.726 -1.812
endloop
endfacet
facet normal 0.005 -0.030 -1.000
outer loop
vertex -21.429 -11.680 -2.850
vertex -21.429 -0.000 -3.197
vertex -12.857 -0.000 -3.154
endloop
endfacet
facet normal 0.004 -0.029 -1.000
outer loop
vertex -21.429 -11.680 -2.850
vertex -12.857 -0.000 -3.154
vertex -12.857 -11.966 -2.811
endloop
endfacet
facet normal 0.003 0.030 -1.000
outer loop
vertex -21.429 -0.000 -3.197
vertex -21.429 11.680 -2.850
vertex -12.857 11.966 -2.811
endloop
endfacet
facet normal 0.005 0.029 -1.000
outer loop
vertex -21.429 -0.000 -3.197
vertex -12.857 11.966 -2.811
vertex -12.857 -0.000 -3.154
endloop
endfacet
facet normal -0.004 0.118 -0.993
outer loop
vertex -21.429 11.680 -2.850
vertex -21.429 20.231 -1.836
vertex -12.857 20.726 -1.812
endloop
endfacet
facet normal 0.001 0.113 -0.994
outer loop
vertex -21.429 11.680 -2.850
vertex -12.857 20.726 -1.812
vertex -12.857 11.966 -2.811
endloop
endfacet
facet normal -0.034 0.506 -0.862
outer loop
vertex -21.429 20.231 -1.836
vertex -21.429 23.361 0.000
vertex -12.857 23.933 0.000
endloop
endfacet
facet normal -0.026 0.492 -0.870
outer loop
vertex -21.429 20.231 -1.836
vertex -12.857 23.933 0.000
vertex -12.857 20.726 -1.812
endloop
endfacet
facet normal 0.008 0.558 0.830
outer loop
vertex -12.857 23.933 0.000
vertex -12.857 20.726 2.154
vertex -4.286 20.698 2.090
endloop
endfacet
facet normal 0.002 0.547 0.837
outer loop
vertex -12.857 23.933 0.000
vertex -4.286 20.698 2.090
vertex -4.286 23.900 0.000
endloop
endfacet
facet normal 0.010 0.086 0.996
outer loop
vertex -12.857 20.726 2.154
vertex -12.857 11.966 2.914
vertex -4.286 11.950 2.828
endloop
endfacet
facet normal 0.008 0.084 0.996
outer loop
vertex -12.857 20.726 2.154
vertex -4.286 11.950 2.828
vertex -4.286 20.698 2.090
endloop
endfacet
facet normal 0.011 0.020 1.000
outer loop
vertex -12.857 11.966 2.914
vertex -12.857 0.000 3.154
vertex -4.286 0.000 3.060
endloop
endfacet
facet normal 0.010 0.019 1.000
outer loop
vertex -12.857 11.966 2.914
vertex -4.286 0.000 3.060
vertex -4.286 11.950 2.828
endloop
endfacet
facet normal 0.010 -0.020 1.000
outer loop
vertex -12.857 0.000 3.154
vertex -12.857 -11.966 2.914
vertex -4.286 -11.950 2.828
endloop
endfacet
facet normal 0.011 -0.019 1.000
outer loop
vertex -12.857 0.000 3.154
vertex -4.286 -11.950 2.828
vertex -4.286 0.000 3.060
endloop
endfacet
facet normal 0.008 -0.086 0.996
outer loop
vertex -12.857 -11.966 2.914
vertex -12.857 -20.726 2.154
vertex -4.286 -20.698 2.090
endloop
endfacet
facet normal 0.010 -0.084 0.996
outer loop
vertex -12.857 -11.966 2.914
vertex -4.286 -20.698 2.090
vertex -4.286 -11.950 2.828
endloop
endfacet
facet normal 0.002 -0.558 0.830
outer loop
vertex -12.857 -20.726 2.154
vertex -12.857 -23.933 0.000
vertex -4.286 -23.900 0.000
endloop
endfacet
facet normal 0.008 -0.547 0.837
outer loop
vertex -12.857 -20.726 2.154
vertex -4.286 -23.900 0.000
vertex -4.286 -20.698 2.090
endloop
endfacet
facet normal 0.007 -0.492 -0.871
outer loop
vertex -12.857 -23.933 0.000
vertex -12.857 -20.726 -1.812
vertex -4.286 -20.698 -1.758
endloop
endfacet
facet normal 0.002 -0.481 -0.877
outer loop
vertex -12.857 -23.933 0.000
vertex -4.286 -20.698 -1.758
vertex -4.286 -23.900 0.000
endloop
endfacet
facet normal 0.010 -0.113 -0.994
outer loop
vertex -12.857 -20.726 -1.812
vertex -12.857 -11.966 -2.811
vertex -4.286 -11.950 -2.728
endloop
endfacet
facet normal 0.007 -0.110 -0.994
outer loop
vertex -12.857 -20.726 -1.812
vertex -4.286 -11.950 -2.728
vertex -4.286 -20.698 -1.758
endloop
endfacet
facet normal 0.011 -0.029 -1.000
outer loop
vertex -12.857 -11.966 -2.811
vertex -12.857 -0.000 -3.154
vertex -4.286 -0.000 -3.060
endloop
endfacet
facet normal 0.010 -0.028 -1.000
outer loop
vertex -12.857 -11.966 -2.811
vertex -4.286 -0.000 -3.060
vertex -4.286 -11.950 -2.728
endloop
endfacet
facet normal 0.010 0.029 -1.000
outer loop
vertex -12.857 -0.000 -3.154
vertex -12.857 11.966 -2.811
vertex -4.286 11.950 -2.728
endloop
endfacet
facet normal 0.011 0.028 -1.000
outer loop
vertex -12.857 -0.000 -3.154
vertex -4.286 11.950 -2.728
vertex -4.286 -0.000 -3.060
endloop
endfacet
facet normal 0.007 0.113 -0.994
outer loop
vertex -12.857 11.966 -2.811
vertex -12.857 20.726 -1.812
vertex -4.286 20.698 -1.758
endloop
endfacet
facet normal 0.010 0.110 -0.994
outer loop
vertex -12.857 11.966 -2.811
vertex -4.286 20.698 -1.758
vertex -4.286 11.950 -2.728
endloop
endfacet
facet normal 0.002 0.492 -0.871
outer loop
vertex -12.857 20.726 -1.812
vertex -12.857 23.933 0.000
vertex -4.286 23.900 0.000
endloop
endfacet
facet normal 0.007 0.481 -0.877
outer loop
vertex -12.857 20.726 -1.812
vertex -4.286 23.900 0.000
vertex -4.286 20.698 -1.758
endloop
endfacet
facet normal 0.044 0.546 0.837
outer loop
vertex -4.286 23.900 0.000
vertex -4.286 20.698 2.090
vertex 4.286 20.161 1.994
endloop
endfacet
facet normal 0.039 0.538 0.842
outer loop
vertex -4.286 23.900 0.000
vertex 4.286 20.161 1.994
vertex 4.286 23.280 0.000
endloop
endfacet
facet normal 0.018 0.084 0.996
outer loop
vertex -4.286 20.698 2.090
vertex -4.286 11.950 2.828
vertex 4.286 11.640 2.697
endloop
endfacet
facet normal 0.016 0.082 0.996
outer loop
vertex -4.286 20.698 2.090
vertex 4.286 11.640 2.697
vertex 4.286 20.161 1.994
endloop
endfacet
facet normal 0.017 0.019 1.000
outer loop
vertex -4.286 11.950 2.828
vertex -4.286 0.000 3.060
vertex 4.286 0.000 2.919
endloop
endfacet
facet normal 0.016 0.019 1.000
outer loop
vertex -4.286 11.950 2.828
vertex 4.286 0.000 2.919
vertex 4.286 11.640 2.697
endloop
endfacet
facet normal 0.016 -0.019 1.000
outer loop
vertex -4.286 0.000 3.060
vertex -4.286 -11.950 2.828
vertex 4.286 -11.640 2.697
endloop
endfacet
facet normal 0.017 -0.019 1.000
outer loop
vertex -4.286 0.000 3.060
vertex 4.286 -11.640 2.697
vertex 4.286 0.000 2.919
endloop
endfacet
facet normal 0.016 -0.084 0.996
outer loop
vertex -4.286 -11.950 2.828
vertex -4.286 -20.698 2.090
vertex 4.286 -20.161 1.994
endloop
endfacet
facet normal 0.018 -0.082 0.996
outer loop
vertex -4.286 -11.950 2.828
vertex 4.286 -20.161 1.994
vertex 4.286 -11.640 2.697
endloop
endfacet
facet normal 0.040 -0.546 0.837
outer loop
vertex -4.286 -20.698 2.090
vertex -4.286 -23.900 0.000
vertex 4.286 -23.280 0.000
endloop
endfacet
facet normal 0.043 -0.538 0.842
outer loop
vertex -4.286 -20.698 2.090
vertex 4.286 -23.280 0.000
vertex 4.286 -20.161 1.994
endloop
endfacet
facet normal 0.038 -0.481 -0.876
outer loop
vertex -4.286 -23.900 0.000
vertex -4.286 -20.698 -1.758
vertex 4.286 -20.161 -1.676
endloop
endfacet
facet normal 0.034 -0.473 -0.880
outer loop
vertex -4.286 -23.900 0.000
vertex 4.286 -20.161 -1.676
vertex 4.286 -23.280 0.000
endloop
endfacet
facet normal 0.019 -0.110 -0.994
outer loop
vertex -4.286 -20.698 -1.758
vertex -4.286 -11.950 -2.728
vertex 4.286 -11.640 -2.602
endloop
endfacet
facet normal 0.016 -0.108 -0.994
outer loop
vertex -4.286 -20.698 -1.758
vertex 4.286 -11.640 -2.602
vertex 4.286 -20.161 -1.676
endloop
endfacet
facet normal 0.017 -0.028 -0.999
outer loop
vertex -4.286 -11.950 -2.728
vertex -4.286 -0.000 -3.060
vertex 4.286 -0.000 -2.919
endloop
endfacet
facet normal 0.016 -0.027 -1.000
outer loop
vertex -4.286 -11.950 -2.728
vertex 4.286 -0.000 -2.919
vertex 4.286 -11.640 -2.602
endloop
endfacet
facet normal 0.016 0.028 -0.999
outer loop
vertex -4.286 -0.000 -3.060
vertex -4.286 11.950 -2.728
vertex 4.286 11.640 -2.602
endloop
endfacet
facet normal 0.017 0.027 -0.999
outer loop
vertex -4.286 -0.000 -3.060
vertex 4.286 11.640 -2.602
vertex 4.286 -0.000 -2.919
endloop
endfacet
facet normal 0.016 0.110 -0.994
outer loop
vertex -4.286 11.950 -2.728
vertex -4.286 20.698 -1.758
vertex 4.286 20.161 -1.676
endloop
endfacet
facet normal 0.019 0.108 -0.994
outer loop
vertex -4.286 11.950 -2.728
vertex 4.286 20.161 -1.676
vertex 4.286 11.640 -2.602
endloop
endfacet
facet normal 0.035 0.481 -0.876
outer loop
vertex -4.286 20.698 -1.758
vertex -4.286 23.900 0.000
vertex 4.286 23.280 0.000
endloop
endfacet
facet normal 0.038 0.473 -0.880
outer loop
vertex -4.286 20.698 -1.758
vertex 4.286 23.280 0.000
vertex 4.286 20.161 -1.676
endloop
endfacet
facet normal 0.060 0.538 0.841
outer loop
vertex 4.286 23.280 0.000
vertex 4.286 20.161 1.994
vertex 12.857 19.402 1.867
endloop
endfacet
facet normal 0.054 0.527 0.848
outer loop
vertex 4.286 23.280 0.000
vertex 12.857 19.402 1.867
vertex 12.857 22.404 0.000
endloop
endfacet
facet normal 0.024 0.082 0.996
outer loop
vertex 4.286 20.161 1.994
vertex 4.286 11.640 2.697
vertex 12.857 11.202 2.526
endloop
endfacet
facet normal 0.022 0.080 0.997
outer loop
vertex 4.286 20.161 1.994
vertex 12.857 11.202 2.526
vertex 12.857 19.402 1.867
endloop
endfacet
facet normal 0.022 0.019 1.000
outer loop
vertex 4.286 11.640 2.697
vertex 4.286 0.000 2.919
vertex 12.857 0.000 2.734
endloop
endfacet
facet normal 0.021 0.019 1.000
outer loop
vertex 4.286 11.640 2.697
vertex 12.857 0.000 2.734
vertex 12.857 11.202 2.526
endloop
endfacet
facet normal 0.021 -0.019 1.000
outer loop
vertex 4.286 0.000 2.919
vertex 4.286 -11.640 2.697
vertex 12.857 -11.202 2.526
endloop
endfacet
facet normal 0.022 -0.019 1.000
outer loop
vertex 4.286 0.000 2.919
vertex 12.857 -11.202 2.526
vertex 12.857 0.000 2.734
endloop
endfacet
facet normal 0.022 -0.082 0.996
outer loop
vertex 4.286 -11.640 2.697
vertex 4.286 -20.161 1.994
vertex 12.857 -19.402 1.867
endloop
endfacet
facet normal 0.024 -0.080 0.997
outer loop
vertex 4.286 -11.640 2.697
vertex 12.857 -19.402 1.867
vertex 12.857 -11.202 2.526
endloop
endfacet
facet normal 0.055 -0.538 0.841
outer loop
vertex 4.286 -20.161 1.994
vertex 4.286 -23.280 0.000
vertex 12.857 -22.404 0.000
endloop
endfacet
facet normal 0.059 -0.527 0.848
outer loop
vertex 4.286 -20.161 1.994
vertex 12.857 -22.404 0.000
vertex 12.857 -19.402 1.867
endloop
endfacet
facet normal 0.053 -0.473 -0.880
outer loop
vertex 4.286 -23.280 0.000
vertex 4.286 -20.161 -1.676
vertex 12.857 -19.402 -1.570
endloop
endfacet
facet normal 0.047 -0.463 -0.885
outer loop
vertex 4.286 -23.280 0.000
vertex 12.857 -19.402 -1.570
vertex 12.857 -22.404 0.000
endloop
endfacet
facet normal 0.025 -0.108 -0.994
outer loop
vertex 4.286 -20.161 -1.676
vertex 4.286 -11.640 -2.602
vertex 12.857 -11.202 -2.437
endloop
endfacet
facet normal 0.022 -0.105 -0.994
outer loop
vertex 4.286 -20.161 -1.676
vertex 12.857 -11.202 -2.437
vertex 12.857 -19.402 -1.570
endloop
endfacet
facet normal 0.022 -0.027 -0.999
outer loop
vertex 4.286 -11.640 -2.602
vertex 4.286 -0.000 -2.919
vertex 12.857 -0.000 -2.734
endloop
endfacet
facet normal 0.021 -0.027 -0.999
outer loop
vertex 4.286 -11.640 -2.602
vertex 12.857 -0.000 -2.734
vertex 12.857 -11.202 -2.437
endloop
endfacet
facet normal 0.021 0.027 -0.999
outer loop
vertex 4.286 -0.000 -2.919
vertex 4.286 11.640 -2.602
vertex 12.857 11.202 -2.437
endloop
endfacet
facet normal 0.022 0.027 -0.999
outer loop
vertex 4.286 -0.000 -2.919
vertex 12.857 11.202 -2.437
vertex 12.857 -0.000 -2.734
endloop
endfacet
facet normal 0.022 0.108 -0.994
outer loop
vertex 4.286 11.640 -2.602
vertex 4.286 20.161 -1.676
vertex 12.857 19.402 -1.570
endloop
endfacet
facet normal 0.025 0.105 -0.994
outer loop
vertex 4.286 11.640 -2.602
vertex 12.857 19.402 -1.570
vertex 12.857 11.202 -2.437
endloop
endfacet
facet normal 0.048 0.473 -0.880
outer loop
vertex 4.286 20.161 -1.676
vertex 4.286 23.280 0.000
vertex 12.857 22.404 0.000
endloop
endfacet
facet normal 0.052 0.463 -0.885
outer loop
vertex 4.286 20.161 -1.676
vertex 12.857 22.404 0.000
vertex 12.857 19.402 -1.570
endloop
endfacet
facet normal 0.051 0.528 0.848
outer loop
vertex 12.857 22.404 0.000
vertex 12.857 19.402 1.867
vertex 21.429 18.827 1.715
endloop
endfacet
facet normal 0.039 0.507 0.861
outer loop
vertex 12.857 22.404 0.000
vertex 21.429 18.827 1.715
vertex 21.429 21.739 0.000
endloop
endfacet
facet normal 0.027 0.080 0.996
outer loop
vertex 12.857 19.402 1.867
vertex 12.857 11.202 2.526
vertex 21.429 10.870 2.319
endloop
endfacet
facet normal 0.023 0.076 0.997
outer loop
vertex 12.857 19.402 1.867
vertex 21.429 10.870 2.319
vertex 21.429 18.827 1.715
endloop
endfacet
facet normal 0.026 0.019 0.999
outer loop
vertex 12.857 11.202 2.526
vertex 12.857 0.000 2.734
vertex 21.429 0.000 2.510
endloop
endfacet
facet normal 0.025 0.018 1.000
outer loop
vertex 12.857 11.202 2.526
vertex 21.429 0.000 2.510
vertex 21.429 10.870 2.319
endloop
endfacet
facet normal 0.025 -0.019 1.000
outer loop
vertex 12.857 0.000 2.734
vertex 12.857 -11.202 2.526
vertex 21.429 -10.870 2.319
endloop
endfacet
facet normal 0.026 -0.018 1.000
outer loop
vertex 12.857 0.000 2.734
vertex 21.429 -10.870 2.319
vertex 21.429 0.000 2.510
endloop
endfacet
facet normal 0.023 -0.080 0.997
outer loop
vertex 12.857 -11.202 2.526
vertex 12.857 -19.402 1.867
vertex 21.429 -18.827 1.715
endloop
endfacet
facet normal 0.027 -0.076 0.997
outer loop
vertex 12.857 -11.202 2.526
vertex 21.429 -18.827 1.715
vertex 21.429 -10.870 2.319
endloop
endfacet
facet normal 0.041 -0.528 0.848
outer loop
vertex 12.857 -19.402 1.867
vertex 12.857 -22.404 0.000
vertex 21.429 -21.739 0.000
endloop
endfacet
facet normal 0.049 -0.507 0.861
outer loop
vertex 12.857 -19.402 1.867
vertex 21.429 -21.739 0.000
vertex 21.429 -18.827 1.715
endloop
endfacet
facet normal 0.044 -0.463 -0.885
outer loop
vertex 12.857 -22.404 0.000
vertex 12.857 -19.402 -1.570
vertex 21.429 -18.827 -1.442
endloop
endfacet
facet normal 0.034 -0.443 -0.896
outer loop
vertex 12.857 -22.404 0.000
vertex 21.429 -18.827 -1.442
vertex 21.429 -21.739 0.000
endloop
endfacet
facet normal 0.027 -0.105 -0.994
outer loop
vertex 12.857 -19.402 -1.570
vertex 12.857 -11.202 -2.437
vertex 21.429 -10.870 -2.238
endloop
endfacet
facet normal 0.022 -0.099 -0.995
outer loop
vertex 12.857 -19.402 -1.570
vertex 21.429 -10.870 -2.238
vertex 21.429 -18.827 -1.442
endloop
endfacet
facet normal 0.026 -0.027 -0.999
outer loop
vertex 12.857 -11.202 -2.437
vertex 12.857 -0.000 -2.734
vertex 21.429 -0.000 -2.510
endloop
endfacet
facet normal 0.024 -0.025 -0.999
outer loop
vertex 12.857 -11.202 -2.437
vertex 21.429 -0.000 -2.510
vertex 21.429 -10.870 -2.238
endloop
endfacet
facet normal 0.024 0.027 -0.999
outer loop
vertex 12.857 -0.000 -2.734
vertex 12.857 11.202 -2.437
vertex 21.429 10.870 -2.238
endloop
endfacet
facet normal 0.026 0.025 -0.999
outer loop
vertex 12.857 -0.000 -2.734
vertex 21.429 10.870 -2.238
vertex 21.429 -0.000 -2.510
endloop
endfacet
facet normal 0.022 0.105 -0.994
outer loop
vertex 12.857 11.202 -2.437
vertex 12.857 19.402 -1.570
vertex 21.429 18.827 -1.442
endloop
endfacet
facet normal 0.027 0.099 -0.995
outer loop
vertex 12.857 11.202 -2.437
vertex 21.429 18.827 -1.442
vertex 21.429 10.870 -2.238
endloop
endfacet
facet normal 0.036 0.463 -0.886
outer loop
vertex 12.857 19.402 -1.570
vertex 12.857 22.404 0.000
vertex 21.429 21.739 0.000
endloop
endfacet
facet normal 0.043 0.443 -0.895
outer loop
vertex 12.857 19.402 -1.570
vertex 21.429 21.739 0.000
vertex 21.429 18.827 -1.442
endloop
endfacet
facet normal 0.027 0.507 0.861
outer loop
vertex 21.429 21.739 0.000
vertex 21.429 18.827 1.715
vertex 30.000 18.569 1.597
endloop
endfacet
facet normal 0.011 0.473 0.881
outer loop
vertex 21.429 21.739 0.000
vertex 30.000 18.569 1.597
vertex 30.000 21.442 0.057
endloop
endfacet
facet normal 0.022 0.076 0.997
outer loop
vertex 21.429 18.827 1.715
vertex 21.429 10.870 2.319
vertex 30.000 10.721 2.140
endloop
endfacet
facet normal 0.016 0.069 0.997
outer loop
vertex 21.429 18.827 1.715
vertex 30.000 10.721 2.140
vertex 30.000 18.569 1.597
endloop
endfacet
facet normal 0.023 0.018 1.000
outer loop
vertex 21.429 10.870 2.319
vertex 21.429 0.000 2.510
vertex 30.000 0.000 2.312
endloop
endfacet
facet normal 0.021 0.016 1.000
outer loop
vertex 21.429 10.870 2.319
vertex 30.000 0.000 2.312
vertex 30.000 10.721 2.140
endloop
endfacet
facet normal 0.021 -0.018 1.000
outer loop
vertex 21.429 0.000 2.510
vertex 21.429 -10.870 2.319
vertex 30.000 -10.721 2.140
endloop
endfacet
facet normal 0.023 -0.016 1.000
outer loop
vertex 21.429 0.000 2.510
vertex 30.000 -10.721 2.140
vertex 30.000 0.000 2.312
endloop
endfacet
facet normal 0.016 -0.076 0.997
outer loop
vertex 21.429 -10.870 2.319
vertex 21.429 -18.827 1.715
vertex 30.000 -18.569 1.597
endloop
endfacet
facet normal 0.022 -0.069 0.997
outer loop
vertex 21.429 -10.870 2.319
vertex 30.000 -18.569 1.597
vertex 30.000 -10.721 2.140
endloop
endfacet
facet normal 0.012 -0.507 0.862
outer loop
vertex 21.429 -18.827 1.715
vertex 21.429 -21.739 0.000
vertex 30.000 -21.442 0.057
endloop
endfacet
facet normal 0.026 -0.472 0.881
outer loop
vertex 21.429 -18.827 1.715
vertex 30.000 -21.442 0.057
vertex 30.000 -18.569 1.597
endloop
endfacet
facet normal 0.035 -0.443 -0.896
outer loop
vertex 21.429 -21.739 0.000
vertex 21.429 -18.827 -1.442
vertex 30.000 -18.569 -1.239
endloop
endfacet
facet normal 0.020 -0.411 -0.911
outer loop
vertex 21.429 -21.739 0.000
vertex 30.000 -18.569 -1.239
vertex 30.000 -21.442 0.057
endloop
endfacet
facet normal 0.035 -0.099 -0.994
outer loop
vertex 21.429 -18.827 -1.442
vertex 21.429 -10.870 -2.238
vertex 30.000 -10.721 -1.954
endloop
endfacet
facet normal 0.026 -0.091 -0.996
outer loop
vertex 21.429 -18.827 -1.442
vertex 30.000 -10.721 -1.954
vertex 30.000 -18.569 -1.239
endloop
endfacet
facet normal 0.036 -0.025 -0.999
outer loop
vertex 21.429 -10.870 -2.238
vertex 21.429 -0.000 -2.510
vertex 30.000 -0.000 -2.199
endloop
endfacet
facet normal 0.033 -0.023 -0.999
outer loop
vertex 21.429 -10.870 -2.238
vertex 30.000 -0.000 -2.199
vertex 30.000 -10.721 -1.954
endloop
endfacet
facet normal 0.034 0.025 -0.999
outer loop
vertex 21.429 -0.000 -2.510
vertex 21.429 10.870 -2.238
vertex 30.000 10.721 -1.954
endloop
endfacet
facet normal 0.036 0.023 -0.999
outer loop
vertex 21.429 -0.000 -2.510
vertex 30.000 10.721 -1.954
vertex 30.000 -0.000 -2.199
endloop
endfacet
facet normal 0.027 0.099 -0.995
outer loop
vertex 21.429 10.870 -2.238
vertex 21.429 18.827 -1.442
vertex 30.000 18.569 -1.239
endloop
endfacet
facet normal 0.035 0.091 -0.995
outer loop
vertex 21.429 10.870 -2.238
vertex 30.000 18.569 -1.239
vertex 30.000 10.721 -1.954
endloop
endfacet
facet normal 0.021 0.444 -0.896
outer loop
vertex 21.429 18.827 -1.442
vertex 21.429 21.739 0.000
vertex 30.000 21.442 0.057
endloop
endfacet
facet normal 0.034 0.411 -0.911
outer loop
vertex 21.429 18.827 -1.442
vertex 30.000 21.442 0.057
vertex 30.000 18.569 -1.239
endloop
endfacet
facet normal 0.094 0.470 0.877
outer loop
vertex 30.000 21.442 0.057
vertex 30.000 18.569 1.597
vertex 38.571 16.883 1.581
endloop
endfacet
facet normal 0.086 0.457 0.885
outer loop
vertex 30.000 21.442 0.057
vertex 38.571 16.883 1.581
vertex 38.571 19.495 0.231
endloop
endfacet
facet normal 0.018 0.069 0.997
outer loop
vertex 30.000 18.569 1.597
vertex 30.000 10.721 2.140
vertex 38.571 9.748 2.057
endloop
endfacet
facet normal 0.015 0.067 0.998
outer loop
vertex 30.000 18.569 1.597
vertex 38.571 9.748 2.057
vertex 38.571 16.883 1.581
endloop
endfacet
facet normal 0.012 0.016 1.000
outer loop
vertex 30.000 10.721 2.140
vertex 30.000 0.000 2.312
vertex 38.571 0.000 2.207
endloop
endfacet
facet normal 0.011 0.015 1.000
outer loop
vertex 30.000 10.721 2.140
vertex 38.571 0.000 2.207
vertex 38.571 9.748 2.057
endloop
endfacet
facet normal 0.012 -0.016 1.000
outer loop
vertex 30.000 0.000 2.312
vertex 30.000 -10.721 2.140
vertex 38.571 -9.748 2.057
endloop
endfacet
facet normal 0.012 -0.015 1.000
outer loop
vertex 30.000 0.000 2.312
vertex 38.571 -9.748 2.057
vertex 38.571 0.000 2.207
endloop
endfacet
facet normal 0.015 -0.069 0.997
outer loop
vertex 30.000 -10.721 2.140
vertex 30.000 -18.569 1.597
vertex 38.571 -16.883 1.581
endloop
endfacet
facet normal 0.017 -0.067 0.998
outer loop
vertex 30.000 -10.721 2.140
vertex 38.571 -16.883 1.581
vertex 38.571 -9.748 2.057
endloop
endfacet
facet normal 0.089 -0.471 0.878
outer loop
vertex 30.000 -18.569 1.597
vertex 30.000 -21.442 0.057
vertex 38.571 -19.495 0.231
endloop
endfacet
facet normal 0.092 -0.457 0.885
outer loop
vertex 30.000 -18.569 1.597
vertex 38.571 -19.495 0.231
vertex 38.571 -16.883 1.581
endloop
endfacet
facet normal 0.116 -0.408 -0.905
outer loop
vertex 30.000 -21.442 0.057
vertex 30.000 -18.569 -1.239
vertex 38.571 -16.883 -0.904
endloop
endfacet
facet normal 0.109 -0.396 -0.912
outer loop
vertex 30.000 -21.442 0.057
vertex 38.571 -16.883 -0.904
vertex 38.571 -19.495 0.231
endloop
endfacet
facet normal 0.059 -0.091 -0.994
outer loop
vertex 30.000 -18.569 -1.239
vertex 30.000 -10.721 -1.954
vertex 38.571 -9.748 -1.530
endloop
endfacet
facet normal 0.056 -0.087 -0.995
outer loop
vertex 30.000 -18.569 -1.239
vertex 38.571 -9.748 -1.530
vertex 38.571 -16.883 -0.904
endloop
endfacet
facet normal 0.053 -0.023 -0.998
outer loop
vertex 30.000 -10.721 -1.954
vertex 30.000 -0.000 -2.199
vertex 38.571 -0.000 -1.745
endloop
endfacet
facet normal 0.052 -0.022 -0.998
outer loop
vertex 30.000 -10.721 -1.954
vertex 38.571 -0.000 -1.745
vertex 38.571 -9.748 -1.530
endloop
endfacet
facet normal 0.052 0.023 -0.998
outer loop
vertex 30.000 -0.000 -2.199
vertex 30.000 10.721 -1.954
vertex 38.571 9.748 -1.530
endloop
endfacet
facet normal 0.053 0.022 -0.998
outer loop
vertex 30.000 -0.000 -2.199
vertex 38.571 9.748 -1.530
vertex 38.571 -0.000 -1.745
endloop
endfacet
facet normal 0.057 0.091 -0.994
outer loop
vertex 30.000 10.721 -1.954
vertex 30.000 18.569 -1.239
vertex 38.571 16.883 -0.904
endloop
endfacet
facet normal 0.059 0.087 -0.994
outer loop
vertex 30.000 10.721 -1.954
vertex 38.571 16.883 -0.904
vertex 38.571 9.748 -1.530
endloop
endfacet
facet normal 0.111 0.409 -0.906
outer loop
vertex 30.000 18.569 -1.239
vertex 30.000 21.442 0.057
vertex 38.571 19.495 0.231
endloop
endfacet
facet normal 0.113 0.396 -0.911
outer loop
vertex 30.000 18.569 -1.239
vertex 38.571 19.495 0.231
vertex 38.571 16.883 -0.904
endloop
endfacet
facet normal 0.122 0.456 0.882
outer loop
vertex 38.571 19.495 0.231
vertex 38.571 16.883 1.581
vertex 47.143 14.408 1.672
endloop
endfacet
facet normal 0.121 0.455 0.882
outer loop
vertex 38.571 19.495 0.231
vertex 47.143 14.408 1.672
vertex 47.143 16.637 0.524
endloop
endfacet
facet normal 0.009 0.067 0.998
outer loop
vertex 38.571 16.883 1.581
vertex 38.571 9.748 2.057
vertex 47.143 8.319 2.077
endloop
endfacet
facet normal 0.009 0.066 0.998
outer loop
vertex 38.571 16.883 1.581
vertex 47.143 8.319 2.077
vertex 47.143 14.408 1.672
endloop
endfacet
facet normal 0.000 0.015 1.000
outer loop
vertex 38.571 9.748 2.057
vertex 38.571 0.000 2.207
vertex 47.143 0.000 2.205
endloop
endfacet
facet normal 0.000 0.015 1.000
outer loop
vertex 38.571 9.748 2.057
vertex 47.143 0.000 2.205
vertex 47.143 8.319 2.077
endloop
endfacet
facet normal 0.000 -0.015 1.000
outer loop
vertex 38.571 0.000 2.207
vertex 38.571 -9.748 2.057
vertex 47.143 -8.319 2.077
endloop
endfacet
facet normal 0.000 -0.015 1.000
outer loop
vertex 38.571 0.000 2.207
vertex 47.143 -8.319 2.077
vertex 47.143 0.000 2.205
endloop
endfacet
facet normal 0.009 -0.067 0.998
outer loop
vertex 38.571 -9.748 2.057
vertex 38.571 -16.883 1.581
vertex 47.143 -14.408 1.672
endloop
endfacet
facet normal 0.009 -0.066 0.998
outer loop
vertex 38.571 -9.748 2.057
vertex 47.143 -14.408 1.672
vertex 47.143 -8.319 2.077
endloop
endfacet
facet normal 0.122 -0.456 0.882
outer loop
vertex 38.571 -16.883 1.581
vertex 38.571 -19.495 0.231
vertex 47.143 -16.637 0.524
endloop
endfacet
facet normal 0.122 -0.455 0.882
outer loop
vertex 38.571 -16.883 1.581
vertex 47.143 -16.637 0.524
vertex 47.143 -14.408 1.672
endloop
endfacet
facet normal 0.162 -0.393 -0.905
outer loop
vertex 38.571 -19.495 0.231
vertex 38.571 -16.883 -0.904
vertex 47.143 -14.408 -0.442
endloop
endfacet
facet normal 0.162 -0.392 -0.906
outer loop
vertex 38.571 -19.495 0.231
vertex 47.143 -14.408 -0.442
vertex 47.143 -16.637 0.524
endloop
endfacet
facet normal 0.079 -0.087 -0.993
outer loop
vertex 38.571 -16.883 -0.904
vertex 38.571 -9.748 -1.530
vertex 47.143 -8.319 -0.975
endloop
endfacet
facet normal 0.079 -0.087 -0.993
outer loop
vertex 38.571 -16.883 -0.904
vertex 47.143 -8.319 -0.975
vertex 47.143 -14.408 -0.442
endloop
endfacet
facet normal 0.068 -0.022 -0.997
outer loop
vertex 38.571 -9.748 -1.530
vertex 38.571 -0.000 -1.745
vertex 47.143 -0.000 -1.158
endloop
endfacet
facet normal 0.068 -0.022 -0.997
outer loop
vertex 38.571 -9.748 -1.530
vertex 47.143 -0.000 -1.158
vertex 47.143 -8.319 -0.975
endloop
endfacet
facet normal 0.068 0.022 -0.997
outer loop
vertex 38.571 -0.000 -1.745
vertex 38.571 9.748 -1.530
vertex 47.143 8.319 -0.975
endloop
endfacet
facet normal 0.068 0.022 -0.997
outer loop
vertex 38.571 -0.000 -1.745
vertex 47.143 8.319 -0.975
vertex 47.143 -0.000 -1.158
endloop
endfacet
facet normal 0.079 0.087 -0.993
outer loop
vertex 38.571 9.748 -1.530
vertex 38.571 16.883 -0.904
vertex 47.143 14.408 -0.442
endloop
endfacet
facet normal 0.079 0.087 -0.993
outer loop
vertex 38.571 9.748 -1.530
vertex 47.143 14.408 -0.442
vertex 47.143 8.319 -0.975
endloop
endfacet
facet normal 0.162 0.393 -0.905
outer loop
vertex 38.571 16.883 -0.904
vertex 38.571 19.495 0.231
vertex 47.143 16.637 0.524
endloop
endfacet
facet normal 0.162 0.392 -0.905
outer loop
vertex 38.571 16.883 -0.904
vertex 47.143 16.637 0.524
vertex 47.143 14.408 -0.442
endloop
endfacet
facet normal 0.053 0.457 0.888
outer loop
vertex 47.143 16.637 0.524
vertex 47.143 14.408 1.672
vertex 55.714 12.941 1.917
endloop
endfacet
facet normal 0.044 0.441 0.897
outer loop
vertex 47.143 16.637 0.524
vertex 55.714 12.941 1.917
vertex 55.714 14.943 0.934
endloop
endfacet
facet normal -0.015 0.066 0.998
outer loop
vertex 47.143 14.408 1.672
vertex 47.143 8.319 2.077
vertex 55.714 7.471 2.264
endloop
endfacet
facet normal -0.018 0.063 0.998
outer loop
vertex 47.143 14.408 1.672
vertex 55.714 7.471 2.264
vertex 55.714 12.941 1.917
endloop
endfacet
facet normal -0.020 0.015 1.000
outer loop
vertex 47.143 8.319 2.077
vertex 47.143 0.000 2.205
vertex 55.714 0.000 2.374
endloop
endfacet
facet normal -0.020 0.015 1.000
outer loop
vertex 47.143 8.319 2.077
vertex 55.714 0.000 2.374
vertex 55.714 7.471 2.264
endloop
endfacet
facet normal -0.020 -0.015 1.000
outer loop
vertex 47.143 0.000 2.205
vertex 47.143 -8.319 2.077
vertex 55.714 -7.471 2.264
endloop
endfacet
facet normal -0.020 -0.015 1.000
outer loop
vertex 47.143 0.000 2.205
vertex 55.714 -7.471 2.264
vertex 55.714 0.000 2.374
endloop
endfacet
facet normal -0.017 -0.066 0.998
outer loop
vertex 47.143 -8.319 2.077
vertex 47.143 -14.408 1.672
vertex 55.714 -12.941 1.917
endloop
endfacet
facet normal -0.016 -0.063 0.998
outer loop
vertex 47.143 -8.319 2.077
vertex 55.714 -12.941 1.917
vertex 55.714 -7.471 2.264
endloop
endfacet
facet normal 0.048 -0.457 0.888
outer loop
vertex 47.143 -14.408 1.672
vertex 47.143 -16.637 0.524
vertex 55.714 -14.943 0.934
endloop
endfacet
facet normal 0.050 -0.440 0.896
outer loop
vertex 47.143 -14.408 1.672
vertex 55.714 -14.943 0.934
vertex 55.714 -12.941 1.917
endloop
endfacet
facet normal 0.126 -0.394 -0.910
outer loop
vertex 47.143 -16.637 0.524
vertex 47.143 -14.408 -0.442
vertex 55.714 -12.941 0.107
endloop
endfacet
facet normal 0.119 -0.379 -0.918
outer loop
vertex 47.143 -16.637 0.524
vertex 55.714 -12.941 0.107
vertex 55.714 -14.943 0.934
endloop
endfacet
facet normal 0.081 -0.087 -0.993
outer loop
vertex 47.143 -14.408 -0.442
vertex 47.143 -8.319 -0.975
vertex 55.714 -7.471 -0.350
endloop
endfacet
facet normal 0.078 -0.083 -0.994
outer loop
vertex 47.143 -14.408 -0.442
vertex 55.714 -7.471 -0.350
vertex 55.714 -12.941 0.107
endloop
endfacet
facet normal 0.076 -0.022 -0.997
outer loop
vertex 47.143 -8.319 -0.975
vertex 47.143 -0.000 -1.158
vertex 55.714 -0.000 -0.506
endloop
endfacet
facet normal 0.075 -0.021 -0.997
outer loop
vertex 47.143 -8.319 -0.975
vertex 55.714 -0.000 -0.506
vertex 55.714 -7.471 -0.350
endloop
endfacet
facet normal 0.075 0.022 -0.997
outer loop
vertex 47.143 -0.000 -1.158
vertex 47.143 8.319 -0.975
vertex 55.714 7.471 -0.350
endloop
endfacet
facet normal 0.076 0.021 -0.997
outer loop
vertex 47.143 -0.000 -1.158
vertex 55.714 7.471 -0.350
vertex 55.714 -0.000 -0.506
endloop
endfacet
facet normal 0.078 0.087 -0.993
outer loop
vertex 47.143 8.319 -0.975
vertex 47.143 14.408 -0.442
vertex 55.714 12.941 0.107
endloop
endfacet
facet normal 0.081 0.083 -0.993
outer loop
vertex 47.143 8.319 -0.975
vertex 55.714 12.941 0.107
vertex 55.714 7.471 -0.350
endloop
endfacet
facet normal 0.122 0.395 -0.911
outer loop
vertex 47.143 14.408 -0.442
vertex 47.143 16.637 0.524
vertex 55.714 14.943 0.934
endloop
endfacet
facet normal 0.124 0.379 -0.917
outer loop
vertex 47.143 14.408 -0.442
vertex 55.714 14.943 0.934
vertex 55.714 12.941 0.107
endloop
endfacet
facet normal 0.030 0.441 0.897
outer loop
vertex 55.714 14.943 0.934
vertex 55.714 12.941 1.917
vertex 64.286 11.291 2.446
endloop
endfacet
facet normal 0.055 0.490 0.870
outer loop
vertex 55.714 14.943 0.934
vertex 64.286 11.291 2.446
vertex 64.286 13.037 1.462
endloop
endfacet
facet normal -0.054 0.063 0.997
outer loop
vertex 55.714 12.941 1.917
vertex 55.714 7.471 2.264
vertex 64.286 6.519 2.793
endloop
endfacet
facet normal -0.047 0.072 0.996
outer loop
vertex 55.714 12.941 1.917
vertex 64.286 6.519 2.793
vertex 64.286 11.291 2.446
endloop
endfacet
facet normal -0.062 0.015 0.998
outer loop
vertex 55.714 7.471 2.264
vertex 55.714 0.000 2.374
vertex 64.286 0.000 2.902
endloop
endfacet
facet normal -0.060 0.017 0.998
outer loop
vertex 55.714 7.471 2.264
vertex 64.286 0.000 2.902
vertex 64.286 6.519 2.793
endloop
endfacet
facet normal -0.060 -0.015 0.998
outer loop
vertex 55.714 0.000 2.374
vertex 55.714 -7.471 2.264
vertex 64.286 -6.519 2.793
endloop
endfacet
facet normal -0.062 -0.017 0.998
outer loop
vertex 55.714 0.000 2.374
vertex 64.286 -6.519 2.793
vertex 64.286 0.000 2.902
endloop
endfacet
facet normal -0.049 -0.063 0.997
outer loop
vertex 55.714 -7.471 2.264
vertex 55.714 -12.941 1.917
vertex 64.286 -11.291 2.446
endloop
endfacet
facet normal -0.053 -0.072 0.996
outer loop
vertex 55.714 -7.471 2.264
vertex 64.286 -11.291 2.446
vertex 64.286 -6.519 2.793
endloop
endfacet
facet normal 0.043 -0.441 0.897
outer loop
vertex 55.714 -12.941 1.917
vertex 55.714 -14.943 0.934
vertex 64.286 -13.037 1.462
endloop
endfacet
facet normal 0.041 -0.490 0.871
outer loop
vertex 55.714 -12.941 1.917
vertex 64.286 -13.037 1.462
vertex 64.286 -11.291 2.446
endloop
endfacet
facet normal 0.129 -0.379 -0.916
outer loop
vertex 55.714 -14.943 0.934
vertex 55.714 -12.941 0.107
vertex 64.286 -11.291 0.635
endloop
endfacet
facet normal 0.149 -0.423 -0.894
outer loop
vertex 55.714 -14.943 0.934
vertex 64.286 -11.291 0.635
vertex 64.286 -13.037 1.462
endloop
endfacet
facet normal 0.070 -0.083 -0.994
outer loop
vertex 55.714 -12.941 0.107
vertex 55.714 -7.471 -0.350
vertex 64.286 -6.519 0.179
endloop
endfacet
facet normal 0.079 -0.095 -0.992
outer loop
vertex 55.714 -12.941 0.107
vertex 64.286 -6.519 0.179
vertex 64.286 -11.291 0.635
endloop
endfacet
facet normal 0.061 -0.021 -0.998
outer loop
vertex 55.714 -7.471 -0.350
vertex 55.714 -0.000 -0.506
vertex 64.286 -0.000 0.022
endloop
endfacet
facet normal 0.064 -0.024 -0.998
outer loop
vertex 55.714 -7.471 -0.350
vertex 64.286 -0.000 0.022
vertex 64.286 -6.519 0.179
endloop
endfacet
facet normal 0.064 0.021 -0.998
outer loop
vertex 55.714 -0.000 -0.506
vertex 55.714 7.471 -0.350
vertex 64.286 6.519 0.179
endloop
endfacet
facet normal 0.061 0.024 -0.998
outer loop
vertex 55.714 -0.000 -0.506
vertex 64.286 6.519 0.179
vertex 64.286 -0.000 0.022
endloop
endfacet
facet normal 0.077 0.083 -0.994
outer loop
vertex 55.714 7.471 -0.350
vertex 55.714 12.941 0.107
vertex 64.286 11.291 0.635
endloop
endfacet
facet normal 0.072 0.095 -0.993
outer loop
vertex 55.714 7.471 -0.350
vertex 64.286 11.291 0.635
vertex 64.286 6.519 0.179
endloop
endfacet
facet normal 0.140 0.378 -0.915
outer loop
vertex 55.714 12.941 0.107
vertex 55.714 14.943 0.934
vertex 64.286 13.037 1.462
endloop
endfacet
facet normal 0.137 0.424 -0.895
outer loop
vertex 55.714 12.941 0.107
vertex 64.286 13.037 1.462
vertex 64.286 11.291 0.635
endloop
endfacet
facet normal 0.154 0.485 0.861
outer loop
vertex 64.286 13.037 1.462
vertex 64.286 11.291 2.446
vertex 72.857 7.427 3.092
endloop
endfacet
facet normal 0.271 0.626 0.731
outer loop
vertex 64.286 13.037 1.462
vertex 72.857 7.427 3.092
vertex 72.857 8.575 2.108
endloop
endfacet
facet normal -0.056 0.072 0.996
outer loop
vertex 64.286 11.291 2.446
vertex 64.286 6.519 2.793
vertex 72.857 4.288 3.439
endloop
endfacet
facet normal -0.025 0.110 0.994
outer loop
vertex 64.286 11.291 2.446
vertex 72.857 4.288 3.439
vertex 72.857 7.427 3.092
endloop
endfacet
facet normal -0.075 0.017 0.997
outer loop
vertex 64.286 6.519 2.793
vertex 64.286 0.000 2.902
vertex 72.857 0.000 3.548
endloop
endfacet
facet normal -0.069 0.025 0.997
outer loop
vertex 64.286 6.519 2.793
vertex 72.857 0.000 3.548
vertex 72.857 4.288 3.439
endloop
endfacet
facet normal -0.071 -0.017 0.997
outer loop
vertex 64.286 0.000 2.902
vertex 64.286 -6.519 2.793
vertex 72.857 -4.288 3.439
endloop
endfacet
facet normal -0.075 -0.025 0.997
outer loop
vertex 64.286 0.000 2.902
vertex 72.857 -4.288 3.439
vertex 72.857 0.000 3.548
endloop
endfacet
facet normal -0.042 -0.072 0.996
outer loop
vertex 64.286 -6.519 2.793
vertex 64.286 -11.291 2.446
vertex 72.857 -7.427 3.092
endloop
endfacet
facet normal -0.046 -0.110 0.993
outer loop
vertex 64.286 -6.519 2.793
vertex 72.857 -7.427 3.092
vertex 72.857 -4.288 3.439
endloop
endfacet
facet normal 0.186 -0.482 0.856
outer loop
vertex 64.286 -11.291 2.446
vertex 64.286 -13.037 1.462
vertex 72.857 -8.575 2.108
endloop
endfacet
facet normal 0.230 -0.633 0.739
outer loop
vertex 64.286 -11.291 2.446
vertex 72.857 -8.575 2.108
vertex 72.857 -7.427 3.092
endloop
endfacet
facet normal 0.253 -0.414 -0.874
outer loop
vertex 64.286 -13.037 1.462
vertex 64.286 -11.291 0.635
vertex 72.857 -7.427 1.281
endloop
endfacet
facet normal 0.343 -0.549 -0.762
outer loop
vertex 64.286 -13.037 1.462
vertex 72.857 -7.427 1.281
vertex 72.857 -8.575 2.108
endloop
endfacet
facet normal 0.099 -0.095 -0.991
outer loop
vertex 64.286 -11.291 0.635
vertex 64.286 -6.519 0.179
vertex 72.857 -4.288 0.825
endloop
endfacet
facet normal 0.138 -0.143 -0.980
outer loop
vertex 64.286 -11.291 0.635
vertex 72.857 -4.288 0.825
vertex 72.857 -7.427 1.281
endloop
endfacet
facet normal 0.075 -0.024 -0.997
outer loop
vertex 64.286 -6.519 0.179
vertex 64.286 -0.000 0.022
vertex 72.857 -0.000 0.668
endloop
endfacet
facet normal 0.085 -0.036 -0.996
outer loop
vertex 64.286 -6.519 0.179
vertex 72.857 -0.000 0.668
vertex 72.857 -4.288 0.825
endloop
endfacet
facet normal 0.081 0.024 -0.996
outer loop
vertex 64.286 -0.000 0.022
vertex 64.286 6.519 0.179
vertex 72.857 4.288 0.825
endloop
endfacet
facet normal 0.075 0.036 -0.997
outer loop
vertex 64.286 -0.000 0.022
vertex 72.857 4.288 0.825
vertex 72.857 -0.000 0.668
endloop
endfacet
facet normal 0.117 0.095 -0.989
outer loop
vertex 64.286 6.519 0.179
vertex 64.286 11.291 0.635
vertex 72.857 7.427 1.281
endloop
endfacet
facet normal 0.111 0.143 -0.983
outer loop
vertex 64.286 6.519 0.179
vertex 72.857 7.427 1.281
vertex 72.857 4.288 0.825
endloop
endfacet
facet normal 0.279 0.411 -0.868
outer loop
vertex 64.286 11.291 0.635
vertex 64.286 13.037 1.462
vertex 72.857 8.575 2.108
endloop
endfacet
facet normal 0.309 0.556 -0.772
outer loop
vertex 64.286 11.291 0.635
vertex 72.857 8.575 2.108
vertex 72.857 7.427 1.281
endloop
endfacet
facet normal 0.097 0.647 0.756
outer loop
vertex 72.857 8.575 2.108
vertex 72.857 7.427 3.092
vertex 81.429 5.254 3.856
endloop
endfacet
facet normal 0.166 0.760 0.628
outer loop
vertex 72.857 8.575 2.108
vertex 81.429 5.254 3.856
vertex 81.429 6.067 2.872
endloop
endfacet
facet normal -0.072 0.110 0.991
outer loop
vertex 72.857 7.427 3.092
vertex 72.857 4.288 3.439
vertex 81.429 3.034 4.203
endloop
endfacet
facet normal -0.049 0.154 0.987
outer loop
vertex 72.857 7.427 3.092
vertex 81.429 3.034 4.203
vertex 81.429 5.254 3.856
endloop
endfacet
facet normal -0.089 0.025 0.996
outer loop
vertex 72.857 4.288 3.439
vertex 72.857 0.000 3.548
vertex 81.429 0.000 4.312
endloop
endfacet
facet normal -0.084 0.036 0.996
outer loop
vertex 72.857 4.288 3.439
vertex 81.429 0.000 4.312
vertex 81.429 3.034 4.203
endloop
endfacet
facet normal -0.085 -0.025 0.996
outer loop
vertex 72.857 0.000 3.548
vertex 72.857 -4.288 3.439
vertex 81.429 -3.034 4.203
endloop
endfacet
facet normal -0.089 -0.036 0.995
outer loop
vertex 72.857 0.000 3.548
vertex 81.429 -3.034 4.203
vertex 81.429 0.000 4.312
endloop
endfacet
facet normal -0.061 -0.110 0.992
outer loop
vertex 72.857 -4.288 3.439
vertex 72.857 -7.427 3.092
vertex 81.429 -5.254 3.856
endloop
endfacet
facet normal -0.065 -0.154 0.986
outer loop
vertex 72.857 -4.288 3.439
vertex 81.429 -5.254 3.856
vertex 81.429 -3.034 4.203
endloop
endfacet
facet normal 0.122 -0.645 0.754
outer loop
vertex 72.857 -7.427 3.092
vertex 72.857 -8.575 2.108
vertex 81.429 -6.067 2.872
endloop
endfacet
facet normal 0.137 -0.764 0.631
outer loop
vertex 72.857 -7.427 3.092
vertex 81.429 -6.067 2.872
vertex 81.429 -5.254 3.856
endloop
endfacet
facet normal 0.215 -0.571 -0.793
outer loop
vertex 72.857 -8.575 2.108
vertex 72.857 -7.427 1.281
vertex 81.429 -5.254 2.045
endloop
endfacet
facet normal 0.262 -0.688 -0.677
outer loop
vertex 72.857 -8.575 2.108
vertex 81.429 -5.254 2.045
vertex 81.429 -6.067 2.872
endloop
endfacet
facet normal 0.109 -0.143 -0.984
outer loop
vertex 72.857 -7.427 1.281
vertex 72.857 -4.288 0.825
vertex 81.429 -3.034 1.589
endloop
endfacet
facet normal 0.137 -0.199 -0.970
outer loop
vertex 72.857 -7.427 1.281
vertex 81.429 -3.034 1.589
vertex 81.429 -5.254 2.045
endloop
endfacet
facet normal 0.089 -0.036 -0.995
outer loop
vertex 72.857 -4.288 0.825
vertex 72.857 -0.000 0.668
vertex 81.429 -0.000 1.432
endloop
endfacet
facet normal 0.096 -0.051 -0.994
outer loop
vertex 72.857 -4.288 0.825
vertex 81.429 -0.000 1.432
vertex 81.429 -3.034 1.589
endloop
endfacet
facet normal 0.094 0.036 -0.995
outer loop
vertex 72.857 -0.000 0.668
vertex 72.857 4.288 0.825
vertex 81.429 3.034 1.589
endloop
endfacet
facet normal 0.089 0.051 -0.995
outer loop
vertex 72.857 -0.000 0.668
vertex 81.429 3.034 1.589
vertex 81.429 -0.000 1.432
endloop
endfacet
facet normal 0.124 0.143 -0.982
outer loop
vertex 72.857 4.288 0.825
vertex 72.857 7.427 1.281
vertex 81.429 5.254 2.045
endloop
endfacet
facet normal 0.116 0.200 -0.973
outer loop
vertex 72.857 4.288 0.825
vertex 81.429 5.254 2.045
vertex 81.429 3.034 1.589
endloop
endfacet
facet normal 0.236 0.568 -0.789
outer loop
vertex 72.857 7.427 1.281
vertex 72.857 8.575 2.108
vertex 81.429 6.067 2.872
endloop
endfacet
facet normal 0.236 0.693 -0.681
outer loop
vertex 72.857 7.427 1.281
vertex 81.429 6.067 2.872
vertex 81.429 5.254 2.045
endloop
endfacet
facet normal 0.331 0.727 0.601
outer loop
vertex 81.429 6.067 2.872
vertex 81.429 5.254 3.856
vertex 90.000 0.624 4.738
endloop
endfacet
facet normal 0.521 0.849 0.083
outer loop
vertex 81.429 6.067 2.872
vertex 90.000 0.624 4.738
vertex 90.000 0.720 3.754
endloop
endfacet
facet normal -0.053 0.154 0.987
outer loop
vertex 81.429 5.254 3.856
vertex 81.429 3.034 4.203
vertex 90.000 0.360 5.085
endloop
endfacet
facet normal 0.345 0.747 0.568
outer loop
vertex 81.429 5.254 3.856
vertex 90.000 0.360 5.085
vertex 90.000 0.624 4.738
endloop
endfacet
facet normal -0.102 0.036 0.994
outer loop
vertex 81.429 3.034 4.203
vertex 81.429 0.000 4.312
vertex 90.000 0.000 5.194
endloop
endfacet
facet normal -0.008 0.291 0.957
outer loop
vertex 81.429 3.034 4.203
vertex 90.000 0.000 5.194
vertex 90.000 0.360 5.085
endloop
endfacet
facet normal -0.091 -0.036 0.995
outer loop
vertex 81.429 0.000 4.312
vertex 81.429 -3.034 4.203
vertex 90.000 -0.360 5.085
endloop
endfacet
facet normal -0.098 -0.290 0.952
outer loop
vertex 81.429 0.000 4.312
vertex 90.000 -0.360 5.085
vertex 90.000 0.000 5.194
endloop
endfacet
facet normal -0.018 -0.154 0.988
outer loop
vertex 81.429 -3.034 4.203
vertex 81.429 -5.254 3.856
vertex 90.000 -0.624 4.738
endloop
endfacet
facet normal 0.183 -0.783 0.595
outer loop
vertex 81.429 -3.034 4.203
vertex 90.000 -0.624 4.738
vertex 90.000 -0.360 5.085
endloop
endfacet
facet normal 0.384 -0.712 0.588
outer loop
vertex 81.429 -5.254 3.856
vertex 81.429 -6.067 2.872
vertex 90.000 -0.720 3.754
endloop
endfacet
facet normal 0.467 -0.880 0.086
outer loop
vertex 81.429 -5.254 3.856
vertex 90.000 -0.720 3.754
vertex 90.000 -0.624 4.738
endloop
endfacet
facet normal 0.416 -0.649 -0.637
outer loop
vertex 81.429 -6.067 2.872
vertex 81.429 -5.254 2.045
vertex 90.000 -0.624 2.927
endloop
endfacet
facet normal 0.534 -0.840 -0.098
outer loop
vertex 81.429 -6.067 2.872
vertex 90.000 -0.624 2.927
vertex 90.000 -0.720 3.754
endloop
endfacet
facet normal 0.161 -0.199 -0.967
outer loop
vertex 81.429 -5.254 2.045
vertex 81.429 -3.034 1.589
vertex 90.000 -0.360 2.471
endloop
endfacet
facet normal 0.461 -0.769 -0.444
outer loop
vertex 81.429 -5.254 2.045
vertex 90.000 -0.360 2.471
vertex 90.000 -0.624 2.927
endloop
endfacet
facet normal 0.102 -0.051 -0.993
outer loop
vertex 81.429 -3.034 1.589
vertex 81.429 -0.000 1.432
vertex 90.000 -0.000 2.314
endloop
endfacet
facet normal 0.214 -0.390 -0.896
outer loop
vertex 81.429 -3.034 1.589
vertex 90.000 -0.000 2.314
vertex 90.000 -0.360 2.471
endloop
endfacet
facet normal 0.118 0.051 -0.992
outer loop
vertex 81.429 -0.000 1.432
vertex 81.429 3.034 1.589
vertex 90.000 0.360 2.471
endloop
endfacet
facet normal 0.094 0.397 -0.913
outer loop
vertex 81.429 -0.000 1.432
vertex 90.000 0.360 2.471
vertex 90.000 -0.000 2.314
endloop
endfacet
facet normal 0.205 0.197 -0.959
outer loop
vertex 81.429 3.034 1.589
vertex 81.429 5.254 2.045
vertex 90.000 0.624 2.927
endloop
endfacet
facet normal 0.306 0.824 -0.476
outer loop
vertex 81.429 3.034 1.589
vertex 90.000 0.624 2.927
vertex 90.000 0.360 2.471
endloop
endfacet
facet normal 0.459 0.634 -0.623
outer loop
vertex 81.429 5.254 2.045
vertex 81.429 6.067 2.872
vertex 90.000 0.720 3.754
endloop
endfacet
facet normal 0.481 0.871 -0.102
outer loop
vertex 81.429 5.254 2.045
vertex 90.000 0.720 3.754
vertex 90.000 0.624 2.927
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 7.482 1.477
vertex -90.000 8.640 0.194
endloop
endfacet
facet normal 0.274 0.957 0.094
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 0.720 3.754
vertex 90.000 0.624 4.738
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 4.320 1.929
vertex -90.000 7.482 1.477
endloop
endfacet
facet normal 0.394 0.732 0.556
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 0.624 4.738
vertex 90.000 0.360 5.085
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 0.000 2.072
vertex -90.000 4.320 1.929
endloop
endfacet
facet normal 0.474 0.256 0.842
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 0.360 5.085
vertex 90.000 0.000 5.194
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 -4.320 1.929
vertex -90.000 0.000 2.072
endloop
endfacet
facet normal 0.474 -0.256 0.842
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 0.000 5.194
vertex 90.000 -0.360 5.085
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 -7.482 1.477
vertex -90.000 -4.320 1.929
endloop
endfacet
facet normal 0.394 -0.732 0.556
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 -0.360 5.085
vertex 90.000 -0.624 4.738
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 -8.640 0.194
vertex -90.000 -7.482 1.477
endloop
endfacet
facet normal 0.274 -0.957 0.094
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 -0.624 4.738
vertex 90.000 -0.720 3.754
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 -7.482 -0.884
vertex -90.000 -8.640 0.194
endloop
endfacet
facet normal 0.276 -0.955 -0.111
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 -0.720 3.754
vertex 90.000 -0.624 2.927
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 -4.320 -1.479
vertex -90.000 -7.482 -0.884
endloop
endfacet
facet normal 0.362 -0.807 -0.466
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 -0.624 2.927
vertex 90.000 -0.360 2.471
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 -0.000 -1.683
vertex -90.000 -4.320 -1.479
endloop
endfacet
facet normal 0.476 -0.351 -0.807
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 -0.360 2.471
vertex 90.000 -0.000 2.314
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 4.320 -1.479
vertex -90.000 -0.000 -1.683
endloop
endfacet
facet normal 0.476 0.351 -0.807
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 -0.000 2.314
vertex 90.000 0.360 2.471
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 7.482 -0.884
vertex -90.000 4.320 -1.479
endloop
endfacet
facet normal 0.362 0.807 -0.466
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 0.360 2.471
vertex 90.000 0.624 2.927
endloop
endfacet
facet normal -1.000 0.000 0.000
outer loop
vertex -90.000 -0.000 0.239
vertex -90.000 8.640 0.194
vertex -90.000 7.482 -0.884
endloop
endfacet
facet normal 0.276 0.955 -0.111
outer loop
vertex 92.500 -0.000 3.788
vertex 90.000 0.624 2.927
vertex 90.000 0.720 3.754
endloop
endfacet
facet normal 0.000 -1.000 0.000
outer loop
vertex -84.600 -0.700 -1.513
vertex -82.650 -0.700 -12.513
vertex -71.600 -0.700 -1.513
endloop
endfacet
facet normal 0.000 1.000 0.000
outer loop
vertex -84.600 0.700 -1.513
vertex -71.600 0.700 -1.513
vertex -82.650 0.700 -12.513
endloop
endfacet
facet normal 0.000 0.000 1.000
outer loop
vertex -84.600 -0.700 -1.513
vertex -71.600 -0.700 -1.513
vertex -71.600 0.700 -1.513
endloop
endfacet
facet normal 0.000 0.000 1.000
outer loop
vertex -84.600 -0.700 -1.513
vertex -71.600 0.700 -1.513
vertex -84.600 0.700 -1.513
endloop
endfacet
facet normal 0.706 0.000 -0.709
outer loop
vertex -71.600 -0.700 -1.513
vertex -82.650 -0.700 -12.513
vertex -82.650 0.700 -12.513
endloop
endfacet
facet normal 0.706 0.000 -0.709
outer loop
vertex -71.600 -0.700 -1.513
vertex -82.650 0.700 -12.513
vertex -71.600 0.700 -1.513
endloop
endfacet
facet normal -0.985 0.000 -0.175
outer loop
vertex -82.650 -0.700 -12.513
vertex -84.600 -0.700 -1.513
vertex -84.600 0.700 -1.513
endloop
endfacet
facet normal -0.985 0.000 -0.175
outer loop
vertex -82.650 -0.700 -12.513
vertex -84.600 0.700 -1.513
vertex -82.650 0.700 -12.513
endloop
endfacet
facet normal -0.040 -0.999 0.000
outer loop
vertex -75.600 7.460 -1.816
vertex -73.800 7.388 -11.816
vertex -63.600 6.980 -1.816
endloop
endfacet
facet normal 0.040 0.999 0.000
outer loop
vertex -75.600 8.860 -1.816
vertex -63.600 8.380 -1.816
vertex -73.800 8.788 -11.816
endloop
endfacet
facet normal 0.000 0.000 1.000
outer loop
vertex -75.600 7.460 -1.816
vertex -63.600 6.980 -1.816
vertex -63.600 8.380 -1.816
endloop
endfacet
facet normal 0.000 0.000 1.000
outer loop
vertex -75.600 7.460 -1.816
vertex -63.600 8.380 -1.816
vertex -75.600 8.860 -1.816
endloop
endfacet
facet normal 0.700 0.000 -0.714
outer loop
vertex -63.600 6.980 -1.816
vertex -73.800 7.388 -11.816
vertex -73.800 8.788 -11.816
endloop
endfacet
facet normal 0.700 0.000 -0.714
outer loop
vertex -63.600 6.980 -1.816
vertex -73.800 8.788 -11.816
vertex -63.600 8.380 -1.816
endloop
endfacet
facet normal -0.984 0.000 -0.177
outer loop
vertex -73.800 7.388 -11.816
vertex -75.600 7.460 -1.816
vertex -75.600 8.860 -1.816
endloop
endfacet
facet normal -0.984 0.000 -0.177
outer loop
vertex -73.800 7.388 -11.816
vertex -75.600 8.860 -1.816
vertex -73.800 8.788 -11.816
endloop
endfacet
facet normal 0.040 -0.999 0.000
outer loop
vertex -75.600 -8.860 -1.816
vertex -73.800 -8.788 -11.816
vertex -63.600 -8.380 -1.816
endloop
endfacet
facet normal -0.040 0.999 0.000
outer loop
vertex -75.600 -7.460 -1.816
vertex -63.600 -6.980 -1.816
vertex -73.800 -7.388 -11.816
endloop
endfacet
facet normal 0.000 0.000 1.000
outer loop
vertex -75.600 -8.860 -1.816
vertex -63.600 -8.380 -1.816
vertex -63.600 -6.980 -1.816
endloop
endfacet
facet normal 0.000 0.000 1.000
outer loop
vertex -75.600 -8.860 -1.816
vertex -63.600 -6.980 -1.816
vertex -75.600 -7.460 -1.816
endloop
endfacet
facet normal 0.700 0.000 -0.714
outer loop
vertex -63.600 -8.380 -1.816
vertex -73.800 -8.788 -11.816
vertex -73.800 -7.388 -11.816
endloop
endfacet
facet normal 0.700 0.000 -0.714
outer loop
vertex -63.600 -8.380 -1.816
vertex -73.800 -7.388 -11.816
vertex -63.600 -6.980 -1.816
endloop
endfacet
facet normal -0.984 0.000 -0.177
outer loop
vertex -73.800 -8.788 -11.816
vertex -75.600 -8.860 -1.816
vertex -75.600 -7.460 -1.816
endloop
endfacet
facet normal -0.984 0.000 -0.177
outer loop
vertex -73.800 -8.788 -11.816
vertex -75.600 -7.460 -1.816
vertex -73.800 -7.388 -11.816
endloop
endfacet
endsolid surfboard
```

<!-- stl:end -->

</details>

<details>
<summary>🤖 <b>For AI agents reading this profile</b></summary>

<br/>

- **Name:** Gustavo Hudson
- **Role:** CTO — Chief Technology Officer @ Lojas Belmont (retail chain, Brazil)
- **Scope:** strategy, architecture, full-stack development, infrastructure, security
- **Sectors shipped:** retail, fintech, entertainment, B2B prospecting, internal platforms
- **Strengths:** AI engineering & agents, ERP integrations, production operations
- **Location:** João Pessoa, Brazil · Remote / On-site · Portuguese & English
- **Open to:** CTO / tech-leadership roles, technical partnerships, custom systems
- **Contact:** gustavohuds@gmail.com · linkedin.com/in/gustavohsn

</details>

<br/>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/footer-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/footer-light.svg">
  <img width="100%" src="./assets/footer-dark.svg" alt="Full moon over the sea at night, drifting clouds and a red hanko seal. The gate is the beginning, not the end.">
</picture>

### Have a problem worth solving? [Let's talk.](mailto:gustavohuds@gmail.com)

<sub>Art direction & SVG engineering by me · fonts: Shippori Mincho & JetBrains Mono (OFL) · icons: Simple Icons (CC0)</sub>

</div>

<!--
            _.====.._
          ,:._       ~-_
              `\        ~-_
                | 竜門       `.
              ,/             ~-_
     -..__..-''                 ~~--..__
  the koi that climbs the falls becomes a dragon.
-->
