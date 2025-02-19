"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import Quote from "./Quote";
import { cn, QuoteType, RFQProps } from "@/lib/utils";
import { requestQuote } from "@/server/actions";

const RFQ: React.FC<RFQProps> = ({ markets, currencies }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get current values from URL or use defaults
	const side: "buy" | "sell" = (searchParams.get("side") || "buy") as
		| "buy"
		| "sell";
	const market = searchParams.get("market") || "";
	const amount = searchParams.get("amount") || "";

	const [quote, setQuote] = useState<QuoteType>();
	const [fetching, setFetching] = useState(false);
	const [popoverOpen, setPopoverOpen] = useState(false);

	const handleUpdateParams = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		if (value) {
			newParams.set(key, value);
		} else {
			newParams.delete(key);
		}
		router.replace(`?${newParams.toString()}`);
	};

	const handleGetQuote = async () => {
		setFetching(true);
		const quoteRes = await requestQuote({
			market,
			from_amount: amount,
			side,
			to_amount: amount,
		});
		setQuote(quoteRes);
		setFetching(false);
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-xl font-medium">
				<CardTitle className="text-xl font-medium">Request Quote</CardTitle>
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
									{market
										? markets.find((marketIter) => marketIter.id === market)
												?.name
										: "Select trading pair..."}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="PopoverContent w-full p-0">
								<Command>
									<CommandInput placeholder="Search trading pair..." />
									<CommandList>
										<CommandEmpty>No trading pair found.</CommandEmpty>
										<CommandGroup>
											{markets.map((marketIter) => (
												<CommandItem
													key={marketIter.id}
													value={marketIter.id}
													onSelect={(value) => {
														handleUpdateParams("market", value);
														setPopoverOpen(false);
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															market === marketIter.id
																? "opacity-100"
																: "opacity-0"
														)}
													/>
													{marketIter.name}
												</CommandItem>
											))}
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

					<Button className="w-full" onClick={handleGetQuote}>
						Get Quote
					</Button>

					{fetching ? <div>Fetching quote</div> : null}
					{quote ? <Quote quote={quote} currencies={currencies} /> : null}
				</div>
			</CardContent>
		</Card>
	);
};
export default RFQ;
