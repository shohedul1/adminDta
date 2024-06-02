
import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
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

async function getUserData(params: { id: string }): Promise<User | undefined> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}`, {
            cache: "no-store"
        });
        if (res.ok) {
            return res.json();
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

const UserProfile: React.FC<{ params: { id: string } }> = async ({ params }) => {
    const profile = await getUserData(params)
    // console.log('profile', profile)


    return (
        <div>
            {profile ? <ProfileEdit profile={profile} params={params} /> : <p>Loading...</p>}
        </div>
    );
};

export default UserProfile;
