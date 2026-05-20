# Article outlines

10 article outlines to expand into full pieces. Each one targets a specific search intent and aligns with the brand-claims posture.

The full first article (`us-cloud-act-eu-businesses`) is already shipped at `src/content/articles/`. When ready to publish an outline, copy the template from that file and replace the body with full prose.

**Convention each article should follow:**
- 1200+ words (Google considers thin content low-quality)
- Clear `<h2>` hierarchy, no skipping levels
- Internal link to at least 2 other Verkio pages (homepage residency section, FAQs, or another article)
- 2–4 external links to authoritative sources (regulatory body, standards doc, news story)
- A "further reading" section at the end
- No marketing puffery — the brand-claims posture means we get to be straightforwardly informative without selling

---

## 1. `gdpr-native-vs-gdpr-compliant`

**Target queries:** *"GDPR compliance email"*, *"GDPR-compliant SaaS"*, *"GDPR by design"*, *"is Google Workspace GDPR compliant"*

**Lede (~120 words):** Most SaaS vendors claim GDPR compliance. Very few have built their products around GDPR. The difference shows up when you actually need to exercise GDPR rights — when a deletion request has to cascade across caches and search indexes, when audit-log access becomes a feature request, when DPAs come with enterprise-tier upsells. This article unpacks "GDPR-native by design" as a specific engineering posture, and explains why "GDPR-compliant via DPA" — the standard incumbent answer — is technically true but structurally weaker than buyers usually assume.

**Sections:**
- `## What "GDPR-compliant via DPA" actually means` (the legal floor, not the product behaviour)
- `## What "GDPR-native by design" means at the product level`
  - `### Data minimisation in the schema`
  - `### Lawful basis tracking in code, not policy docs`
  - `### Real cascading deletion (not soft-delete with retention policy)`
  - `### Audit logging as a first-class feature`
  - `### Subject access request as an API endpoint, not a ticket`
- `## The procurement test: 7 questions to ask`
- `## Honest caveat: GDPR-native by design isn't a certification`
- `## Further reading` — EDPB guidance, GDPR text articles 5–11

**Sources to cite:**
- GDPR text (Articles 5, 15, 17, 20, 30)
- EDPB guidance on data minimisation
- The brand-claims doc when published

**Internal links:** residency section homepage, comparison table

---

## 2. `eu-region-isnt-enough`

**Target queries:** *"AWS EU region GDPR"*, *"eu-central-1 CLOUD Act"*, *"Microsoft Sweden Central data sovereignty"*, *"is data in EU region safe"*

**Lede:** This article continues the CLOUD Act argument with a sharper focus: the specific gap between "data physically located in the EU" and "data legally protected by EU law." Many procurement teams accept "we use eu-central-1" as a sufficient answer. It isn't, and this article walks through the specific reason why with three concrete examples.

**Sections:**
- `## The shorthand that became a habit`
- `## Three examples that look like sovereignty but aren't`
  - `### AWS eu-central-1 (Frankfurt)`
  - `### Google Cloud europe-west1 (Belgium)`
  - `### Azure Sweden Central`
- `## What changes when the operator is EU-domiciled`
- `## What actually transits through US-controlled infrastructure even when servers are in the EU`
  - DNS resolution, certificate issuance, CDN edge, telemetry pipelines
- `## What an honest "EU-sovereign" infrastructure stack looks like`
- `## Further reading`

**Internal links:** CLOUD Act article, residency homepage section

---

## 3. `google-workspace-vs-microsoft-365-vs-eu-alternatives`

**Target queries:** *"alternative to Google Workspace"*, *"Microsoft 365 alternative Europe"*, *"work suite Europe"*, *"GDPR alternative to Office 365"*

**Lede:** A long-form, side-by-side analysis of the three main options EU businesses face for their core work suite: stay with Google Workspace, stay with Microsoft 365, or move to an EU-resident alternative. This isn't a feature-comparison checklist — those exist already. It's the structural comparison: corporate domicile, subprocessor lists, what each company actually means when they say "EU data residency."

**Sections:**
- `## The three real options for EU businesses`
- `## Where each option sits on residency`
  - `### Google Workspace`
  - `### Microsoft 365`
  - `### EU-sovereign work suites (Verkio, ProtonMail Business, Tutanota Business, Open-Xchange / OX App Suite, Mailbox.org)`
