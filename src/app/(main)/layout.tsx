'use client';

import Navbar from '@/components/Navbar/Navbar';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
        if (!session) {
            router.push('/login');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>; // Show a loading state
    }

    return (
        <div>
            <div className='pb-20'>
                <Navbar />
            </div>
            {children}
        </div>
    );
};

export default Layout;
