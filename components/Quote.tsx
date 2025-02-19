"use client";
import { useState } from "react";

import { QuoteProps } from "@/lib/utils";
import { Button } from "./ui/button";

const Quote: React.FC<QuoteProps> = ({ quote }) => {
	const [timeLeft, setTimeLeft] = useState(
		Date.now() / 1000 - quote.expires_at
	);

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
	 * @param precision The number of decimal places to display
	 * @returns A formatted currency string
	 */
	const currencyFormatter = (
		currency: string,
		amount: number,
		precision = 2
	) => {
		return new Intl.NumberFormat("en-ZA", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: precision,
		}).format(amount);
	};

	return (
		<div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
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
					{currencyFormatter(quote.to_currency, parseFloat(quote.to_amount), 6)}
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

			<Button className="w-full" variant="secondary">
				Accept Quote
			</Button>
		</div>
	);
};

export default Quote;
