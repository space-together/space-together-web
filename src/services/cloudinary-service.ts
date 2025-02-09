import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_key,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (imagePath: string): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'symbols'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
};