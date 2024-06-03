'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDeails';
import { User, fetchUserProfile, fetchUsers } from '@/services/indext';

const UserProfile: React.FC = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user?.email) {
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
            } else {
                console.warn("No session email found");
            }
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

    return (
        <div>
            {userProfile && (
                <ProfileDetails userProfile={userProfile} />
            )}
        </div>
    );
};

export default UserProfile;
