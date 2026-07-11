# SOQ Toolkit — CA State IT Applications

*The Statement of Qualifications is the scored gate to the interview. This is
a reusable kit: how SOQs are graded, then STAR-structured response skeletons
mapped to your real experience, ready to tailor per posting. Grounded in the
hiring research in `job-search-strategy.md`.*

## How SOQs are scored (do these or get screened out)

1. **Answer each numbered prompt separately, in order**, using the posting's
   exact wording as a heading. Reviewers grade prompt-by-prompt against a
   rubric (Not Qualified / Qualified / Well Qualified).
2. **Mirror the duty statement + "Desirable Qualifications."** The prompts are
   drawn from them; echo their vocabulary.
3. **STAR + specifics + outcome.** Situation, Task, Action, Result — with named
   technologies, scope numbers, and a measurable result in every answer.
4. **Follow formatting exactly** (font, size, page limit). A violation is an
   auto-disqualify regardless of content.
5. **Tailor every time.** Never submit the same SOQ verbatim to two postings.

## Your evidence bank (pull from these — all real, all specific)

| # | Evidence | Best for prompts about… |
|---|---|---|
| A | **OWP Forum** — led an **8-person Agile team**, PHP Slim REST API with **4-tier RBAC**, delivered to a client serving **14,000+ water professionals**, CI/CD via GitHub Actions (Oct 2025–May 2026) | leadership, teamwork, full lifecycle, requirements, public-sector-adjacent |
| B | **Medical Web App** — led a **6-person team**, ASP.NET MVC + SQL Server, role-based auth; **caught SQL-injection vulnerabilities in a teammate's code and mentored them on the fix** | security, database, mentoring, code review |
| C | **CalSight** — 11M-row crash ETL into PostgreSQL, FastAPI + React, Dockerized, GitHub Actions CI/CD; now a **multi-domain CA open-data platform** (reservoirs, snowpack, drought from DWR/CDEC & US Drought Monitor) | data engineering, initiative, civic data, independent delivery, SQL |
| D | **Drover (contract, AI Solutions Engineer)** — React/TS analytics dashboard integrating GA4, Search Console, Google/Meta Ads; multi-tenant B2B SaaS on Next.js + Supabase with **four-role RBAC + Stripe**; Playwright RPA | production software, integrations, professional experience |
| E | **CalSight water module** — normalized messy real-world gov data, land-area-weighted statistics, **WCAG 2.2 AA-verified** accessible visualization, **1,500+ passing tests** | accessibility, testing/quality, correctness, attention to detail |
| F | **Self-taught path** — coding at 13, C# labor-automation app at a first job because manual calc was tedious; 8 certs (AZ-900, DP-900, 6× Google) | initiative, self-direction, continuous learning |

## Response skeletons (tailor the bracketed bits per posting)

### Prompt: software development / full-stack experience
> *Describe your experience designing, developing, and maintaining software
> applications.*

