import { Button } from "./ui/button";

const Quote: React.FC = () => {

    return (
        <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Cost:</span>
                <span className="font-medium">
                    ZAR: R800.00
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Rate:</span>
                <span className="font-medium">ZAR R8.00</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">You will receive:</span>
                <span className="font-medium"> BTC</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Quote expires in:</span>
                <span className="font-medium">30s</span>
            </div>

            <Button className="w-full" variant="secondary">
                Accept Quote
            </Button>
        </div>
    )

}

export default Quote;