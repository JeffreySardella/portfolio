# California State Job Strategy — Projects, Positioning, Talking Points

*Working doc from the project-ideas session, July 2026. Everything referenced
here lives on the CalSight branch `claude/water-data-explorer`.*

## The thesis

One project is a project; two projects on the same public-data ecosystem is a
**specialty**. CalSight already proved the pattern (state open data → ETL →
PostgreSQL → FastAPI → React). The water module makes the name mean
"California insight" instead of "crash site," and points the portfolio at the
agencies that actually hire ITS classifications in Sacramento — DWR, the State
Water Board, Caltrans, CDPH.

The deliberate design constraint: **the water module contains zero AI.** Pure
ETL, SQL, time series, accessibility-checked charts. Some state panels are
AI-averse; now the portfolio has a flagship for both audiences — "Ask AI" for
teams that want it, the water module for teams that don't.

## What was built (evidence, not adjectives)

| Piece | Detail |
|---|---|
| Reservoir pipeline | CDEC client + loader; 15 major reservoirs; trailing-window self-healing; `--backfill` from 2000 |
| Drought pipeline | US Drought Monitor county stats; FIPS→county mapping; weekly revisions absorbed |
| API | Latest conditions with % of capacity and same-day-of-year historical average; land-area-weighted statewide drought (one SQL definition shared by both endpoints) |
| Frontend | /water page: reservoir gauge grid with average ticks + lazy sparklines; drought severity bar, two-year trend, inline-SVG county choropleth (no map library, no tiles); drought row inside the map's county insight card |
| Quality | 861 backend + 730 frontend tests green; 8-angle adversarial code review, 10 confirmed findings all fixed; charts CVD-validated with separate dark-mode ramp |

Data sources named on the page: DWR/CDEC and the US Drought Monitor
(NDMC/USDA/NOAA) — reviewers from those agencies see their own data handled
correctly, with attribution.

## Interview stories (STAR-ready)

**The bug the review caught before production.** Bulk `INSERT … ON CONFLICT`
crashes in Postgres if one batch touches the same row twice. CDEC can return
an original *plus* revised reading for a station-day — which would have failed
the nightly job. An adversarial review pass caught it; the fix reused a
`dedupe_rows` helper that already existed in the codebase. Story arc:
*process catches what unit tests didn't; reuse over reinvention.*

**Honest metadata engineering.** Reservoir capacities live in a static map
marked "must be verified against CDEC" — and the snowpack phase was
deliberately **deferred** rather than built on invented station codes when the
sandbox couldn't reach CDEC to verify them. Story arc: *knowing when not to
ship is an engineering skill.*

**Statistics with judgment.** Statewide drought isn't the average of 58
county percentages — LA's 4,058 sq mi should not count the same as Alameda's
738. The API computes land-area-weighted figures, defined once in SQL so the
headline number and the trend chart can never disagree. Story arc: *correct
aggregation is a design decision, not a formula.*

**Accessibility as a requirement, not a garnish.** The drought severity ramp
was validated for colorblind-safe adjacent-step separation, gets distinct
dark-mode steps, and never encodes identity by color alone (legend + text
values everywhere). WCAG mattered on the OWP Forum project too — this is a
throughline, and the state cares about it (all state sites must meet WCAG).

## Where to aim

- **Classifications:** Information Technology Specialist I (entry), ITS II
  with experience credit; also IT Associate. Software-engineering domain.
- **Agencies where this portfolio lands hardest:** DWR (the water data is
  *theirs*), State Water Resources Control Board (OWP Forum connection —
  Sac State's Office of Water Programs trains their operators), Caltrans/OTS
  (the crash module), CDT, CDPH.
- **The OWP thread is gold:** led a team that delivered a forum for the
  water-operator training org, then built a water-conditions explorer on DWR
  data. For DWR/SWRCB panels, that's a candidate who already lives in their
  world.

## Launch checklist (needs your machine — sandbox couldn't reach state servers)

1. `python -m etl.cdec_api --smoke` and `python -m etl.usdm_api --smoke` —
   validate live response shapes.
2. Spot-check `MAJOR_RESERVOIRS` capacities/counties against CDEC station pages.
3. `python -m etl.load_reservoirs --backfill` then
   `python -m etl.load_drought --backfill`.
4. Merge the branch, confirm calsight.org/water is live with real data.
5. Update the portfolio site's CalSight card (copy below) and add a resume
   bullet.

**Portfolio card copy, post-merge:**

> California data explorer: 11M crash records plus live water conditions —
> reservoir storage vs. historical averages and county drought severity from
> DWR and US Drought Monitor data. ETL pipelines into PostgreSQL, FastAPI,
> React dashboards with CVD-safe visualization. The water module is
> deliberately AI-free.

**Resume bullet:**

> Expanded CalSight into a multi-domain California open-data platform: built
> zero-AI water-conditions module (CDEC reservoir + US Drought Monitor
> pipelines, land-area-weighted statistics, accessible SVG choropleth) with
> 1,500+ passing tests across backend and frontend.

## Project #2 when there's bandwidth: CalCareers Radar

Still the strongest next build (originally scoped in this session): ingest
CalCareers postings for IT classifications, normalize into Postgres, dashboard
with real filters and final-filing-date alerts. Same architecture as CalSight,
dogfooded daily during the search itself. Optional AI layer (duty-statement
summaries, SOQ outlines) kept strictly separable, for the same reason the
water module is AI-free.

## Deferred with reasons

- **Snowpack (P3):** needs live CDEC station discovery; client is already
  sensor-generic, so it's a short session once online. Spec in CalSight's
  `docs/water-explorer-exploration.md`.
- **SOQ assistant:** folded into CalCareers Radar as an optional feature —
  standalone AI tooling is the weakest lead for AI-averse panels.
