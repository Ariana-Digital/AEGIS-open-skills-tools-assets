# What earns premium compute?

Episode 7 · Ariana.Digital · Version 1.0 · 24 September 2026

Extract the complete ZIP. Open `index.html` in a current desktop browser. All fonts and code are included. No installation, account or internet connection is needed. Start with **Try the example**, then **Run review**. The numbers in that example are invented teaching inputs, not benchmark results.

For your own review:

1. Choose one business task and define an accepted output. Record who can decide.
2. Set acceptance, end-to-end p95 latency and full cost limits before comparing candidates. Document critical error classes and control requirements in the scope.
3. Compare configurations tested under the same protocol, load and observation period. Include model version, host, retrieval and other relevant system components in the configuration description.
4. Enter measured results and evidence references. Leave unknown measurements blank. A typed assertion is not verified evidence.
5. Run the review. A result inside the supplied thresholds still requires human review. The tool neither ranks vendors nor selects a winner.
6. Assign the next test, owner and due date. Download the Markdown brief and save the JSON review to reopen later.

The demo gives candidate A 96% acceptance, 1,200 ms and $0.12 per accepted unit; candidate B 98%, 1,500 ms and $0.35. Against the fictional 95% / 2,000 ms / $0.20 limits, A is within thresholds and B exceeds the cost limit. Neither result is deployment approval. Aggregate percentages can conceal an unacceptable error class.

## Data and limitations

The browser package makes no external calls and uses no cookies, analytics or local storage. Inputs remain in the page until you download them or close it. There is no automatic save. Downloaded files can contain confidential information; use redacted references and approved sharing channels. The optional assistant skill is separate: its host may process information you provide.

Supports 1–6 candidates. All costs are user-entered USD per accepted unit; it does not calculate invoices or normalize currencies. A protocol-name match is only a consistency check, not proof that tests were comparable. No live provider price, capability or legal determination is embedded.

## Companion skill

`ai-workload-placement/SKILL.md` guides an assistant through the same decision. Copy that folder into a skill directory supported by your assistant; installation depends on the host. It has been structurally validated, not certified across all assistant products.

## Evidence context and sharing

[MLCommons, MLPerf Inference v6.1](https://mlcommons.org/2026/09/mlperf-inference-v6-1-results/) was checked on 24 September 2026. Its broader pipeline tests inform the episode; their results are not inputs to this tool. Recheck vendor evidence before using a real configuration.

This package is supplied for distribution with the series. Authored code and the companion skill are distributed under Apache-2.0; see `LICENSE`. Bundled Radley and Roboto font licenses are in `assets/`. Keep them with copies. No public hosting or newsletter capture has been configured.
