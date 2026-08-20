import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify this request actually came from Medusa (Basic Auth or Secret Header)
    const secret = request.headers.get('x-medusa-signature');
    
    // In production, you would compare 'secret' against your environment variable
    // if (secret !== process.env.MEDUSA_WEBHOOK_SECRET) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    const payload = await request.json();
    
    // 2. Revalidate the entire product catalog and homepage instantly
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/products/[id]', 'page');

    console.log(`✅ Cache invalidated successfully. Triggered by Medusa Event: ${payload.type || 'Manual'}`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating cache' }, { status: 500 });
  }
}
