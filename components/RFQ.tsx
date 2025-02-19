import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
			</CardContent>
		</Card>
	</div>;
};
export default RFQ;
