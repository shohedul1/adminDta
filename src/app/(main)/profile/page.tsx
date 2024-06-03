'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDeails';

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

async function fetchUser(): Promise<User[] | undefined> {
    const apiUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`;
    console.log("Fetching user data from:", apiUrl);

    try {
        const res = await fetch(apiUrl, {
            cache: "no-store"
        });

        if (res.ok) {
            return res.json();
        } else {
            console.error("Failed to fetch user data:", res.statusText);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

const UserProfile: React.FC = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                const data = await fetchUser();
                if (data) {
                    const userData = data.find((user: User) => user.email === session?.user?.email);
                    if (userData) {
                        setProfile(userData);
                    } else {
                        console.warn("No matching user found for email:", session?.user?.email);
                    }
                } else {
                    console.warn("No user data returned from API");
                }
            } else if (status !== 'authenticated') {
                console.warn("User is not authenticated");
            } else {
                console.warn("No session email found");
            }
            setLoading(false);
        };

        fetchUserData();
    }, [session, status]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {profile ? (
                <ProfileDetails profile={profile} />
            ) : (
                <p>No profile found for the current session.</p>
            )}
        </div>
    );
};

export default UserProfile;
