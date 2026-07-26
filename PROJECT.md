---
status: active
doc_type: project-notes
owner: engineering
last_reviewed: 2026-07-27
app_id: n/a
project_state: active
source_of_truth:
  - Library/Zepp-Adaptive-UI/app.json
  - AGENTS.md
---

# @zh40s05/zepp-adaptive-ui Project Notes

## Scope
- Type: ZeppOS library published as an npm package.
- Package: `@zh40s05/zepp-adaptive-ui` version `0.3.1` (MIT, author ZHAO).
- Status: active.
- Target devices: ZeppOS smartwatches with varying screen sizes — per `zaui.js` comments, 480/454/416 round and 390 square (Amazfit).
- Entry files: `main` is `zaui.js` (single-file source; published `files` are `zaui.js` and `assets/`). No example app is present in this directory.

## Current Behavior
- Provides pure coordinate/length transform helpers so ZeppOS UI written for a 480×480 reference can scale across screen sizes; import as `import { pw, pl } from '../utils/zaui'`.
- Reads device metrics once at import via `getDeviceInfo()` (`@zos/device`) and `getAppWidgetSize()` (`@zos/ui`); requires the `data:os.device.info` permission declared in the consuming app's `app.json`.
- Ships four page-level strategies plus a secondary-screen widget group. P0 — width scaling: `px0(x)`. P1 (recommended) — height scaling + horizontal centering: `pw(w)`, `pl(l)`, and deprecated `ph(h)`. P2 — round-screen compatibility baseline: `pw2(w)`, `ph2(h)`, `pl2(l)`. P3 — point-to-point maximum-overlap (480 round / 390 square base): `pw3(w)`, `ph3(h)`, `pl3(l)`.
- PW group for app-widget (secondary screen) layout: `pww(x)`, `pww2(x)`, `phw(x)`, `plw(x)`, scaled against a 400-wide widget base using the reported margin.
- P1 math (documented in source): scale `pxh = height / 480`, center offset `widbase1 = width/2 - height/2`; `pw(w) = w*pxh + widbase1`, `pl(l) = l*pxh`. On a 480 round screen `pxh=1` and `widbase1=0` so values pass through unchanged.

## Build And Verification
- The package declares no dependencies and no `scripts`; `npm install` in `Library/Zepp-Adaptive-UI` is effectively a no-op.
- Publish from `Library/Zepp-Adaptive-UI` with `npm publish` (scoped public package — first publish needs `npm publish --access public`).
- `npm pack` from the same directory previews the tarball contents (`zaui.js` + `assets/`) without publishing.
- No example app / `app.json` exists here, so there is no `zeus build` step in this directory; verification happens inside a consuming ZeppOS app.

## Local Decisions
- None recorded yet.

## Dependencies And Reuse
- No npm dependencies are declared in `package.json`.
- Runtime imports rely on ZeppOS platform modules provided by the device: `@zos/device` (`getDeviceInfo`, `SCREEN_SHAPE_SQUARE`, `SCREEN_SHAPE_ROUND`) and `@zos/ui` (`getAppWidgetSize`).
- Consumers integrate either via `npm`/`pnpm add @zh40s05/zepp-adaptive-ui` or by manually copying `zaui.js` into an app's `utils/`. No consuming projects are tracked within this directory.

## Open Issues
- Documentation inconsistency: `README.md` says "three different approaches / 三种不同思路", while `package.json` and `zaui.js` describe four page strategies (P0–P3) plus the PW widget group.
- `ph()` is marked `@deprecated`; callers should use `pl()`.
- `package.json` defines only `main` (no `exports` map), no `scripts`, and no automated tests.
- The PW helpers depend on `getAppWidgetSize()` and are only meaningful in an app-widget (secondary-screen) context.
