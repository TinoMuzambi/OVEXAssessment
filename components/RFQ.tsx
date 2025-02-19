"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Quote from "./Quote";
import { QuoteType, RFQProps } from "@/lib/utils";
import { requestQuote } from "@/server/actions";

const RFQ: React.FC<RFQProps> = ({ markets }) => {
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
			to_amount: "1",
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
						<Select
							value={market}
							onValueChange={(value) => handleUpdateParams("market", value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a market" />
							</SelectTrigger>
							<SelectContent>
								{markets.map((marketIter) => (
									<SelectItem key={marketIter.id} value={marketIter.id}>
										{marketIter.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
					{quote ? <Quote /> : null}
				</div>
			</CardContent>
		</Card>
	);
};
export default RFQ;
