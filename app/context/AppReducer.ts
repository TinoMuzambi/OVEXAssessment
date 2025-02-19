import { State, Actions } from "@/lib/utils";

const Reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case "SET_CURRENCIES":
			return { ...state, currencies: action.currencies };
		case "SET_MARKETS":
			return { ...state, markets: action.markets };
		case "SET_QUOTE":
			return { ...state, quote: action.quote };
		default:
			return state;
	}
};

export default Reducer;
