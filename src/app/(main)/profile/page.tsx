'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDeails';

const ProfilePage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user', {
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`Error fetching user data: ${response.statusText}`);
                }

                const data = await response.json();
                setAllUsers(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserData();
    }, []);

    // Filter user data based on the session email
    const profile = allUsers.find((user: any) => user?.email === session?.user?.email);
    console.log("currentUser", profile)

    if (!session) {
        return <div>Loading...</div>;
    }

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
