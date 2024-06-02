// Import necessary modules
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import connect from "@/lib/db";

// Define signInCallback function
async function signInCallback({ user, account }: { user: any; account: any }) {
    if (account?.provider === "google") {
        try {
            const { name, email } = user;
            await connect();
            const ifUserExists = await User.findOne({ email });
            if (ifUserExists) {
                return user;
            }
            const newUser = new User({
                name: name,
                email: email,
                password: 'somePassword', // Include a default password here
            });
            const res = await newUser.save();
            if (res.status === 200 || res.status === 201) {
                console.log(res);
                return user;
            }

        } catch (err) {
            console.log(err);
        }
    }
    return user;
}

// Define authOptions
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                try {
                    await connect();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const passwordsMatch = await bcryptjs.compare(
                        password,
                        user.password
                    );
                    if (!passwordsMatch) {
                        throw new Error("Password not found");
                    }
                    return user;
                } catch (error) {
                    console.log("Error:", error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        signIn: signInCallback, // Use the signInCallback function here
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }
            console.log(session);
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: "/",
    },
};