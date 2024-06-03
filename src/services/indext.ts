export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    avatar?: { url: string; id?: string };
    // avatar: { url: string };
    age?: string;
    designation?: string;
    location?: string;
    about?: string;
};

export async function fetchUsers(): Promise<User[] | undefined> {
    const apiUrl = '/api/user';
    console.log("Fetching user data from:", apiUrl);

    try {
        const res = await fetch(apiUrl, {
            cache: "no-store"
        });

        if (res.ok) {
            return res.json();
        } else {
            console.error("Failed to fetch user data:", res.statusText);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

export async function fetchUserProfile(userId: string): Promise<User | undefined> {
    const apiUrl = `/api/user/${userId}`;
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
