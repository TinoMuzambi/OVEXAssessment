"use server"

import { BASE_URL, CurrencyType, MarketType, QuoteType } from "@/lib/utils";

export async function getMarkets() {
    const res = await fetch(`${BASE_URL}/markets`,
        {
            next: {
                revalidate: 86400 // Revalidate at most every day
            }
        }
    )
    const json: MarketType[] = await res.json()

    return json
}

export async function getCurrencies() {
    const res = await fetch(`${BASE_URL}/currencies`,
        {
            next: {
                revalidate: 86400 // Revalidate at most every day
            }
        }
    )
    const json: CurrencyType[] = await res.json()

    return json
}

export async function requestQuote({market, from_amount, side, to_amount}: Pick<QuoteType, 'market' | 'from_amount' | 'side' | 'to_amount'>) {
    return null
}