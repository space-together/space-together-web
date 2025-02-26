"use server"
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary under a specified folder.
 * @param {string} imagePath - The local path of the image to upload.
 * @param {string} folder - The Cloudinary folder where the image will be stored.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
const uploadToCloudinary = async (imagePath: string, folder: string): Promise<string> => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(imagePath, { folder });
        return secure_url;
    } catch (error) {
        console.error(`Error uploading image to Cloudinary (${folder}):`, error);
        throw new Error(`Failed to upload image to ${folder}`);
    }
};

export const uploadSymbolToCloudinary = (imagePath: string) => uploadToCloudinary(imagePath, 'symbols');
export const uploadProfilesToCloudinary = (imagePath: string) => uploadToCloudinary(imagePath, 'profiles');
