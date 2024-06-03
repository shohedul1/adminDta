'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/services';
import ProfileDetails from './ProfileDetails';

const ProfilePage = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') {
            return;
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user', {
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`Error fetching user data: ${response.statusText}`);
                }
                const data: User[] = await response.json();
                const user = data.find((user) => user.email === session?.user?.email);
                if (user) {
                    setProfile(user);
                } else {
                    console.error("No profile found for the current session.");
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (status === 'authenticated') {
            fetchUserData();
        }
    }, [status, session]);

    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }

    return (
        <div>
            {profile ? (
                <ProfileDetails profile={profile} />
            ) : (
                <div>No profile found for the current session.</div>
            )}
        </div>
    );
};

export default ProfilePage;
