'use client';

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import { User, fetchUserProfile } from "@/services/indext";
import { useEffect, useState } from "react";



const UserProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            const data = await fetchUserProfile(params.id);
            if(data){
                setProfile(data)
            }
        }
        fetchProfileData();
    }, [params.id]);

    console.log("userProfile data", profile)

    return (
        <div>
            {profile ? <ProfileEdit profile={profile} params={params} /> : <p>Loading...</p>}
        </div>
    );
};

export default UserProfile;
