'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, fetchUserProfile } from '@/services';
import ProfileDetails from './ProfileDeails';

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

const ProfilePage = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [profile, setProfile] = useState<User | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

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
                setAllUsers(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (status === 'loading') {
            return;
        } else if (session) {
            fetchUserData();
        }
    }, [status, router]);

    // Filter user data based on the session email
    const userData = allUsers.find(user => user.email === session?.user?.email);
    console.log("userdata", userData);

    useEffect(() => {
        const fetchProfile = async () => {
            if (userData?._id) {
                try {
                    const data = await fetchUserProfile(userData._id);
                    if (data) {
                        setProfile(data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchProfile()


    }, [status, userData]);

    console.log("profilePage", profile)



    return (
        <div>
            {profile && (
                <ProfileDetails profile={profile} />
            )}
        </div>
    );
};

export default ProfilePage;
