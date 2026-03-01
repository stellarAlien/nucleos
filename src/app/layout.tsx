import type { Metadata } from 'next';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://nucleos-biotech.com'),
    title: {
        default: 'Nucleos Biotech | Driving Excellence in Biotech Innovation',
        template: '%s | Nucleos Biotech',
    },
    description: "The GCC's first biotech-focused platform, delivering expert solutions and connecting leading organizations to drive innovation and build a thriving ecosystem based in Masdar City.",
    openGraph: {
        title: 'Nucleos Biotech | Driving Excellence in Biotech Innovation',
        description: "The GCC's first biotech-focused platform, delivering expert solutions and connecting leading organizations to drive innovation and build a thriving ecosystem based in Masdar City.",
        url: 'https://nucleos-biotech.com',
        siteName: 'Nucleos Biotech',
        images: [
            {
                url: '/images/hero-bg.jpg',
                width: 1200,
                height: 630,
                alt: 'Nucleos Biotech',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
    },
    icons: {
        icon: '/favicon.ico',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Nucleos Biotech',
        url: 'https://nucleos-biotech.com',
        logo: 'https://nucleos-biotech.com/images/masdar-logo-placeholder.svg', // Update to actual logo URL
        description: 'A biotechnology convergence platform based in Masdar City, Abu Dhabi.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Masdar City, Abu Dhabi',
            addressCountry: 'UAE'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@nucleos-biotech.com',
            contactType: 'Customer Service'
        },
        sameAs: [
            'https://www.linkedin.com/company/nucleosbiotech/'
        ]
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
