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

		setTimeLeft(Date.now() / 1000 - quote.expires_at);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quote]);

	// Timer to update time left.
	const timer = setInterval(() => {
		setTimeLeft((prev) => {
			if (prev <= 1) {
				clearInterval(timer);
				return 0;
			}
			return prev - 1;
		});
	}, 1000);

	/**
	 * This function formats a currency amount to a string with the given currency symbol
	 * @param currency The currency to format
	 * @param amount The amount to format
	 * @returns A formatted currency string
	 */
	const currencyFormatter = (currency: string, amount: number) => {
		const currencyObj = currencies.find((c) => c.id === currency);

		if (!currencyObj) {
			return amount;
		}

		return new Intl.NumberFormat("en-ZA", {
			style: "currency",
			currency: currencyObj?.id,
			minimumFractionDigits: currencyObj?.type === "coin" ? 8 : 2,
		}).format(amount);
	};

	if (!quote) {
		return null;
	}

	return (
		<div className="mt-6 space-y-4 p-4 bg-muted rounded-lg motion-preset-slide-up">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Cost:</span>
				<span className="font-medium">
					{currencyFormatter(
						quote.from_currency,
						parseFloat(quote.from_amount)
					)}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Rate:</span>
				<span className="font-medium">
					{currencyFormatter(quote.from_currency, parseFloat(quote.rate))}/
					{quote.to_currency.toLocaleUpperCase()}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">You will receive:</span>
				<span className="font-medium">
					{currencyFormatter(quote.to_currency, parseFloat(quote.to_amount))}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Quote expires in:</span>
				<span
					className={`font-medium ${timeLeft <= 5 ? "text-destructive" : ""}`}
				>
					{timeLeft > 0 ? `${timeLeft}s` : "Expired"}
				</span>
			</div>

			<Button className="w-full" variant="secondary" disabled>
				Accept Quote
			</Button>
		</div>
	);
};

export default Quote;
