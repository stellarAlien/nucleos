import type { Metadata } from 'next';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
    title: 'Nucleos',
    description: 'Nucleos — Modern biotech solutions',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
