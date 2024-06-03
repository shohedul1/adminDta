export type User = {
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


export async function fetchUserProfile(id: string): Promise<User | undefined> {
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