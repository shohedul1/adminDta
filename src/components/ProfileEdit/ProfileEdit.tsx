'use client';

import { deletePhoto } from "@/actions/uploadActions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

// Define the shape of the profile state
interface Profile {
    name: string;
    email: string;
    avatar?: { url: string; id?: string };
    age?: string;
    designation?: string;
    location?: string;
    about?: string;
    [key: string]: any; // To allow additional properties
}

// Define the props for the component
interface ProfileEditProps {
    profile: Profile;
    params: { id: string };
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, params }) => {
    const CLOUD_NAME = "djhjt07rh";
    const UPLOAD_PRESET = "nextjs_blog_images";

    const [profileToEdit, setProfileToEdit] = useState<Profile>(profile);
    const [avatarToEdit, setAvatarToEdit] = useState<File | null>(null);

    const { data: session, status } = useSession();
    const router = useRouter();

    const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, designation, age, location, about, email } = profileToEdit;

        if (!name) {
            toast.error("Name is required");
            return;
        }

        if (avatarToEdit) {
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (avatarToEdit.size > maxSize) {
                toast.error("File size is too large. Please select a file under 2MB");
                return;
            }
        }

        try {
            let profileImg; // Default to existing image
            if (avatarToEdit) {
                profileImg = await uploadImage(); // Upload new image
                if (profile?.avatar?.id) {
                    await deletePhoto(profile?.avatar?.id); // Delete existing image
                }
            } else {
                profileImg = profile?.avatar;
            }

            const updateUser = {
                name,
                designation,
                age,
                location,
                about,
                avatar: profileImg
            };

            const response = await fetch(`/api/user/${params.id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(updateUser)
            });

            if (response.ok) {
                toast.success("User updated successfully");
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 500);
            } else {
                toast.error("Error occurred while updating user.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Cloudinary image upload
    const uploadImage = async () => {
        if (!avatarToEdit) return;

        const formData = new FormData();
        formData.append('file', avatarToEdit);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            const image = {
                id: data['public_id'],
                url: data['secure_url']
            };
            return image;
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelUploadImage = () => {
        setAvatarToEdit(null);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = event.target;

        if (type === 'file' && files) {
            setAvatarToEdit(files[0]);
        } else {
            setProfileToEdit((preState) => ({ ...preState, [name]: value }));
        }
    };

    if (!profile) {
        return <p>Access Denied.</p>;
    }

    const inputStyle = "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500";

    return (
        <>
            <Toaster />
            <div className="px-5 lg:px-20 my-5 ">
                <div>
                    <form onSubmit={handleEditSubmit}>
                        <h2 className="text-5xl text-center pb-20 ">Profile Update</h2>
                        {avatarToEdit ? (
                            <div className="flex justify-center items-start">
                                <Image
                                    src={URL.createObjectURL(avatarToEdit)}
                                    alt="avatar"
                                    width={0}
                                    height={0}
                                    property="true"
                                    sizes="100vw"
                                    className="w-20 h-20 rounded-full border-2 border-black"
                                />
                                <button type="button" className="text-red-700" onClick={handleCancelUploadImage}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                {profile.avatar && profile.avatar.url && (
                                    <div>
                                        <Image
                                            src={profile?.avatar?.url || "/food_18.png"}
                                            alt="avatar"
                                            width={0}
                                            property="true"
                                            height={0}
                                            sizes="100vw"
                                            className="w-20 h-20 rounded-full border-2 border-black"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <div>
                            <input
                                onChange={handleChange}
                                type="file"
                                name='newImage'
                                accept='image/*'
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Name</label>
                            <input
                                type="text"
                                placeholder="name"
                                name="name"
                                onChange={handleChange}
                                value={profileToEdit.name || ""}
                                className={inputStyle}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Designation</label>
                            <input
                                type="text"
                                placeholder="designation"
                                name="designation"
                                onChange={handleChange}
                                value={profileToEdit.designation || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">About</label>
                            <input
                                type="text"
                                placeholder="about"
                                name="about"
                                onChange={handleChange}
                                value={profileToEdit.about || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Age</label>
                            <input
                                type="text"
                                placeholder="age"
                                name="age"
                                onChange={handleChange}
                                value={profileToEdit.age || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Location</label>
                            <input
                                type="text"
                                placeholder="location"
                                name="location"
                                onChange={handleChange}
                                value={profileToEdit.location || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="space-x-5 pt-5">
                            <button type='submit' className='px-3 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white'>
                                Edit
                            </button>
                            <Link href={"/profile"} className='px-3 py-2 rounded-full border border-red-500 hover:bg-red-500 hover:text-white'>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default ProfileEdit;
