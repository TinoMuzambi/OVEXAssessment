import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { AppProvider } from "@/app/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
	title: "OVEX RFQ",
	description: "OVEX Request for Quote Component using OVEX API.",
	icons: {
		icon: ["/favicon.svg", "ovex_logo_light.svg"],
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
				<body>
					{children}
					<Toaster />
				</body>
			</AppProvider>
		</html>
	);
}
