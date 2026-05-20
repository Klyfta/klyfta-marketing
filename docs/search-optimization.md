# Search optimisation for verkio.eu

How to maximise the chances of Verkio being found by search engines, ranked alongside the brand-posture constraints that rule out US-hosted analytics and most "growth-hacking" SEO tactics.

This is an honest, three-layer view. Most "SEO checklists" online focus only on the first layer because it's the part vendors sell tools for. In reality the second and third layers determine 80%+ of ranking outcomes.

---

## Layer 1 — Technical SEO (in this codebase)

This is the layer we fully control. Status as of writing:

### Already shipped

| Item | Where | Notes |
|---|---|---|
| `sitemap.xml` | `src/app/sitemap.ts` | 17 locales × 4 routes = 68 URLs. `hreflang` alternates per entry, including `x-default` pointing to `/en`. |
| `robots.txt` | `src/app/robots.ts` | Allow-all, references the sitemap. |
| Per-page metadata | `src/app/[locale]/layout.tsx` + each route's `generateMetadata` | `<title>`, `<meta name="description">`, canonical URL, language alternates with `x-default`. |
| Open Graph tags | `src/app/[locale]/layout.tsx` | `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`, `og:type=website`, `og:image` reference. |
| Twitter Card | `src/app/[locale]/layout.tsx` | `summary_large_image`, mirrors OG values. |
| JSON-LD structured data | `src/app/[locale]/page.tsx` | `Organization` schema + `FAQPage` schema (pulls FAQ items from translations automatically). Makes FAQ rich results possible in Google. |
| Locale-prefixed URLs | next-intl routing | Each language gets its own URL hierarchy with correct `<html lang>`. |
| 307 redirect on `/` | `src/proxy.ts` | Routes anonymous visitors to their detected locale. |
| Semantic HTML | Page components | Proper `<h1>`/`<h2>`, `<nav>`, `<footer>`, lists, etc. |
| Fonts self-hosted | `next/font/google` | Inter is downloaded at build time and served from our domain — no Google CDN request at runtime. Keeps the "no US subprocessors" claim intact and avoids a render-blocking external request. |
| No tracking JS | Whole repo | No GA, no Mixpanel, no Segment, no Hotjar. Pages stay fast and the brand claim stays clean. |

### Still to do in the repo

| Item | Effort | Priority |
|---|---|---|
| **`public/og-image.png`** (1200×630) | ~1 hour design | **High.** Until this file exists, social shares (Slack, LinkedIn, X, Discord) will 404 on the image despite the metadata pointing at it. Logo + tagline + brand-coloured background is enough. |
| **Favicon variants** (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) | ~30 min | Medium. Browsers fall back to `favicon.ico` but mobile bookmarks and PWA installs look unbranded without these. |
| **`public/manifest.webmanifest`** | ~15 min | Medium. PWA installability + Lighthouse score. |
| **`theme-color` meta** | ~5 min | Low. Mobile browser address-bar colour. |
| **Content scaffolding** (`src/app/[locale]/articles/[slug]/page.tsx`) | ~2–3 hours | **High** if SEO is a real growth channel. Without an articles route, every keyword landing page has to be hand-built. |

None of these block indexing — the site can be deployed and crawled today. They're polish that compounds value over time.

---

## Layer 2 — Content (the hard part)

This is where most marketing sites underperform.

### The current problem

The site has **4 pages** (home, roadmap, privacy, terms) × 17 locales. From a search-engine perspective that's enough to rank for the brand search "Verkio" — and nothing else.

A buyer searching for *"GDPR-compliant email hosting"*, *"Microsoft 365 alternative Europe"*, or *"US CLOUD Act email"* doesn't have a page on `verkio.eu` to land on that answers their specific question. They'll land on the homepage and see generic positioning — or, more likely, they won't find Verkio at all because Google has no dedicated page from our domain matching that query.

### The fix: targeted articles

Publish ~8–15 articles before launch, each targeting one specific search intent. Each article should:

