# LIFE//THREADS — Your Life, In Receipts

A frontend-only interactive data storytelling experience for the WebRush challenge. LIFE//THREADS turns organizer-provided receipt data into an explorable journey through music, purchases, places, patterns and cross-dataset connections.

## Live architecture

- React 18 + Vite
- JavaScript + CSS
- Static JSON assets under `public/data/`
- Browser-side normalization, search, filtering, analytics and thread detection
- **No backend, database, API, server, authentication or secret keys**
- Production output is the standard Vite `dist/` static build.

## Organizer datasets

- Spotify History — 149,860 records
- Daily Household Transactions — 2,461 records
- Augmented India Transactions — 10,267 records
- Total — 162,588 records

Spotify is dictionary-encoded to reduce repeated strings. Transaction records are normalized through explicit field whitelists before entering the UI model; precise coordinates, fraud flags and unknown raw fields are excluded from the application state.

## Experience

### Overview
- Total activity, music and transaction statistics
- Activity-by-hour visualization
- Aggregate transaction value
- Story Detective preview
- Derived insights

### Explore
- Full-dataset client-side search
- Source filter
- Type filter
- Date/amount sorting
- First 120 matching records rendered for smooth interaction
- Receipt detail modal

### Threads
- Same-date cross-dataset signals
- Repeated-location patterns
- Signal strength with transparent reason text
- Exact source receipts behind each thread

### Stories
- Sequential story chapters
- Story modal/replay-style receipt sequence
- Receipt drill-down from a story

### Places
- Location aggregation without displaying sensitive personal identifiers

### Insights
- Top artists
- Transaction categories
- Peak activity hour
- Skip patterns
- Transparent methodology notes

## Security

Production responses include defensive security headers through `vercel.json`: content-type sniffing protection, clickjacking protection, a restrictive Content Security Policy, referrer policy and disabled camera/microphone/geolocation permissions.

## Accessibility

The interface includes semantic landmarks, labelled navigation and controls, keyboard-visible focus states, skip-to-content navigation, live result counts, progress semantics, modal `role="dialog"`, `aria-modal`, Escape-to-close behavior, reduced-motion support and accessible theme controls.

## Reliability and quality checks

This repository includes dependency-free Node tests for core analytics, utility functions, data contracts and accessibility/security source contracts.

```bash
npm install
npm test
npm run validate
npm run build
```

Or run the complete local quality gate:

```bash
npm run check
```

`npm run validate` checks required files, required npm scripts and prohibited sensitive dataset keys. `npm test` uses Node's built-in test runner, so the checks do not require a separate test backend or service.

## Performance decisions

- Static JSON is fetched in parallel.
- Spotify uses compact dictionary encoding.
- A normalized lowercase `searchText` index is built once per record instead of joining many fields on every keystroke.
- Explore renders a maximum of 120 cards while the search/filter computation covers the full loaded dataset.
- Expensive aggregate calculations are memoized at the page/application level.
- No external analytics or runtime API requests are required for core functionality.

## Privacy and data handling

The UI is designed around analytical fields only. It does not intentionally display names, card numbers, account numbers, addresses, dates of birth, jobs, customer identifiers, precise coordinates or fraud flags. Relationship signals are described as correlations/data signals, not causal claims.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Submission

- GitHub: `https://github.com/PadalaRohiniRamya/life-threads-webrush`
- Live demo: `https://life-threads-webrush-theta.vercel.app/`
