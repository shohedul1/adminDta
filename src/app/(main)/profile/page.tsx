'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { User } from '@/services/indext';
import ProfileDetails from './ProfileDeails';

// Fetch user data function
async function fetchUsers(): Promise<User[] | undefined> {
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
            if (session) {
                try {
                    const data = await fetchUsers();
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
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.warn("No session email found");
            }
            setLoading(false);
        };

        fetchUserData();
    }, [session, status]);

    console.log("UserProfile", profile);
    console.log("Session", session);

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
