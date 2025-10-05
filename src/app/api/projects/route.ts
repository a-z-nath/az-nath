import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const featuredProjects = await db.select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(desc(projects.stars), desc(projects.githubUpdatedAt));

    // Parse topics JSON and map database columns to expected interface
    const projectsWithParsedTopics = featuredProjects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      html_url: project.url, // Map 'url' to 'html_url'
      homepage: project.homepage,
      language: project.language,
      stargazers_count: project.stars, // Map 'stars' to 'stargazers_count'
      topics: project.topics ? JSON.parse(project.topics) : [],
      created_at: project.createdAt,
      updated_at: project.githubUpdatedAt || project.updatedAt,
      featured: project.isFeatured,
      display_order: project.displayOrder
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