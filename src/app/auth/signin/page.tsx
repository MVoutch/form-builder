'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn('credentials', {
            username,
            password,
            callbackUrl,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-8 border rounded shadow-md w-96">
                <h1 className="text-2xl mb-4">Sign In</h1>
                <input
                    type="text"
                    placeholder="Username (admin)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password (admin)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Sign In
                </button>
            </form>
        </div>
    );
}