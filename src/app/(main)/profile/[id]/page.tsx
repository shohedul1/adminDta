'use client';

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

async function fetchUserProfile(id: string): Promise<User | undefined> {
    const apiUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${id}`;
    console.log("Fetching user profile from:", apiUrl);

    try {
        const res = await fetch(apiUrl, {
            cache: "no-store"
        });

        if (res.ok) {
            return res.json();
        } else {
            console.error("Failed to fetch user profile:", res.statusText);
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}

const UserProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        const fetchProfileData = async () => {
            const data = await fetchUserProfile(params.id);
            if (data) {
                setProfile(data);
            }
        };

        if (status === 'authenticated') {
            fetchProfileData();
        } else if (status === 'unauthenticated') {
            // Handle unauthenticated state if necessary
        }
    }, [params.id, status]);


    return (
        <div>
            {
                profile && (
                    <ProfileEdit profile={profile} params={params} />
                )
            }
        </div>
    );
};

export default UserProfile;
