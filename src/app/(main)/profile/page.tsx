'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDeails from './ProfileDeails';

type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    avatar: { url: string };
    age?: string;
    designation?: string;
    location?: string;
    about?: string;
};

const UserProfile: React.FC = () => {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const userGet = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`, {
                cache: 'no-store'
            });
            if (res.ok) {
                const resData: User[] = await res.json();
                const userData = resData.find((user) => user.email === session?.user?.email) || null;
                setProfile(userData);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('An error occurred while fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            userGet();
        } else {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {profile ? (
                <ProfileDeails profile={profile} />
            ) : (
                <p>No profile found for the current session.</p>
            )}
        </div>
    );
};

export default UserProfile;
