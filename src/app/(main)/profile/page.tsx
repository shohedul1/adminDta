'use client';

import { useSession } from 'next-auth/react';
import ProfileDetails from './ProfileDeails';
import { useEffect, useState } from 'react';

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
        const userDataFetching = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    const data = await fetchUsers();
                    if (data) {
                        const userData = data.find((user) => user.email === session?.user?.email);
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
                console.warn("User is not authenticated or session email not found");
            }
            setLoading(false);
        };
        
        if (status !== 'loading') {
            userDataFetching();
        }
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
