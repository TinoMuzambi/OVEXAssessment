import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type QuoteType = {
	market: string;
	side: "buy" | "sell";
	from_currency: string;
	from_amount: string;
	to_currency: string;
	to_amount: string;
	rate: string;
	rate_is_from_currency: boolean;
	requested_at: number;
	expires_at: number;
	is_prefunded: boolean;
	sn: null | string;
	message: string;
};

export type MarketType = {
	id: string;
	name: string;
	base_currency: string;
	quote_currency: string;
	base_precision: number;
	quote_precision: number;
	rfq_enabled: boolean;
	indicative_pricing: boolean;
	base_currency_long: string;
	quote_currency_long: string;
};

export type CurrencyType = {
	id: string;
	name: string;
	symbol: string;
	explorer_transaction: string;
	explorer_address: string;
	type: string;
	erc20: boolean;
	deposit_fee: string;
	min_deposit_amount: string;
	min_confirmations: number;
	withdraw_fee: string;
	min_withdraw_amount: string;
	withdraw_limit_24h: string;
	withdraw_limit_72h: string;
	deposit_enabled: boolean;
	withdrawal_enabled: boolean;
	instant_exchange: boolean;
	base_factor: number;
	precision: number;
	display_precision: number;
	icon_url: string;
	updated_at: string;
};

export const BASE_URL = "https://www.ovex.io/api/v2";

export interface RFQProps {
	markets: MarketType[];
	currencies: CurrencyType[];
}
