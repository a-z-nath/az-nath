import { NextResponse } from 'next/server';
import { getCachedProjects } from '@/lib/sync';


export async function GET() {
  try {
    const {response, cacheTimestamp} = await getCachedProjects();
    console.log('Serving projects fetched at', cacheTimestamp);
    console.log('Projects:', response?.projects?.length);
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=31536000, immutable',
        'X-Cache': 'MISS',
        'X-Cache-Time': cacheTimestamp,
      },
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}