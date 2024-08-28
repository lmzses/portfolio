// src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';

interface BlogPost {
	id: string;
	title: string;
	date: string;
	description: string;
	html_url: string;
	filename: string;
	slug: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/blog/posts');
		if (!response.ok) {
			throw new Error('Failed to fetch blog posts');
		}
		const blogPosts: BlogPost[] = await response.json();
		return { blogPosts };
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return {
			error: 'Failed to load blog posts',
			blogPosts: [] as BlogPost[]
		};
	}
};
