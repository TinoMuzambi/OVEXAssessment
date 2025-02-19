"use server"

import { BASE_URL, MarketType, QuoteType } from "@/lib/utils";

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
    
}

export async function requestQuote({market, from_amount, side, to_amount}: Pick<QuoteType, 'market' | 'from_amount' | 'side' | 'to_amount'>) {
    
}