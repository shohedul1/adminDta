import connect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    await connect(); // Ensure the database is connected

    const id = params.id;
    console.log(id);

    try {
        const user = await User.findById(id).select("-password -__v");

        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "GET error", status: 500 });
    }
}


export async function PATCH(request: NextRequest, { params }: { params: Params }) {
    await connect(); // Ensure the database is connected

    const id = params.id;

    try {
        const body = await request.json();
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({
                status: false,
                success: false,
                message: "Your updata profile not exits"

            })
        }

        const updateUser = await User.findByIdAndUpdate(
            user?._id,
            body,
            { new: true }
        )
        return NextResponse.json(updateUser, { status: 200 });


    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "GET error", status: 500 });
    }
}
