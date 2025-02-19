"use server";

import { BASE_URL, CurrencyType, MarketType, QuoteType } from "@/lib/utils";

export async function getMarkets() {
	const res = await fetch(`${BASE_URL}/markets`, {
		cache: "force-cache",
		next: {
			revalidate: 86400, // Revalidate at most every day
		},
	});
	const json: MarketType[] = await res.json();

	return json;
}

export async function getCurrencies() {
	const res = await fetch(`${BASE_URL}/currencies`, {
		cache: "force-cache",
		next: {
			revalidate: 86400, // Revalidate at most every day
		},
	});
	const json: CurrencyType[] = await res.json();

	return json;
}

export async function requestQuote({
	market,
	from_amount,
	side,
	to_amount,
}: Pick<
	QuoteType,
	"market" | "from_amount" | "side" | "to_amount"
>): Promise<QuoteType> {
	const res = await fetch(
		`${BASE_URL}/rfq/get_quote?market=${market}&side=${side}&${
			side === "buy" ? `from_amount=${from_amount}` : `to_amount=${to_amount}`
		}`
	);
	const json = await res.json();
	console.log({ json });

	return json;
}
