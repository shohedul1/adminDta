'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDeails';
import { User, fetchUserProfile, fetchUsers } from '@/services/indext';

// type User = {
//     _id: string;
//     name: string;
//     email: string;
//     password: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//     avatar: { url: string };
//     age?: string;
//     designation?: string;
//     location?: string;
//     about?: string;
// };

// async function fetchUsers(): Promise<User[] | undefined> {
//     const apiUrl = '/api/user';
//     console.log("Fetching user data from:", apiUrl);

//     try {
//         const res = await fetch(apiUrl, {
//             cache: "no-store"
//         });

//         if (res.ok) {
//             return res.json();
//         } else {
//             console.error("Failed to fetch user data:", res.statusText);
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//     }
// }

// async function fetchUserProfile (userId: string): Promise<User | undefined> {
//     const apiUrl = `/api/user/${userId}`;
//     console.log("Fetching user profile from:", apiUrl);

//     try {
//         const res = await fetch(apiUrl, {
//             cache: "no-store"
//         });

//         if (res.ok) {
//             return res.json();
//         } else {
//             console.error("Failed to fetch user profile:", res.statusText);
//         }
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//     }
// }

const UserProfile: React.FC = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (status === 'authenticated' && session?.user?.email) {
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
            } else if (status !== 'authenticated') {
                console.warn("User is not authenticated");
            } else {
                console.warn("No session email found");
            }
            setLoading(false);
        };

        fetchUserData();
    }, [session, status]);

    const [userProfile, setUserProfile] = useState<User | null>(null);

    useEffect(() => {
        if (profile?._id) {
            const fetchProfileData = async () => {
                const data = await fetchUserProfile(profile._id);
                if (data) {
                    setUserProfile(data);
                } else {
                    console.warn("No profile data returned from API for user ID:", profile._id);
                }
            };

            fetchProfileData();
        }
    }, [profile]);

    console.log("UserProfile", userProfile);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {userProfile ? (
                <ProfileDetails userProfile={userProfile} />
            ) : (
                <p>No profile found for the current session.</p>
            )}
        </div>
    );
};

export default UserProfile;
