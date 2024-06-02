"use server";

import { v2 as cloudinary } from "cloudinary";

// Configuration for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_API_SECRET as string,
});

// Define the type for the response of the delete operation
interface DeletePhotoResponse {
    result?: string;
    errMessage?: string;
}

// Define the deletePhoto function
export async function deletePhoto(public_id: string): Promise<DeletePhotoResponse> {
    try {
        // Use cloudinary's v2 uploader to delete the photo
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error: any) {
        console.error(error);
        return { errMessage: error.message };
    }
}