**Skeleton:** Open with breadth (languages/stacks: C# 6yr, Python 4yr, SQL
3yr, JS/TS 2yr), then go deep on **one** end-to-end example — **CalSight (C)**:
the problem (raw CCRS crash data is messy — inconsistent county codes, missing
coordinates, mixed date formats across years), your action (built an ETL
pipeline that cleaned and normalized without silently dropping records; FastAPI
serving a React dashboard; Dockerized with GitHub Actions CI/CD), and the
result (a live public tool at calsight.org, now spanning crash + water data).
Close by mapping the stack to **[the posting's named technologies]**.

### Prompt: working in a team / Agile
> *Describe your experience working as part of a team to deliver a project.*

**Skeleton:** Lead with **OWP Forum (A)** — an 8-person Agile team you *led* to
deliver a RBAC forum for a client serving 14,000+ professionals, handed off on
schedule (May 2026). Name your actions: sprint planning, dividing the
permission-middleware work, unblocking teammates, coordinating with a client
who changed the permission matrix mid-sprint. Result: delivered and accepted.
If the role is IC-level, reframe as "collaborated within" rather than "led."

### Prompt: database design & SQL
> *Describe your experience with relational databases.*

**Skeleton:** **CalSight (C)** for scale — a PostgreSQL schema over 11M crash
rows plus materialized views and expression indexes for performance;
**Medical App (B)** for design — SQL Server schema with ERDs and role-based
access. Name concrete work: normalization, indexing for the queries that
mattered, upserts that dedupe on conflict keys. Result: **[query performance /
correct aggregation]**. Tie to **[the posting's DB tech — SQL Server, Oracle,
Postgres]**.

### Prompt: security awareness
> *Describe your experience identifying or mitigating security risks.*

**Skeleton:** **Medical App (B)** is your strongest, most specific story: during
code review you **found SQL-injection vulnerabilities in a teammate's queries,
fixed them with parameterized queries, and mentored the teammate** so it
wouldn't recur. Add the RBAC systems you've built (OWP 4-tier, Drover 4-role)
as evidence you design least-privilege access by default. Result: shipped
without the vulnerability class; teammate leveled up.

### Prompt: communication / documentation
> *Describe your experience communicating technical information.*

**Skeleton:** **Medical App (B)** — you produced requirements specs, ERDs, and
architecture diagrams for a 6-person team. **OWP (A)** — you translated a
client's shifting permission requirements into a concrete middleware design.
Add: you write tests and docs as first-class artifacts (**CalSight (E)** —
1,500+ tests, module docs). Result: shared understanding, fewer defects.

### Prompt: problem-solving / debugging
> *Describe a difficult technical problem you solved.*

**Skeleton:** Pick one with a clean arc. Strong option — **CalSight water (E)**:
normalizing each data source's different formats/time zones into one correct
view, and catching (in review) a batch-upsert bug that would crash the nightly
job on duplicate readings; fixed by deduping on the conflict key. Or
**SmartTripPlanner**: an LLM agent loop that wouldn't converge until you added a
round cap with structured validation at each step. Result: **[shipped /
reliable]**.

### Prompt: initiative / self-direction
> *Describe a time you took initiative beyond what was required.*

**Skeleton:** **CalSight (C/F)** is the definitive answer — an independent,
production civic-data platform you built and keep expanding because the data
should be accessible. Reinforce with **F**: the C# labor-automation app you
wrote at a first job because manual calculation was tedious. Result: a live
tool used beyond yourself; a habit of building the thing that should exist.

### Prompt: why public service / why this department (DWR/SWRCB/etc.)
> *Why do you want to work for [department]?*

**Skeleton (DWR/SWRCB):** This is where your story is unfair-advantage strong.
Connect the thread: you led the team that delivered a forum for **Sac State's
Office of Water Programs — which trains the very water operators these agencies
rely on** — and then, on your own, built a California water-conditions explorer
on **DWR/CDEC and US Drought Monitor data** (reservoir storage, Sierra
snowpack, county drought). You already work with this agency's data ecosystem
and care about making public data usable. Name the specific division/mission
from the posting. For non-water departments, lead with civic-data motivation
(CalSight) + the accessibility/correctness discipline the state requires.

## Interview bridge (once the SOQ lands you the room)

Every SOQ story above doubles as a STAR interview answer — rehearse each aloud.
Add two the SOQ may not cover:
- **A failure/what-you-learned** — the Medical App "first time leading, had to
  learn to delegate instead of doing everything myself."
- **Accessibility/quality as a value** — WCAG 2.2 AA verification, testing
  discipline; the state cares, and few new grads volunteer it.

Use the free **CNRA Career Center mock interviews** (715 P St, Tue/Thu) before
any DWR/SWRCB panel.

---
*Reminder: verify the exact prompts and formatting rules on each posting's
bulletin — these skeletons are raw material, not a submission. Fill every
bracket with posting-specific detail before sending.*