- `## Where each option sits on product depth`
- `## Where each option sits on pricing posture` (EU-resident often costs ~20% more than incumbents at face value; what you're paying for)
- `## The procurement criteria that matter`
- `## How to choose between EU alternatives if you're switching`
- `## Honest caveat: incumbents are good products`

**Sources to cite:**
- Each vendor's subprocessor list (linked)
- Public DPA documents
- Notable migration case studies

**Internal links:** comparison table, residency, FAQ migration question

---

## 4. `migrating-from-google-workspace`

**Target queries:** *"migrate from Google Workspace"*, *"export from Gmail"*, *"Google Workspace to EU alternative"*

**Lede:** Practical, technical: what migration from Google Workspace actually involves. What exports cleanly (Gmail, Calendar, Contacts), what doesn't (Drive sharing graphs, Sites, custom apps), and what to plan for during the cut-over.

**Sections:**
- `## What exports cleanly`
  - Gmail via IMAP / Google Takeout MBOX
  - Calendar via ICS export
  - Contacts via vCard
- `## What needs manual planning`
  - Drive: file permissions vs. folder structure
  - Shared documents and external sharing graphs
  - Aliases, distribution groups
- `## DNS cut-over: how to do it without losing mail`
- `## A realistic migration timeline for a 20-person org`
- `## Common failure modes`
- `## Further reading`

**Internal links:** roadmap (migration tool item), domain auto-setup roadmap item

---

## 5. `migrating-from-microsoft-365`

**Target queries:** *"migrate from Microsoft 365"*, *"export Outlook"*, *"PST import"*, *"Microsoft 365 to EU alternative"*

**Lede:** Same structure as the Google Workspace article but for the Microsoft path. Slightly harder because PST exports and SharePoint permissions don't translate cleanly.

**Sections:**
- `## What exports cleanly`
  - Outlook via IMAP / EWS / PST
  - Calendar via ICS
  - Contacts via vCard / PST
- `## What needs manual planning`
  - SharePoint and OneDrive: permission graphs
  - Teams archives
  - Power Automate flows (typically don't migrate)
- `## DNS cut-over`
- `## A realistic migration timeline for a 20-person org`
- `## Common failure modes`
- `## Further reading`

**Internal links:** roadmap migration item, comparison table

---

## 6. `imap-vs-proprietary-mail`

**Target queries:** *"open email standards"*, *"no vendor lock-in email"*, *"IMAP business email"*, *"what is CalDAV"*

**Lede:** Why standards-first matters: a short technical defence of IMAP, CalDAV, and CardDAV as architectural choices, and what you lose when a vendor "supports" them as a checkbox rather than as the primary interface.

**Sections:**
- `## Why standards-first is a posture, not a feature`
- `## What real IMAP support looks like`
- `## How "IMAP-supported" often actually works in incumbent suites`
  - App passwords for 2FA accounts
  - Feature gaps (labels, snooze, threading) only in the proprietary client
  - Server-side rules that don't apply via IMAP
- `## What CalDAV and CardDAV give you`
- `## The lock-in test: can you leave?`
- `## Further reading`

**Internal links:** standards-first principle, FAQs (Outlook, Apple Mail, Thunderbird question)

---

## 7. `where-is-microsoft-365-data-actually-stored`

**Target queries:** *"Microsoft 365 EU data centre"*, *"Office 365 data residency"*, *"M365 EU Data Boundary"*, *"is Microsoft 365 data in EU"*

**Lede:** Microsoft's EU Data Boundary is a sophisticated marketing position. This article walks through what it actually commits to, where it stops short, and what a sceptical procurement reviewer should ask. Not a hit piece — Microsoft has done more than most US hyperscalers — but an honest read of the residency claims.

**Sections:**
- `## The EU Data Boundary in plain terms`
- `## What it covers`
- `## What it explicitly doesn't cover`
  - Telemetry pipelines
  - Anti-spam and threat-intelligence systems
  - Some support workflows
- `## How CLOUD Act still applies even within the Boundary`
- `## What this means for buyers`
- `## Further reading` — Microsoft's own Boundary docs, EDPB opinion

**Internal links:** CLOUD Act article, residency section, comparison table

---

## 8. `eidas-2-and-digital-sovereignty`

**Target queries:** *"eIDAS 2 EU"*, *"European digital sovereignty"*, *"EU digital identity"*, *"eIDAS document signing"*

**Lede:** eIDAS 2.0 is the EU's framework for digital identity and trust services. It matters for procurement reviewers because it's a structural answer to "how do we sign documents legally across the bloc without depending on US PKI?" — and because document signing is increasingly bundled with work suites. Forward-looking piece, ties to Verkio's Q2 2027 eIDAS signing roadmap.

**Sections:**
- `## What eIDAS 2.0 changes`
- `## The European Digital Identity Wallet`
- `## What "qualified electronic signature" actually means`
- `## What sovereign signing infrastructure looks like`
- `## What to look for in a SaaS that claims eIDAS support`
- `## How this fits into a broader sovereignty stance`
- `## Further reading`

**Internal links:** roadmap eIDAS signing item, residency section

---

## 9. `procurement-checklist-eu-saas`

**Target queries:** *"EU SaaS procurement checklist"*, *"vendor due diligence GDPR"*, *"SaaS DPA review"*, *"vendor security questionnaire EU"*

**Lede:** A reusable checklist procurement teams can use when evaluating any EU-resident SaaS vendor. Designed to be bookmarked and shared internally. The structure mirrors what a thoughtful procurement reviewer would compile from scratch — we're just doing the compilation work once.

**Sections:**
- `## The 25 questions, organised by theme`
  - `### Corporate structure (5 questions)`
  - `### Infrastructure and hosting (5 questions)`
  - `### Subprocessors and data path (5 questions)`
  - `### Encryption and key management (3 questions)`
  - `### GDPR mechanics (4 questions)`
  - `### Exit and portability (3 questions)`
- `## How to score the answers`
- `## What "good" looks like for each section`
- `## A two-page summary you can paste into a procurement doc`
- `## Further reading`

**This article should be the most linkable asset on the site** — concrete, actionable, no marketing. The kind of piece other writers cite.

**Internal links:** every other article

---

## 10. `verkio-vs-protonmail-vs-tutanota`

**Target queries:** *"Verkio vs ProtonMail"*, *"Tutanota alternative"*, *"ProtonMail Business alternative"*, *"EU sovereign email comparison"*

**Lede:** Honest comparison between Verkio and the two best-known EU privacy-focused mail providers. The trick is staying honest about the differences in goal — ProtonMail and Tutanota are E2EE-first; Verkio is suite-first with standards support. Different use cases.

**Sections:**
- `## Different products, different priorities`
- `## Where ProtonMail wins` (E2EE mail-only, anonymous signup)
- `## Where Tutanota wins` (full E2EE including calendar, post-quantum, free tier)
- `## Where Verkio wins` (full suite, standards-first, no E2EE compromises like no IMAP)
- `## When to choose which`
- `## Honest caveat: Verkio doesn't claim E2EE`
- `## Further reading`

**Defer this article** until Verkio has a track record. Comparison pieces from a pre-launch product look promotional. Aim to publish 3–6 months post-launch with real product comparison.

**Internal links:** standards-first principle, FAQ open-source question

---

## Publishing order recommendation

If shipping ~6 articles by Verkio launch (July 2026):

1. **CLOUD Act** ✅ already shipped
2. **GDPR-native vs compliant** — strong, evergreen, complements CLOUD Act
3. **EU region isn't enough** — natural follow-up, same audience
4. **Procurement checklist** — most linkable, highest backlink potential
5. **Google Workspace vs M365 vs EU alternatives** — highest commercial intent
6. **IMAP vs proprietary mail** — reinforces standards-first

Post-launch (next 6 months):

7. **Migrating from Google Workspace** — drives migration intent into Verkio
8. **Migrating from Microsoft 365** — same
9. **Where is Microsoft 365 data actually stored** — niche but high-quality search intent
10. **eIDAS 2 and digital sovereignty** — ties to roadmap, gets relevant pre-Q2 2027

Defer:

11. **Verkio vs ProtonMail vs Tutanota** — wait until Verkio has a track record

---

## Effort estimate

- **Article 1 (CLOUD Act):** done. ~9 hours of writing time as a reference.
- **Articles 2, 3, 6, 7:** ~6–8 hours each.
- **Articles 4, 5 (migration guides):** ~10 hours each (technical detail).
- **Article 9 (procurement checklist):** ~12 hours (highest stakes, needs to be authoritative).
- **Article 8 (eIDAS):** ~8 hours.
- **Article 10 (vs ProtonMail/Tutanota):** ~6 hours.

Total ~70–80 hours for all 10 outlines turned into full articles. Realistic pace: 1–2 articles per week with other work happening = 6–10 weeks to ship the first six, plus the remainder spread across the following quarter.

Each article should be drafted, set aside for a day, then edited. The "set aside" pass catches the puffery that doesn't survive a cold re-read.
