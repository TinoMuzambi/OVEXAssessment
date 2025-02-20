"use server";

import { BASE_URL } from "@/lib/utils";
import { APIResponse, CurrencyType, MarketType, QuoteType } from "@/lib/types";

/**
 * This function fetches a list of markets from the OVEX API.
 * @returns A list of markets
 */
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

/**
 * This function fetches a list of currencies from the OVEX API.
 * @returns A list of currencies.
 */
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

/**
 * This function fetches a quote from the OVEX API.
 * @param param0 The quote parameters.
 * @returns The quote response from the OVEX API.
 */
export async function requestQuote({
	market,
	from_amount,
	side,
	to_amount,
}: Pick<QuoteType, "market" | "from_amount" | "side" | "to_amount">): Promise<
	APIResponse<QuoteType | undefined>
> {
	try {
		// Sanitise parameters using URLSearchParams.
		const searchParams = new URLSearchParams();
		searchParams.set("market", market);
		searchParams.set("side", side);
		if (side === "buy") {
			searchParams.set("from_amount", from_amount);
		} else {
			searchParams.set("to_amount", to_amount);
		}

		const res = await fetch(
			`${BASE_URL}/rfq/get_quote?${searchParams.toString()}`
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
