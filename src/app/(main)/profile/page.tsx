'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { User, fetchUserProfile, fetchUsers } from '@/services/indext';
import ProfileDetails from './ProfileDeails';

const UserProfile: React.FC = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
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
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchUserData();
        }
    }, [session, status]);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (profile?._id) {
                try {
                    const data = await fetchUserProfile(profile._id);
                    if (data) {
                        setUserProfile(data);
                    } else {
                        console.warn("No profile data returned from API for user ID:", profile._id);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchProfileData();
    }, [profile]);

    console.log("UserProfile", userProfile);
    console.log("shohidul", profile)
    console.log("session", session);




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
