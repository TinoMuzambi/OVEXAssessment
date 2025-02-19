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

import markets from "@/app/data/markets.json"
import Quote from "./Quote";

const RFQ: React.FC = () => {
	return <div className="">
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-xl font-medium">Request Quote</CardHeader>
			<CardContent className="space-y-6">
				<Tabs className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="buy">Buy</TabsTrigger>
						<TabsTrigger value="sell">Sell</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="sapce-y-4">
					<div className="space-y-2">
						<Label>Select Market</Label>
						<Select>
							<SelectTrigger>
								<SelectValue>
									Select a market
								</SelectValue>
							</SelectTrigger>
							<SelectContent>		
								{markets.map((market) => (
									<SelectItem key={market.id} value={market.name}>
										{market.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Amount</Label>
						<Input type="number" placeholder="0.00" min={0} />
					</div>

					<Button className="w-full">
						Get Quote
					</Button>

					<Quote />
				</div>
			</CardContent>
		</Card>
	</div>;
};
export default RFQ;
