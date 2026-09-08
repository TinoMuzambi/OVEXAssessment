import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { AppProvider } from "@/app/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
	title: "OVEX RFQ",
	description: "OVEX Request for Quote Component using OVEX API.",
	icons: {
		icon: ["/favicon.svg"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AppProvider>
				<body className="bg-ovex-logo bg-no-repeat bg-[length:400px_400px] bg-top lg:bg-top-negative-5 lg:bg-[length:100%_100%]">
					{children}
					<Toaster />
				</body>
			</AppProvider>
		</html>
	);
}
