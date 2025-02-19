"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bitcoin } from "lucide-react";

interface Quote {
	cost: number;
	rate: number;
	amount: number;
	expiryTime: number;
}

export default function QuoteRequest() {
	const [selectedMarket, setSelectedMarket] = useState("BTC/ZAR");
	const [amount, setAmount] = useState("");
	const [quote, setQuote] = useState<Quote | null>(null);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [loading, setLoading] = useState(false);

	const handleGetQuote = async () => {
		setLoading(true);
		// Simulated API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const mockQuote: Quote = {
			cost: Number.parseFloat(amount) * 1000000, // Mock rate
			rate: 1000000, // Mock rate in ZAR
			amount: Number.parseFloat(amount),
			expiryTime: Date.now() + 30000, // 30 seconds from now
		};

		setQuote(mockQuote);
		setTimeLeft(30);
		setLoading(false);

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-xl font-medium">Request Quote</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<Tabs defaultValue="buy" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="buy">Buy</TabsTrigger>
						<TabsTrigger value="sell">Sell</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label>Select Market</Label>
						<Select
							defaultValue={selectedMarket}
							onValueChange={setSelectedMarket}
						>
							<SelectTrigger>
								<SelectValue>
									<div className="flex items-center gap-2">
										<Bitcoin className="w-5 h-5" />
										{selectedMarket}
									</div>
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="BTC/ZAR">
									<div className="flex items-center gap-2">
										<Bitcoin className="w-5 h-5" />
										BTC/ZAR
									</div>
								</SelectItem>
								{/* Add more markets as needed */}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Amount</Label>
						<Input
							type="number"
							placeholder="0.00"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>

					<Button
						className="w-full"
						onClick={handleGetQuote}
						disabled={!amount || loading}
					>
						{loading ? "Getting Quote..." : "Get Quote"}
					</Button>

					{quote && (
						<div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Cost:</span>
								<span className="font-medium">
									ZAR {quote.cost.toLocaleString()}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Rate:</span>
								<span className="font-medium">
									ZAR {quote.rate.toLocaleString()}/BTC
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">You will receive:</span>
								<span className="font-medium">{quote.amount} BTC</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Quote expires in:</span>
								<span
									className={`font-medium ${
										timeLeft <= 5 ? "text-destructive" : ""
									}`}
								>
									{timeLeft > 0 ? `${timeLeft}s` : "Expired"}
								</span>
							</div>
							{timeLeft > 0 && (
								<Button className="w-full" variant="secondary">
									Accept Quote
								</Button>
							)}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
