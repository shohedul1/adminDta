'use client';

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const initialState = {
    name: "",
    email: "",
    password: ""
}

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password } = state;

        if (!name) {
            return toast.error("Name is required");
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long.");
        }

        try {
            setIsLoading(true);
            const newUser = { name, email, password };
            const response = await fetch("/api/auth/register", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                toast.success("Registration Successful");
                setTimeout(() => {
                    window.location.reload()
                    router.push("/login");
                }, 1000);
            } else {
                const data = await response.json();
                toast.error(data.message || "Error occurred while registering");
            }
        } catch (error) {
            toast.error("Error occurred while registering");
            console.log(error);
        } finally {
            setIsLoading(false);
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
                    <h1 className="text-2xl text-white text-center">Register your account</h1>
                    <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            autoComplete="current-name"
                            value={state.name}
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500"
                        />
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="current-email"
                            onChange={handleChange}
                            value={state.email}
                            placeholder="Enter your email"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500"
                        />
                        <label htmlFor="password" className="text-white">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={handleChange}
                                autoComplete="current-password"
                                value={state.password}
                                placeholder="Enter your password"
                                className="w-full bg-slate-200 border-none outline-none placeholder:text-green-500"
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
                            {isLoading ? "Loading" : "Sign up"}
                        </button>
                    </form>
                    <button onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-white p-2 text-xl flex items-center gap-2 justify-center rounded-md">
                        <FcGoogle className="w-8 h-8" />
                        Google
                    </button>
                    <p className="text-left text-sm mt-2 text-white">
                        Already have an account?{" "}
                        <Link href="/login" className="text-red-500 underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
