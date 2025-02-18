import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "OVEX RFQ Component",
	description: "OVEX Request for Quote Component using OVEX API.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
