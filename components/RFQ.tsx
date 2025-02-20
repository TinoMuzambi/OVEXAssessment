"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { Check, ChevronsUpDown, Coins, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import Quote from "./Quote";
import { cn, RFQProps } from "@/lib/utils";
import { requestQuote } from "@/server/actions";
import { AppContext } from "@/app/context/AppContext";
import Image from "next/image";

const RFQ: React.FC<RFQProps> = ({ marketsProp, currenciesProp }) => {
	const { markets, setMarkets, setCurrencies, quote, setQuote } =
		useContext(AppContext);

	const [fetching, setFetching] = useState(false);
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [tradingPair, setTradingPair] = useState("");
	const [tradingPairIcons, setTradingPairIcons] = useState<string[]>([]);

	const router = useRouter();
	const searchParams = useSearchParams();

	const { toast } = useToast();

	// Get current values from URL or use defaults
	const side: "buy" | "sell" = (searchParams.get("side") || "buy") as
		| "buy"
		| "sell";
	const market = searchParams.get("market") || "";
	const amount = searchParams.get("amount") || "";

	/**
	 * This function updates the URL query params with the given key and value.
	 * @param key The key to update
	 * @param value The value to set to the key
	 */
	const handleUpdateParams = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (value) {
			newParams.set(key, value);
		} else {
			newParams.delete(key);
		}
		router.replace(`?${newParams.toString()}`);
	};

	/**
	 * This function fetches a quote from the server and updates the context with the quote.
	 */
	const handleGetQuote = async () => {
		if (!amount.replaceAll("0", "").length) {
			toast({
				title: "Error",
				description: "Invalid amount value.",
				variant: "destructive",
			});
			return;
		}

		if (amount.includes("-")) {
			toast({
				title: "Error",
				description: "Amount cannot be negative.",
				variant: "destructive",
			});
			return;
		}

		setFetching(true);

		try {
			const quoteRes = await requestQuote({
				market,
				from_amount: amount,
				side,
				to_amount: amount,
			});
			if (setQuote && quoteRes) setQuote(quoteRes);
		} catch (error) {
			console.error(error);
			toast({
				title: "Error",
				description: "Failed to get quote. Please try again.",
				variant: "destructive",
			});
		}
		setFetching(false);
	};

	useEffect(() => {
		if (setMarkets) setMarkets(marketsProp);
		if (setCurrencies) setCurrencies(currenciesProp);

		if (market) {
			const marketObj = marketsProp.find(
				(marketIter) => marketIter.id === market
			);

			if (marketObj) {
				setTradingPair(marketObj.name);

				// Get the icon URLs for the trading pair
				const icon1 = currenciesProp.find(
					(curr) => curr.id === marketObj.name.split("/")[0].toLowerCase()
				)?.icon_url;
				const icon2 = currenciesProp.find(
					(curr) => curr.id === marketObj.name.split("/")[1].toLowerCase()
				)?.icon_url;

				if (icon1 && icon2) setTradingPairIcons([icon1, icon2]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [market]);

	return (
		<Card className="w-full max-w-md mx-auto motion-preset-pop">
			<CardHeader className="text-xl font-medium">
				<CardTitle className="text-xl font-medium">
					Request for a Quote
				</CardTitle>
				{tradingPair && (
					<small>
						{side === "buy" ? "Buy" : "Sell"} {tradingPair.split("/")[0]}{" "}
						{side === "buy" ? "with" : "for"} {tradingPair.split("/")[1]}{" "}
					</small>
				)}
			</CardHeader>
			<CardContent className="space-y-6">
				<Tabs
					className="w-full"
					value={side}
					onValueChange={(value) => handleUpdateParams("side", value)}
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="buy">Buy</TabsTrigger>
						<TabsTrigger value="sell">Sell</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label>Select Market</Label>
						<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={popoverOpen}
									className="w-full justify-between"
								>
									{market ? (
										<div className="flex items-center gap-2">
											{tradingPairIcons[0] ? (
												<Image
													width={16}
													height={16}
													alt={tradingPair.split("/")[0]}
													src={tradingPairIcons[0]}
												/>
											) : (
												<Coins />
											)}

											<span>{tradingPair}</span>

											{tradingPairIcons[1] ? (
												<Image
													width={16}
													height={16}
													alt={tradingPair.split("/")[0]}
													src={tradingPairIcons[1]}
												/>
											) : (
												<Coins />
											)}
										</div>
									) : (
										"Select trading pair..."
									)}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="PopoverContent w-full p-0">
								<Command>
									<CommandInput placeholder="Search trading pair..." />
									<CommandList>
										<CommandEmpty>No trading pair found.</CommandEmpty>
										<CommandGroup>
											{markets.map((marketIter) => {
												// Get the icon URLs for the trading pair
												const icon1 = currenciesProp.find(
													(curr) =>
														curr.id ===
														marketIter.name.split("/")[0].toLowerCase()
												)?.icon_url;
												const icon2 = currenciesProp.find(
													(curr) =>
														curr.id ===
														marketIter.name.split("/")[1].toLowerCase()
												)?.icon_url;
												return (
													<CommandItem
														key={marketIter.id}
														value={marketIter.id}
														onSelect={(value) => {
															handleUpdateParams("market", value);
															setPopoverOpen(false);
															setTradingPair(marketIter.name);
														}}
														className="grid grid-cols-[1fr_1fr_2fr_1fr] justify-between gap-4 items-center"
													>
														<Check
															className={cn(
																"mr-2 h-4 w-4",
																market === marketIter.id
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>

														{icon1 ? (
															<Image
																width={16}
																height={16}
																alt={marketIter.name.split("/")[0]}
																src={icon1}
															/>
														) : (
															<Coins />
														)}

														<span>{marketIter.name}</span>

														{icon2 ? (
															<Image
																width={16}
																height={16}
																alt={marketIter.name.split("/")[0]}
																src={icon2}
															/>
														) : (
															<Coins />
														)}
													</CommandItem>
												);
											})}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>

					<div className="space-y-2">
						<Label>Amount</Label>
						<Input
							type="number"
							placeholder="0.00"
							min={0}
							value={amount}
							onChange={(e) => handleUpdateParams("amount", e.target.value)}
						/>
					</div>

					<Button
						disabled={fetching}
						className="w-full"
						onClick={handleGetQuote}
					>
						{fetching ? (
							<Loader2 className="h-8 w-8 animate-spin" />
						) : (
							"Get Quote"
						)}
					</Button>

					{quote && <Quote />}
				</div>
			</CardContent>
		</Card>
	);
};
export default RFQ;
