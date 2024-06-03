
'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const initialState = {
    email: "",
    password: ""
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState(initialState);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            router.push('/'); // Redirect if already logged in
        }
    }, [session, router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signIn("credentials", {
                email: state.email,
                redirect: false,
                password: state.password,
            });

        } catch (error) {
            // Display error toast message
            toast.error("Error occurred while signing in");
            console.log(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Toaster />
            <div className="p-3 md:p-4 mt-20">
                <div className="w-full max-w-sm bg-black m-auto flex rounded-md flex-col p-4">
                    <h1 className="text-2xl text-white text-center">Login your account</h1>
                    <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={state.email}
                            placeholder="enter your email"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500"
                            autoComplete="email"
                        />

                        <label htmlFor="password" className="text-white">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                type={showPassword ? "text" : "password"}
                                onChange={handleChange}
                                value={state.password}
                                name="password"
                                placeholder="enter your password"
                                className="w-full bg-slate-200 border-none outline-none placeholder:text-green-500"
                                autoComplete="current-password"
                            />
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
                        >
                            Login
                        </button>
                        <span className="text-center text-white text-2xl">or</span>
                        <button onClick={() => signIn("google")} className="bg-white p-2 text-xl flex items-center gap-2 justify-center rounded-md">
                            <FcGoogle className="w-8 h-8" />
                            Google
                        </button>
                    </form>

                    <p className="text-left text-sm mt-2 text-white">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-red-500 underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}