- Live at `/articles/[slug]` (locale-prefixed like every other route)
- Be **at least 1200 words** (Google considers thin content low-quality)
- Answer one specific question buyers actually type into Google
- Link internally to relevant residency / suite / FAQ sections of the homepage
- Use proper `<h1>`/`<h2>`/`<h3>` hierarchy
- Include schema.org `Article` JSON-LD (the same pattern as homepage's `Organization` schema)
- Be translated, at minimum, to the languages where the keyword has measurable search volume

### Article shortlist (in rough priority)

| Slug | Targeting | Why |
|---|---|---|
| `us-cloud-act-eu-businesses` | *what is the US CLOUD Act* (and variants) | High-intent procurement query. Verkio's strongest differentiator. |
| `gdpr-native-vs-gdpr-compliant` | *GDPR compliance email* | Long-tail high-intent. Sets up the "compliant via DPA" framing the comparison table uses. |
| `eu-region-isnt-enough` | *AWS EU region GDPR*, *eu-central-1 CLOUD Act* | Common procurement gotcha. Educates buyers, leads them to Verkio's stricter posture. |
| `google-workspace-vs-microsoft-365-vs-eu-alternatives` | *alternative to Google Workspace*, *Microsoft 365 alternative Europe* | High-volume comparison query. Mirrors the on-site comparison table but as a long-form piece. |
| `migrating-from-google-workspace` | *migrate from Google Workspace*, *Google Workspace export* | Migration intent → product fit. |
| `migrating-from-microsoft-365` | *migrate from Microsoft 365*, *export from M365* | Same. |
| `imap-vs-proprietary-mail` | *open email standards*, *no vendor lock-in email* | Reinforces the standards-first principle. |
| `where-is-microsoft-365-data-actually-stored` | *Microsoft 365 EU data centre*, *Office 365 data residency* | Educational; pulls buyers researching M365's data residency story. |
| `eidas-2-and-digital-sovereignty` | *eIDAS 2 EU*, *European digital sovereignty* | Forward-looking, ties to roadmap (eIDAS document signing Q2 2027). |
| `procurement-checklist-eu-saas` | *EU SaaS procurement checklist*, *vendor due diligence GDPR* | Bookmark-bait for buyers. Becomes the page they share internally. |
| `verkio-vs-protonmail-vs-tutanota` | *Verkio vs ProtonMail*, *Tutanota alternative* | Brand-adjacent comparison. Lower priority pre-launch — only valuable once Verkio has a track record to compare against. |

Each article is ~4–8 hours of writing for someone who knows the material (the founder, ideally). Translation is a separate cost; the highest-volume target queries are in English first, then `de` and `fr` second.

### Material already half-written

A lot of the underlying content already exists internally:

- `verkio-control-plane/docs/brand-claims.md` — the basis for the *US CLOUD Act* and *GDPR-native vs compliant* articles
- `verkio-control-plane/docs/development/domain-auto-setup.md` — the basis for *what proper EU residency looks like in practice*
- The current FAQ section answers — each can be expanded into a dedicated article

So the "blank page" cost is lower than it looks. Most of this is converting internal docs into outward-facing prose.

---

## Layer 3 — Off-site authority

This is the layer that no codebase work fixes, and it dominates competitive rankings.

### How search engines decide rankings

Simplified: Google reads pages, understands what they're about (Layer 1), evaluates how thorough the content is (Layer 2), and then asks *"do other reputable sites point to this page?"* The third question is the tiebreaker for almost every commercial query.

A brand-new domain with perfect on-page SEO and zero backlinks **will not rank** for queries with competition. Even if our content is objectively better. This isn't a bug; it's how authority works in a network with billions of pages.

### What to do about it

| Action | Cost | Impact |
|---|---|---|
| **Submit to EU-focused directories** | Free, ~30 min each | Modest individually, compound. Targets: European Alternatives, EuroStack catalogue, awesome-eu lists, awesome-selfhosted (where applicable). |
| **Submit to general SaaS directories** | Free–$50 each | Modest. Targets: AlternativeTo (key for "alternative to Google Workspace" queries), Product Hunt at launch, Indie Hackers, Hacker News (Show HN). |
| **Founder writing on personal blog / Substack / Medium with backlinks to verkio.eu** | Hours per piece | Solid. Founder-credibility-driven authority. Cross-posting brand-claims-style content to a personal blog with a link back compounds. |
| **Guest posts on EU privacy / sovereignty publications** | High effort | High value. Targets: noyb.eu writers, tech policy publications, European Digital Rights, EFF (US but high authority), GDPR-specialist legal blogs. |
| **PR around launch** | Variable | High value if landed. Specifically EU-tech press: Sifted, EU-Startups, TechCrunch's EU coverage, Heise (DE), Le Monde Informatique (FR), Computer Sweden (SE). |
| **Sponsor open-source clients (Thunderbird, k-9 Mail, DAVx⁵)** | $$$ | Long-term reputation play. Plays into the standards-first principle. Mentions in their docs and release notes are high-trust backlinks. |
| **Conference talks** | Time | Talks at FOSDEM, Nordic.js, European tech-policy events tend to generate links from event sites + write-ups. |
| **Linkable assets** | Time | The brand-claims doc, if published as an article, is exactly the kind of resource other writers cite when discussing EU sovereignty. So is the comparison table. Make these standalone pages. |

### What NOT to do

- ❌ **Buy backlinks.** Google's modern systems catch this and the penalty is severe. Don't.
- ❌ **Spam comment sections / forums** with links. Same.
- ❌ **Reciprocal-link schemes** with unrelated sites. Same.
- ❌ **Private blog networks (PBNs).** Same.
- ❌ **AI-generated content stuffed with keywords.** Google's helpful-content updates explicitly target this. Articles must be written or at minimum heavily curated by someone who knows the material.

### What works specifically for Verkio's positioning

The brand posture is itself a backlink generator if leveraged:

- **Publish the "no US subprocessors" subprocessor list publicly.** Privacy-focused publications cite these.
- **Publish the brand-claims doc** (or a public version of it) on verkio.eu/manifesto or similar. It's the kind of stance piece that gets cited and discussed.
- **Be a voice in EU sovereignty conversations** — comment publicly on CLOUD Act news, Schrems decisions, EU-US Data Privacy Framework rulings. Each appearance is a chance for someone to link back.

---

## Operational checklist (post-deploy)

These must happen but don't live in the codebase.

| Task | When | Owner |
|---|---|---|
| Submit `sitemap.xml` to Google Search Console | Day 1 of being live | Marketing/founder |
| Submit `sitemap.xml` to Bing Webmaster Tools | Day 1 | Marketing/founder |
| Verify Search Console via DNS TXT record | Day 1 | Founder |
| Monitor Search Console for crawl errors weekly | Ongoing | Marketing/founder |
| Check Core Web Vitals in Search Console monthly | Ongoing | Marketing/founder |
| Track ranking position for ~10 target keywords | Weekly | Use an EU-resident keyword tracker (e.g., Sistrix, SEOlyzer). Avoid Ahrefs/Semrush for live tracking on customer data; using their *aggregate* data is fine but don't load their pixels on the site. |
| Refresh `lastModified` in sitemap whenever content changes | Continuous (already automatic via the sitemap generator) | n/a |

Google Search Console and Bing Webmaster Tools are **acceptable** under the brand claims:

- They read public metadata via DNS verification and sitemap crawl
- They don't inject scripts or load pixels on visitor sessions
- They don't share visitor PII back

Avoid embedding Google Tag Manager, Google Analytics, or any of their visitor-side products. Search Console is the only Google product to use here.

---

## Realistic expectations

| Query type | Time to rank top 10 | Time to rank #1 |
|---|---|---|
| Brand search ("Verkio", "Verkio email") | Days after first indexing | Within 2 weeks |
| Long-tail commercial query (e.g., *"is Microsoft 365 subject to US CLOUD Act"*) | 1–3 months with a dedicated article + 3–5 backlinks | 3–6 months |
| Mid-volume commercial query (*"GDPR-compliant email"*) | 6–12 months | 12–18 months |
| High-volume head term (*"business email Europe"*, *"work suite Europe"*) | 12+ months minimum | Often 18–24+ months for new domains |

These windows assume Layers 1, 2, and 3 are all being worked. With perfect technical SEO but no Layer 2 content and no Layer 3 authority, the site will rank only for brand searches. Indefinitely.

---

## What "done" looks like

Three different definitions of "search-optimised," from cheap to ambitious:

**Minimum viable (where we are after the SEO sprint):**
- Site indexes correctly
- Brand searches return Verkio #1
- Social shares look right (once `og-image.png` lands)
- ✅ This is achievable today

**Competitive on long-tail (~3–6 months from publishing articles):**
- 8–15 targeted articles live and translated
- 30–50 backlinks from EU privacy/tech directories and a handful of guest posts
- Ranking top 10 for ~20 long-tail queries
- Each article driving 50–200 monthly organic visitors

**Competitive on head terms (~12–18 months sustained effort):**
- 30+ articles
- 100+ backlinks including some from high-authority publications
- Founder is a recognised voice in EU sovereignty discourse
- Verkio is in the consideration set for any "EU email/Workspace alternative" query

The first definition is where most pre-launch SaaS sites stop. The second is where we should aim by launch + 6 months. The third is a 12–18-month strategic outcome that compounds with brand maturity.

---

## Decisions still open

- **Should we ship the articles route (`/articles/[slug]`) before or after launch?** Pro of pre-launch: 6+ months of pre-launch SEO ageing on each article. Con: takes founder time away from product. Recommendation: ship the route scaffolding now, write articles in parallel with development, target 4–6 articles live by launch and another 4–6 in the following quarter.
- **Translate articles or keep them English-only?** EN-only captures the largest market. Translation cost is real — recommend EN first for all articles, then `de` and `fr` for the top 5 once they're proven.
- **Self-hosted analytics (Plausible or Umami in our EU infrastructure) — yes or no?** Currently no, in keeping with the "quiet" posture. Argument for: Search Console gives us indexed-pages data but not on-site behaviour. Without behaviour data, content optimisation is shooting in the dark. Recommendation: skip pre-launch; reconsider once content output is meaningful enough that A/B-testing matters. If yes, self-host Plausible at `analytics.verkio.eu`, on EU infrastructure, with no cookies and aggregated metrics only.
- **Should the brand-claims doc be published publicly?** It's currently in the control plane repo (private). Publishing it on `verkio.eu/manifesto` or similar would turn it from internal engineering reference into a linkable asset. Recommendation: yes, after a light edit for outward-facing tone.

When any of these get decided, update this doc with the rationale so the decision context isn't lost.
