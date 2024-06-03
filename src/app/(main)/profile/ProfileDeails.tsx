
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
    avatar?: { url: string };
};

type ProfileDetailsProps = {
    profile: User;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
    const { data: session } = useSession();
    const imageUrl = profile?.avatar?.url || session?.user?.image || '/food_18.png'


    return (
        <div className="px-5 py-10 lg:px-20 bg-blue-100  h-full w-full">
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
                <div className="space-y-2">
                    <p className="text-2xl font-bold">Name:</p>
                    <p className='text-xl font-bold text-gray-400'>{profile?.name}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-bold">Email:</p>
                    <p className='text-xl font-boldv text-gray-400'>{profile?.email}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-2xl font-bold">Age:</p>
                    <p className='text-xl font-bold text-gray-400'>{profile?.age}</p>
                </div>

                <div className='space-y-2'>
                    <p className="text-2xl font-bold">About Me</p>
                    <p className='text-xl font-bold text-gray-400 '>{profile?.about}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-2xl font-bold">Designation:</p>
                    <p className='text-xl font-bold text-gray-400'>{profile?.designation}</p>
                </div>


                <div className="space-y-2">
                    <p className="text-2xl font-bold">Location:</p>
                    <p className='text-xl font-bold text-gray-400'>{profile?.location}</p>
                </div>
            </div>

            <div className="pt-5">
                {profile?.email === session?.user?.email ? (
                    <Link
                        className="px-3 py-2 hover:bg-red-500 border border-red-500 hover:text-white transition-all duration-300 rounded-lg text-black font-bold"
                        href={`/profile/${profile?._id}`}
                    >
                        Edit
                    </Link>

                ) : (<></>)}
            </div>
        </div>
    );
};

export default ProfileDetails;


