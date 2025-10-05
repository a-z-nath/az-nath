import { NextRequest, NextResponse } from 'next/server';
import { syncWithGitHub } from '@/lib/sync';
import { invalidateProjectsCache } from '../projects/route';

export async function POST(request: NextRequest) {
  try {
    // Check for authorization
    const authHeader = request.headers.get('authorization');
    const expectedToken = `Bearer ${process.env.SYNC_TOKEN}`;
    
    if (!authHeader || authHeader !== expectedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Perform sync
    const result = await syncWithGitHub();
    
    if (result.success) {
      // Invalidate projects cache after successful sync
      invalidateProjectsCache();
      
      return NextResponse.json({
        message: 'Sync completed successfully',
        stats: result.stats,
        cacheInvalidated: true
      });
    } else {
      return NextResponse.json(
        {
          message: 'Sync failed',
          error: result.error
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Sync endpoint error:', error);
    return NextResponse.json(
      {
        message: 'Sync failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Allow GET for testing
export async function GET() {
  return NextResponse.json({
    message: 'Sync endpoint is working. Use POST with authorization to sync.',
    endpoints: {
      sync: 'POST /api/sync',
      projects: 'GET /api/projects'
    }
  });
}