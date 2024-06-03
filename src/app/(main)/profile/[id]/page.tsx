'use client';

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import { User } from "@/services/indext";
import { useEffect, useState } from "react";



const UserProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
    const [profile, setProfile] = useState<User | null>(null);

    async function fetchBlog() {
        try {
            const response = await fetch(`/api/user/${params.id}`);
            const data = await response.json();
            setProfile(data)
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    console.log("userProfile data", profile)

    return (
        <div>
            {profile ? <ProfileEdit profile={profile} params={params} /> : <p>Loading...</p>}
        </div>
    );
};

export default UserProfile;
