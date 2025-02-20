"use client";

import { useContext, useEffect, useState } from "react";

import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { AppContext } from "@/app/context/AppContext";

const Quote: React.FC = () => {
	const { quote, currencies } = useContext(AppContext);

	const [timeLeft, setTimeLeft] = useState(0);

	const { toast } = useToast();

	useEffect(() => {
		if (!quote) {
			toast({
				title: "Error",
				description: "Failed to get quote. Please try again.",
				variant: "destructive",
			});
			return;
		}

		let initialTimeLeft = quote.expires_at - Date.now() / 1000;
		initialTimeLeft = Math.floor(initialTimeLeft);

		if (initialTimeLeft > 0) {
			setTimeLeft(initialTimeLeft);
		} else {
			setTimeLeft(0);
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quote]);

	/**
	 * This function formats a currency amount to a string with the given currency symbol
	 * @param currency The currency to format
	 * @param amount The amount to format
	 * @returns A formatted currency string
	 */
	const currencyFormatter = (currency: string, amount: number) => {
		const currencyObj = currencies.find((c) => c.id === currency);

		if (!currencyObj) {
			toast({
				title: "Warning",
				description: `Currency code "${currency}" not found. Displaying raw amount.`,
				variant: "destructive",
			});
			return `${amount} ${currency.toUpperCase()}`;
		}

		const formatter = new Intl.NumberFormat("en-ZA", {
			style: "decimal",
			minimumFractionDigits: currencyObj.type === "coin" ? 8 : 2,
			maximumFractionDigits: currencyObj.type === "coin" ? 8 : 2,
		});

		try {
			const formattedAmount = formatter.format(amount);
			return currencyObj.type === "coin"
				? `${formattedAmount} ${currency.toUpperCase()}`
				: `${currencyObj.symbol} ${formattedAmount}`;
		} catch (error) {
			console.error(error);
			toast({
				title: "Error",
				description: "Unable to format currency. Displaying raw amount.",
				variant: "destructive",
			});
			return `${amount} ${currency.toUpperCase()}`;
		}
	};

	if (!quote) {
		return null;
	}

	return (
		<div className="mt-6 space-y-4 p-4 bg-muted rounded-lg motion-preset-slide-up">
			<div className="grid grid-cols-[2fr_3fr] gap-4 min-w-0 overflow-x-auto">
				<span className="text-muted-foreground">Cost:</span>
				<span className="font-medium overflow-x-auto flex-shrink-0 whitespace-nowrap text-end">
					{currencyFormatter(
						quote.from_currency,
						parseFloat(quote.from_amount)
					)}
				</span>
			</div>
			<div className="grid grid-cols-[2fr_3fr] gap-4 min-w-0 overflow-x-auto">
				<span className="text-muted-foreground">Rate:</span>
				<span className="font-medium overflow-x-auto flex-shrink-0 whitespace-nowrap text-end">
					{currencyFormatter(quote.from_currency, parseFloat(quote.rate))}/
					{quote.to_currency.toLocaleUpperCase()}
				</span>
			</div>
			<div className="grid grid-cols-[2fr_3fr] gap-4 min-w-0 overflow-x-auto">
				<span className="text-muted-foreground">You will receive:</span>
				<span className="font-medium overflow-x-auto flex-shrink-0 whitespace-nowrap text-end">
					{currencyFormatter(quote.to_currency, parseFloat(quote.to_amount))}
				</span>
			</div>
			<div className="grid grid-cols-[2fr_3fr] gap-4 min-w-0 overflow-x-auto">
				<span className="text-muted-foreground">Quote expires in:</span>
				<span
					className={`font-medium overflow-x-auto flex-shrink-0 whitespace-nowrap text-end ${
						timeLeft <= 5 ? "text-destructive" : ""
					}`}
				>
					{timeLeft > 0 ? `${timeLeft}s` : "Expired"}
				</span>
			</div>

			<Button className="w-full" variant="outline" disabled>
				Accept Quote
			</Button>
		</div>
	);
};

export default Quote;
