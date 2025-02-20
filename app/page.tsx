import RFQ from "@/components/RFQ";
import { getCurrencies, getMarkets } from "@/server/actions";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Home = async () => {
	const [marketsResponse, currenciesResponse] = await Promise.all([
		getMarkets(),
		getCurrencies(),
	]);

	if (!marketsResponse.data || !currenciesResponse.data) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center p-6 bg-red-50 rounded-lg border border-red-200 max-w-md">
					<h2 className="text-xl font-semibold text-red-800 mb-2">
						Unable to load trading data
					</h2>
					<p className="text-gray-700">
						{marketsResponse.error ||
							currenciesResponse.error ||
							"Please try again later."}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-4 gap-8 sm:p-4">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
				<Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
					<RFQ
						marketsProp={marketsResponse.data}
						currenciesProp={currenciesResponse.data}
					/>
				</Suspense>
			</main>
		</div>
	);
};

export default Home;
