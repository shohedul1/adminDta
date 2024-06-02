'use client';

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar: { url: string; id?: string }; // Make the 'id' property optional
    age?: string;
    designation?: string;
    location?: string;
    about?: string;
}

async function getUserData(id: string): Promise<User | undefined> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${id}`, {
            cache: "no-store"
        });
        if (res.ok) {
            return res.json();
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

const UserProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData(params.id);
            if (data) {
                setProfile(data);
            }
        };

        fetchUserData();
    }, [params.id]);

    return (
        <div>
            {profile ? <ProfileEdit profile={profile} params={params} /> : <p>Loading...</p>}
        </div>
    );
};

export default UserProfile;
