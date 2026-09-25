# Episode 6: Who holds the controls?

Unzip the package and open `index.html` in a current desktop browser. Keep the files and `assets` folder together. No installation, sign-in or internet connection is needed for the browser workflow. The bundled fonts are Radley and Roboto, distributed with their licenses.

Start with the fictional energy-company example or a blank review. Name the service, work through the control questions, then download a review brief. “Save review” creates a JSON file you can reopen later. Nothing is saved automatically or sent to a server. Browser extensions, device controls and downloaded files remain outside this tool's privacy boundary. Do not enter secrets or sensitive source records.

The application uses explicit field checks, not an AI model. It reports unresolved required controls and follow-up requests. No overall readiness score, automatic approval or vendor ranking is produced. “Evidence reviewed” records your own attestation; the tool does not inspect the evidence.

You can also print the review step or save it as PDF through the browser. Exported files may contain confidential information. Share only through approved channels.

## Reusable AI skill

The `ai-control-review` folder contains a self-contained `SKILL.md`. It is a distribution copy, not installed into the author's global skills. A recipient with a skill-capable assistant can add that folder to their assistant's supported skill location and invoke `ai-control-review`. Installation mechanics vary by host; consult that host's instructions. Other assistants can read the file as a workflow prompt.

Example request: “Use ai-control-review to review our proposed maintenance-manual assistant. Ask for missing facts, distinguish claims from reviewed evidence, and prepare an action brief. Do not make a deployment recommendation without the required evidence.”

Unlike the local browser workflow, an AI assistant may transmit conversation content to its service. Use approved environments and redacted inputs.

## Basis and limits

The review follows Episode 6's separate control axes and eight areas of inquiry. It does not implement a regulatory control catalog or determine legal requirements. Applicable controls must be set for the actual workload by its owners.

- [Open Source AI Definition 1.0](https://opensource.org/ai/open-source-ai-definition): rights and supporting materials extend beyond downloadable weights. Checked 24 September 2026.
- [Amazon Bedrock lifecycle](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html): retirement and migration depend on the service and model. Checked 24 September 2026. No specific deadlines are hard-coded into this tool.
- [Microsoft Foundry lifecycle](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements): starting point for the recipient's current-policy review; not reverified for this tool release.

The fictional example has deliberately incomplete evidence. Its role names, reference and dates are teaching inputs, not facts about an energy company. Review your exported brief before circulation.

Version 1.0 · 24 September 2026 · Ariana.Digital.

Authored tool and companion skill: Apache-2.0, see `LICENSE`. Fonts retain their bundled SIL Open Font Licenses. No analytics or account setup is included.
