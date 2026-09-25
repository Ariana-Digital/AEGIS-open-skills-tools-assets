# What moves the service date?

Episode 8 · Ariana.Digital · Version 1.0 · 24 September 2026

Extract the ZIP and open `index.html`. No installation, account or internet connection is needed. The package includes its fonts and code. Select **Try the example**, then **Run review**.

The invented network has an accepted shell, 10 days of remaining energization work, 4 days of commissioning after energization, 3 days of network work in parallel, and 2 days of operations acceptance after both branches. Its modeled finish is 16 calendar days after the status date. The network branch has 11 days of float. Add 3 days to power: the finish becomes 19 days. Add 3 days only to network: it remains 16. These are arithmetic examples, not industry lead times.

## Enter a real review

1. Define the specific service milestone, status date, owner and schedule assumptions.
2. Give every gate a unique ID. Enter immediate predecessor IDs separated by commas. Links mean finish-to-start with no lag.
3. Enter estimated **remaining** calendar days, not original duration. Blank is unknown, never zero. Earliest-start offset is a number of days after the status date; enter 0 if unrestricted.
4. Name the acceptance owner and evidence reference. Accepted gates require zero remaining work, zero offset and an acceptance date no later than the status date. All their predecessors must also be accepted.
5. Set the final service gate ID. The tool calculates that gate and its ancestors; disconnected gates are flagged and excluded.
6. Run the review. Investigate zero-float work. Change an estimate to test sensitivity, then restore or save it as a separately named scenario.
7. Download the brief and save JSON to reopen. Recalculate after each accepted gate or estimate change.

## Limits and data

Maximum 20 gates. Durations and offsets are whole calendar days, 0–36,500. No resource leveling, holidays, lags, probabilistic forecast, procurement-cost optimization or automated source verification. A blocked gate needs an estimate that includes resolving its block; the output remains conditional. Missing inputs, cycles, duplicate IDs and inconsistent acceptance stop the forecast. A computed date never grants energization, occupancy, compliance or production permission.

No uploads, analytics, cookies, external calls or browser storage. Nothing saves automatically. Downloaded files may contain confidential data; use redacted references and approved channels. The optional assistant skill is separate and its host may process what you provide.

## Sources and companion skill

Context checked 24 September 2026: [FERC large-load action, 18 June 2026](https://www.ferc.gov/news-events/news/ferc-launches-aggressive-targeted-action-speed-large-load-integration) and [ERCOT large-load integration](https://www.ercot.com/services/rq/large-load-integration). Neither supplies project durations or approval in this tool. The owner must identify the applicable jurisdiction and current project-specific requirements.

`ai-delivery-gate-review/SKILL.md` guides evidence and dependency review. Install only into a host that supports this skill format. Structural validation does not establish compatibility with every host.

Supplied for distribution with the series; authored code and the companion skill are distributed under Apache-2.0; see `LICENSE`. Keep the bundled font licenses in `assets/`. This is a downloadable local workflow, not a hosted application.
