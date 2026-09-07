/**
 * Cloudinary Helper Configuration
 * Cloud Name: tc24lvqs
 */

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'tc24lvqs',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '764585948448438',
};

/**
 * Helper to upload image directly to Cloudinary via unsigned/signed preset or direct upload
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // or custom upload preset configured in Cloudinary

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to upload image to Cloudinary');
  }

  const data = await res.json();
  return data.secure_url;
}
