'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, fetchUserProfile } from '@/services';
import ProfileDetails from './ProfileDeails';

const ProfilePage = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [profile, setProfile] = useState<User | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    // Fetch all users when the status is authenticated
    useEffect(() => {
        if (status === 'authenticated') {
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

            fetchUserData();
        }
    }, [status]);

    // Redirect to login if the user is not authenticated
    useEffect(() => {
        if (status === 'loading') {
            return;
        } else if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status, router]);

    // Filter user data based on the session email
    const userData = allUsers.find(user => user.email === session?.user?.email);

    // Fetch profile data based on the filtered user data
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

        if (userData) {
            fetchProfile();
        }
    }, [userData]);


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
