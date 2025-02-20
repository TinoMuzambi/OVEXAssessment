"use server";

import { BASE_URL } from "@/lib/utils";
import { APIResponse, CurrencyType, MarketType, QuoteType } from "@/lib/types";

export async function getMarkets(): Promise<APIResponse<MarketType[]>> {
	try {
		const res = await fetch(`${BASE_URL}/markets`, {
			cache: "force-cache",
			next: {
				revalidate: 86400, // Revalidate at most every day
			},
		});
		const json: MarketType[] = await res.json();

		return {
			data: json,
			status: res.status,
		};
	} catch (error) {
		console.error("Markets fetch error:", error);

		return {
			data: undefined,
			error: `Failed to fetch markets: ${
				error instanceof Error ? error.message : error
			}`,
			status: 500,
		};
	}
}

export async function getCurrencies(): Promise<APIResponse<CurrencyType[]>> {
	try {
		const res = await fetch(`${BASE_URL}/currencies`, {
			cache: "force-cache",
			next: {
				revalidate: 86400, // Revalidate at most every day
			},
		});
		const json: CurrencyType[] = await res.json();

		return {
			data: json,
			status: res.status,
		};
	} catch (error) {
		console.error("Currencies fetch error:", error);

		return {
			data: undefined,
			error: `Failed to fetch currencies: ${
				error instanceof Error ? error.message : error
			}`,
			status: 500,
		};
	}
}

export async function requestQuote({
	market,
	from_amount,
	side,
	to_amount,
}: Pick<QuoteType, "market" | "from_amount" | "side" | "to_amount">): Promise<
	APIResponse<QuoteType | undefined>
> {
	try {
		const res = await fetch(
			`${BASE_URL}/rfq/get_quote?market=${market}&side=${side}&${
				side === "buy" ? `from_amount=${from_amount}` : `to_amount=${to_amount}`
			}`
		);
		const json = await res.json();

		return {
			data: json,
			status: res.status,
		};
	} catch (error) {
		console.error("Quote fetch error:", error);

		return {
			data: undefined,
			error: `Failed to fetch quote: ${
				error instanceof Error ? error.message : error
			}`,
			status: 500,
		};
	}
}
