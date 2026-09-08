# OVEX RFQ

A production-style request-for-quote experience for cryptocurrency markets,
built with Next.js, React, TypeScript, Tailwind CSS, and Radix UI. The interface
uses OVEX's public market endpoints while keeping quote execution deterministic
through a small server-action boundary and checked-in mock fixtures.

[View the live application](https://ovex-assessment.vercel.app/)

## Requirements

- [x] Select a market (e.g., BTC/USDT, ETH/ZAR etc.).
- [x] Enter the amount they want to trade - the user must be able to buy or Sell.
- [x] Submit a request to get a quote and display it to the user.
- [x] Quotes are timed and will expire at the end of expiry period.

## Engineering highlights

- Typed market, currency, and RFQ domain models.
- Server actions isolate external requests from the client interface.
- Expiring quotes provide clear status and interaction feedback.
- Responsive, accessible primitives from Radix UI.
- Reproducible Bun lockfile with lint and production-build CI checks.

## Local development

### Prerequisites

- Node.js 20.9 or newer
- Bun 1.4.2

### Installation Steps

```bash
git clone https://github.com/TinoMuzambi/OVEXAssessment.git
cd OVEXAssessment
bun install --frozen-lockfile
bun run dev
```

Open <http://localhost:3000>. Before submitting a change, run the same checks
used in CI:

```bash
bun run check
```

## License

This technical assessment remains available under the terms in [LICENSE](LICENSE).
