import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  homepage: string | null;
  updated_at: string;
}

export async function syncWithGitHub() {
  try {
    console.log('Starting GitHub sync...');
    
    // Fetch featured repos from GitHub
    const response = await fetch(
      'https://api.github.com/search/repositories?q=user:a-z-nath+topic:featured',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const githubRepos: GitHubRepo[] = data.items;

    console.log(`Found ${githubRepos.length} featured repos on GitHub`);

    const syncResults = {
      created: 0,
      updated: 0,
      errors: [] as string[]
    };

    // Sync each repository
    for (const repo of githubRepos) {
      try {
        const projectData = {
          name: repo.name,
          description: repo.description || '',
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          topics: JSON.stringify(repo.topics || []),
          homepage: repo.homepage,
          githubUpdatedAt: repo.updated_at,
          isFeatured: repo.topics?.includes('featured') || false,
          updatedAt: new Date().toISOString()
        };

        // Check if project exists
        const existingProject = await db.select()
          .from(projects)
          .where(eq(projects.id, repo.id))
          .limit(1);

        if (existingProject.length > 0) {
          // Update existing project
          await db.update(projects)
            .set(projectData)
            .where(eq(projects.id, repo.id));
          syncResults.updated++;
        } else {
          // Create new project
          await db.insert(projects).values({
            id: repo.id,
            ...projectData,
            createdAt: new Date().toISOString()
          });
          syncResults.created++;
        }

      } catch (error) {
        console.error(`Error syncing repo ${repo.name}:`, error);
        syncResults.errors.push(`${repo.name}: ${error}`);
      }
    }

    // Mark projects as not featured if they're no longer in GitHub results
    const githubIds = githubRepos.map(repo => repo.id);
    if (githubIds.length > 0) {
      await db.update(projects)
        .set({ isFeatured: false })
        .where(eq(projects.isFeatured, true));
      
      // Re-mark the current ones as featured
      for (const id of githubIds) {
        await db.update(projects)
          .set({ isFeatured: true })
          .where(eq(projects.id, id));
      }
    }

    console.log('Sync completed:', syncResults);

    return {
      success: true,
      stats: {
        ...syncResults,
        total: githubRepos.length
      }
    };

  } catch (error) {
    console.error('GitHub sync failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}