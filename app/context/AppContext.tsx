"use client";

import {
	createContext,
	ReactNode,
	useReducer,
	useCallback,
	useMemo,
} from "react";

import AppReducer from "./AppReducer";
import {
	AppProviderProps,
	ContextProps,
	QuoteType,
	MarketType,
	CurrencyType,
} from "@/lib/types";

const initialState: ContextProps = {
	quote: undefined,
	currencies: [] as CurrencyType[],
	markets: [] as MarketType[],
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppProvider = ({ children }: AppProviderProps): ReactNode => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setQuote = useCallback(
		(quote: QuoteType | undefined) => {
			dispatch({
				type: "SET_QUOTE",
				quote,
				currencies: state.currencies,
				markets: state.markets,
			});
		},
		[state.currencies, state.markets]
	);

	const setCurrencies = useCallback(
		(currencies: CurrencyType[]) => {
			dispatch({
				type: "SET_CURRENCIES",
				currencies,
				quote: state.quote,
				markets: state.markets,
			});
		},
		[state.quote, state.markets]
	);

	const setMarkets = useCallback(
		(markets: MarketType[]) => {
			dispatch({
				type: "SET_MARKETS",
				markets,
				quote: state.quote,
				currencies: state.currencies,
			});
		},
		[state.quote, state.currencies]
	);

	const contextValue = useMemo(
		() => ({
			quote: state.quote,
			currencies: state.currencies,
			markets: state.markets,
			setQuote,
			setCurrencies,
			setMarkets,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state.quote, state.currencies, state.markets]
	);

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};
