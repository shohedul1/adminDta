'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    age?: string;
    designation?: string;
    location?: string;
    about?: string;
    avatar?: { url: string }; // Add avatar field
};

type ProfileDetailsProps = {
    profile: User[];
};

const ProfileDeails: React.FC<ProfileDetailsProps> = ({ profile }) => {

    const { data: session, status } = useSession();


    // Filter user data based on email and get the first user (assuming only one user matches the email)
    const userData = profile.find((prev) => prev.email === session?.user?.email);

    // Filter user data based on email and get the first user (assuming only one user matches the email)
    const imageUrl = userData?.avatar?.url || session?.user?.image || '/food_18.png'


    return (
        <div className="px-5 py-5 lg:px-20 bg-blue-100">
            <div className="text-center text-primaryColor pb-10">
                <h2 className='text-2xl font-bold text-gray-700 '>Profile infromation</h2>
            </div>

            <div className="flex-1 space-y-3 pb-5">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src={imageUrl}
                        alt="avatar"
                        height={500}
                        width={500}
                        sizes="100vw"
                        className="w-40 h-40 rounded-full"
                    />
                </div>
            </div>
            
            <div className="flex flex-col md:felx-row gap-5">

                <div className='space-y-2'>
                    <p className="text-2xl font-bold">About Me</p>
                    <p className='text-xl font-bold text-gray-400 '>{userData?.about}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-bold">Designation:</p>
                    <p className='text-xl font-bold text-gray-400'>{userData?.designation}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-2xl font-bold">Email:</p>
                    <p className='text-xl font-boldv text-gray-400'>{userData?.email || session?.user?.email}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-bold">Name:</p>
                    <p className='text-xl font-bold text-gray-400'>{userData?.name || session?.user?.name}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-bold">Age:</p>
                    <p className='text-xl font-bold text-gray-400'>{userData?.age}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-bold">Location:</p>
                    <p className='text-xl font-bold text-gray-400'>{userData?.location}</p>
                </div>
            </div>

            <div className="pt-5">
                {userData?.email === session?.user?.email || session?.user?.email ? (
                    <Link
                        className="px-3 py-2 hover:bg-red-500 border border-red-500 hover:text-white transition-all duration-300 rounded-lg text-black font-bold"
                        href={`/profile/${userData?._id}`}
                    >
                        Edit
                    </Link>

                ) : (<></>)}
            </div>
        </div>

    );
};

export default ProfileDeails;




