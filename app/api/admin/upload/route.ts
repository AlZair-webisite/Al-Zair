import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No image file provided' },
        { status: 400 }
      );
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'tc24lvqs';
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '764585948448438';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || '2KsXkUMman5siZgrjweAtthSqEI';

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

    // Create Cloudinary upload signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const strToSign = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(strToSign).digest('hex');

    // Prepare upload payload
    const uploadFormData = new FormData();
    uploadFormData.append('file', base64Image);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp.toString());
    uploadFormData.append('signature', signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );

    const data = await uploadRes.json();

    if (!uploadRes.ok || data.error) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || 'Cloudinary upload failed',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url || data.url,
      publicId: data.public_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to upload image to Cloudinary' },
      { status: 500 }
    );
  }
}
