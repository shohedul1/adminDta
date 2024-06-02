'use client';

import { signOut, useSession } from 'next-auth/react';
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] }); // Corrected weights

// Define the type for the user profile
interface UserProfile {
    email: string;
    avatar?: { url: string };
    // Add other properties as needed
}

const Navbar = () => {
    const { data: session, status } = useSession();

    // Use the defined type for the profile state
    const [profile, setProfile] = useState<UserProfile[]>([]);

    const userGet = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`, {
                cache: 'no-store'
            });
            if (res.ok) {
                const resData = await res.json();
                console.log('API response data:', resData); // Debugging line
                setProfile(resData);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('An error occurred while fetching user profile:', error);
        }
    };

    useEffect(() => {
        userGet();
    }, []);

    // Ensure that the found user has the correct type
    const userData = profile.find((prev) => prev.email === session?.user?.email);
    console.log("userData", userData); // Debugging line

    // Use a default image if no avatar is found
    const imageUrl = userData?.avatar?.url || session?.user?.image || '/food_18.png';

    console.log("imageUrl", imageUrl); // Debugging line

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
