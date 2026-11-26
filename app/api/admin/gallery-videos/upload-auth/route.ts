import { createHmac, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

  if (!privateKey || !publicKey) {
    return NextResponse.json(
      {
        success: false,
        message: 'Configure IMAGEKIT_PRIVATE_KEY and NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY to upload videos.',
      },
      { status: 503 },
    );
  }

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 10 * 60;
  const signature = createHmac('sha1', privateKey)
    .update(`${token}${expire}`)
    .digest('hex');

  return NextResponse.json(
    { success: true, publicKey, token, expire, signature },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
