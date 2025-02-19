"use server"

import { QuoteType } from "@/lib/utils";

export async function getMarkets() {

}

export async function getCurrencies() {
    
}

export async function requestQuote({market, from_amount, side, to_amount}: Pick<QuoteType, 'market' | 'from_amount' | 'side' | 'to_amount'>) {
    
}