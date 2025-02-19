# OVEX RFQ Component

PR Deployment: [https://ovex-assessment-git-rfq-tino-muzambis-projects.vercel.app/](https://ovex-assessment-git-rfq-tino-muzambis-projects.vercel.app/)
PR Link: [https://github.com/TinoMuzambi/OVEXAssessment/pull/1](https://github.com/TinoMuzambi/OVEXAssessment/pull/1)

OVEX Request-for-Quote (RFQ) component using OVEX's public endpoints.

## Requirements

- [x] Select a market (e.g., BTC/USDT, ETH/ZAR etc.).
- [x] Enter the amount they want to trade - the user must be able to buy or Sell.
- [x] Submit a request to get a quote and display it to the user.
- [x] Quotes are timed and will expire at the end of expiry period.

## Setup

### Prerequisites

- Node.js
- Bun/NPM/Yarn

### Installation Steps

1. `git clone https://github.com/TinoMuzambi/OVEXAssessment/tree/rfq .`
2. `bun install`
3. `bun --bun run dev`
