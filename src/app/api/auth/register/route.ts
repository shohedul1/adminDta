import connent from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { error } from "console";


export const POST = async (req: NextRequest) => {
    const { name, email, password } = await req.json();

    await connent();
    const isExistiong = await User.findOne({ email });

    if (isExistiong) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "User already existis"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    if(!hashedPassword){
        return NextResponse.json({
            success: false,
            error: true,
            message: "Password not match"
        });
    }

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (err) {
        return NextResponse.json({
            message: err,
            status: 500,
        });
    }





}