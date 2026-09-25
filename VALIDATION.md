# Local validation

Checked 24 September 2026. These checks are a bounded local test, not a security audit or accessibility certification.

## Browser tools

All three tools were exercised as local files in an isolated Chrome session on macOS, at desktop width and 390-pixel mobile width.

- Fictional examples load and remain labeled in saved JSON and exported briefs.
- Save, reset and reopen restore supplied input.
- Markdown brief downloads contain the review.
- HTML-shaped text remains literal; it does not become an executable image element.
- No external HTTP requests were observed during tested flows.
- No JavaScript page errors were observed.
- Radley and Roboto loaded from the package.
- No horizontal page overflow was found at the tested mobile width.

Episode 6 checks covered unresolved required controls, recorded attestations, known gaps and justified/non-justified exclusions.

Episode 7 checks covered blank measurements, incompatible protocol references, threshold failure, hard-control failure and versioned JSON roundtrip. Being inside supplied thresholds remains subject to human review.

Episode 8 checks covered the 16-day example, its 11-day network float, sensitivity to power versus network delay, unknown duration, missing and duplicate IDs, cycles, accepted-gate consistency, concurrent zero-float paths and exclusion of disconnected tasks. Completing energization moves the example's remaining forecast to six days. No prediction is produced for the tested invalid schedules.

All three companion skills passed structural validation. Execution inside every possible assistant host has not been tested. Browser print output and mobile operating-system file-download behavior are not certified.

## Files and packaging

The release build checks archive integrity, file hashes, relative documentation links, unwanted local paths, forbidden private-file names and unsupported spreadsheet inclusion. It verifies PNG/SVG dimensions and that the included carousel has seven readable pages. Visual checks are separate from factual currency; dated market snapshots with outstanding release holds were excluded.

Run `python3 scripts/build_downloads.py` to rebuild the ZIPs and their manifests using Python's standard library. Run `node tests/models.cjs` for the portable model checks. The browser QA script requires Playwright and an installed compatible browser; see its header. It uses no real customer data.
