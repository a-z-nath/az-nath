import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const featuredProjects = await db.select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(desc(projects.stars), desc(projects.githubUpdatedAt));

    // Parse topics JSON for each project
    const projectsWithParsedTopics = featuredProjects.map(project => ({
      ...project,
      topics: project.topics ? JSON.parse(project.topics) : []
    }));

    return NextResponse.json({
      projects: projectsWithParsedTopics,
      count: featuredProjects.length,
      lastSync: featuredProjects[0]?.updatedAt || null
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}