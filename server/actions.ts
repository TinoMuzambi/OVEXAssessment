"use server";

import { BASE_URL } from "@/lib/utils";
import { CurrencyType, MarketType, QuoteType } from "@/lib/types";

export async function getMarkets() {
	try {
		const res = await fetch(`${BASE_URL}/markets`, {
			cache: "force-cache",
			next: {
				revalidate: 86400, // Revalidate at most every day
			},
		});
		const json: MarketType[] = await res.json();
		return json;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getCurrencies() {
	try {
		const res = await fetch(`${BASE_URL}/currencies`, {
			cache: "force-cache",
			next: {
				revalidate: 86400, // Revalidate at most every day
			},
		});
		const json: CurrencyType[] = await res.json();

		return json;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function requestQuote({
	market,
	from_amount,
	side,
	to_amount,
}: Pick<QuoteType, "market" | "from_amount" | "side" | "to_amount">): Promise<
	QuoteType | undefined
> {
	try {
		const res = await fetch(
			`${BASE_URL}/rfq/get_quote?market=${market}&side=${side}&${
				side === "buy" ? `from_amount=${from_amount}` : `to_amount=${to_amount}`
			}`
		);
		const json = await res.json();

		return json;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}
