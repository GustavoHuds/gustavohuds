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

## 一 · Impact

<div align="center">

| 🧩 **15+** | 🏬 **8 stores** | 🧪 **2,000+** | 📦 **1,600+** | 🔥 **780+** |
|:---:|:---:|:---:|:---:|:---:|
| systems designed, built<br/>and run in production | of a retail chain + a distribution<br/>center running on my software | automated tests in a<br/>single platform (BELeads) | SKUs unified into one<br/>catalog by my data pipeline | GitHub contributions<br/>(public + private) |

</div>

## 二 · About

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

## 三 · Work by sector

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

## 四 · How I ship

| 段取り **Dandori** · *Preparation* | 検証 **Kenshō** · *Verification* | 改善 **Kaizen** · *Continuous improvement* |
|---|---|---|
| *"Preparation is 80% of the work."* Scope and acceptance criteria, architecture decision records, security requirements per system, threat-aware data modeling. | Unit, integration and E2E tests. Secret, SAST and container scanning. Code review on every change. Staged rollouts with rollback plans. | Monitoring, alerts and an on-call bot. Automated backups with restore drills. Runbooks and user manuals. Every incident makes the system stronger. |

## 五 · Stack

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

## 六 · Activity

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
