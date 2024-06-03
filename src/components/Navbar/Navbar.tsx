'use client';

import { signOut, useSession } from 'next-auth/react';
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] }); // Corrected weights

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

async function fetchUser(): Promise<User[] | undefined> {
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
const Navbar = () => {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                const data = await fetchUser();
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
            } else if (status !== 'authenticated') {
                console.warn("User is not authenticated");
            } else {
                console.warn("No session email found");
            }
        };

        fetchUserData();
    }, [session, status]);

    console.log("shohiudlPramanik", profile)

    // Ensure that the found user has the correct type

    // Use a default image if no avatar is found
    const imageUrl = profile?.avatar?.url || session?.user?.image || '/food_18.png';


    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle((prev) => !prev);
    };

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
    }, [session, status]);

    return (
        <header className='w-full p-5 bg-lime-500 fixed z-40'>
            <div className='flex justify-between items-center lg:px-40 px-0'>
                <Link href={"/"} className={`${pacifico.className} text-3xl hover:text-red-400`}>WebDev</Link>
                <nav className='flex items-center gap-4'>
                    <ul className='flex gap-4'>
                        <Link href={"/blog"}>BLOG</Link>
                        <Link href={"/userpost"}>USER POST</Link>
                    </ul>
                    <div onClick={handleClick} className='relative'>
                        <Image src={imageUrl} width={50} height={50} alt='image' className='w-10 h-10 rounded-full' />
                        {toggle && (
                            <>
                                <div className='absolute bg-white text-black p-2 rounded-md left-[-50px] lg:left-[-30px] top-14'>
                                    <Link href={`/profile`} className='text-base font-bold hover:bg-gray-400 px-5 py-2 hover:text-white rounded-full'>
                                        Profile
                                    </Link>
                                    <button onClick={() => signOut()} className='text-base font-bold hover:bg-gray-400 px-5 py-2 hover:text-white rounded-full'>Logout</button>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
