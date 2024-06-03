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
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`, {
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
    const { data: session } = useSession();
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user?.email) {
                const data = await fetchUser();
                if (data) {
                    const userData = data.find((user: User) => user.email === session?.user?.email);
                    if (userData) {
                        setProfile(userData);
                    } else {
                        console.warn("No matching user found");
                    }
                } else {
                    console.warn("No user data returned from API");
                }
            } else {
                console.warn("No session email found");
            }
        };

        fetchUserData();
    }, [session]);

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
