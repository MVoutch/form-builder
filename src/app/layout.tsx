import { ApolloWrapper } from '@/lib/apollo-wrapper';
import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full bg-gray-50 text-gray-900">
            <body className="min-h-screen flex flex-col">
                <header className="border-b bg-white shadow-sm p-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-blue-600">
                        FormCraft
                    </h1>
                    <nav className="flex items-center gap-4">
                        <Link href="/admin/forms"
                           className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Forms
                        </Link>
                        <Link
                            href="/admin/forms/new"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            New Form
                        </Link>
                    </nav>
                </header>

                <main className="flex-1 container mx-auto px-6 py-6">
                    <ApolloWrapper>{children}</ApolloWrapper>
                </main>
            </body>
        </html>
    );
}