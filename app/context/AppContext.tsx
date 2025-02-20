"use client";

import { createContext, ReactNode, useReducer } from "react";

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

	const setQuote = (quote: QuoteType | undefined) => {
		dispatch({
			type: "SET_QUOTE",
			quote,
			currencies: state.currencies,
			markets: state.markets,
		});
	};

	const setCurrencies = (currencies: CurrencyType[]) => {
		dispatch({
			type: "SET_CURRENCIES",
			currencies,
			quote: state.quote,
			markets: state.markets,
		});
	};

	const setMarkets = (markets: MarketType[]) => {
		dispatch({
			type: "SET_MARKETS",
			markets,
			quote: state.quote,
			currencies: state.currencies,
		});
	};

	return (
		<AppContext.Provider
			value={{
				quote: state.quote,
				currencies: state.currencies,
				markets: state.markets,
				setQuote,
				setCurrencies,
				setMarkets,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
