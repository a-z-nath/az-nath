import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Project, projects } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// Static cache that persists until manually invalidated
let cachedProjects: {projects: Project[], count: number, lastSync: string | null} | null = null;
let cacheTimestamp: string | null = null;

// Function to invalidate cache (to be called from sync endpoint)
export function invalidateProjectsCache() {
  cachedProjects = null;
  cacheTimestamp = null;
  console.log('Projects cache invalidated');
}

export async function GET() {
  try {
    // Return cached data if available
    if (cachedProjects && cacheTimestamp) {
      return NextResponse.json(cachedProjects, {
        headers: {
          'Cache-Control': 'public, s-maxage=31536000, immutable', // Cache for 1 year
          'X-Cache': 'HIT',
          'X-Cache-Time': cacheTimestamp,
        },
      });
    }

    console.log('Cache miss - fetching from database');

    // Optimized query: select only needed fields
    const featuredProjects = await db.select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      url: projects.url,
      homepage: projects.homepage,
      language: projects.language,
      stars: projects.stars,
      topics: projects.topics,
      createdAt: projects.createdAt,
      githubUpdatedAt: projects.githubUpdatedAt,
      updatedAt: projects.updatedAt,
      isFeatured: projects.isFeatured,
      displayOrder: projects.displayOrder,
    })
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(desc(projects.stars), desc(projects.githubUpdatedAt));

    // Optimize JSON parsing with error handling
    const projectsWithParsedTopics = featuredProjects.map(project => {
      let parsedTopics: string[] = [];
      try {
        parsedTopics = project.topics ? JSON.parse(project.topics) : [];
      } catch (e) {
        console.warn(`Failed to parse topics for project ${project.id}:`, e);
        parsedTopics = [];
      }

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        html_url: project.url,
        homepage: project.homepage,
        language: project.language,
        stargazers_count: project.stars,
        topics: parsedTopics,
        created_at: project.createdAt,
        updated_at: project.githubUpdatedAt || project.updatedAt,
        featured: project.isFeatured,
        display_order: project.displayOrder
      };
    });

    const response = {
      projects: projectsWithParsedTopics,
      count: featuredProjects.length,
      lastSync: featuredProjects[0]?.updatedAt || null
    };

    // Cache the result indefinitely
    cachedProjects = response;
    cacheTimestamp = new Date().toISOString();

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