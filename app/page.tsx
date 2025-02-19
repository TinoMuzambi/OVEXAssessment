import RFQ from "@/components/RFQ";
import { getCurrencies, getMarkets } from "@/server/actions";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Home = async () => {
	const [markets, currencies] = await Promise.all([
		getMarkets(),
		getCurrencies(),
	]);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
				<Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
					<RFQ marketsProp={markets} currenciesProp={currencies} />
				</Suspense>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	);
};

export default Home;
