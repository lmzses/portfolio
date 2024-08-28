// src/routes/blog/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface BlogPost {
	id: string;
	title: string;
	date: string;
	description: string;
	html_url: string;
	filename: string;
	slug: string;
	raw_url: string;
}

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		// Fetch all blog posts
		const response = await fetch('/api/blog/posts');
		if (!response.ok) {
			throw new Error('Failed to fetch blog posts');
		}
		const blogPosts: BlogPost[] = await response.json();

		// Find the specific post by slug
		const post = blogPosts.find((p) => p.slug === params.slug);

		if (!post) {
			throw error(404, 'Blog post not found');
		}

		// Fetch the raw content of the post
		const contentResponse = await fetch(post.raw_url);
		if (!contentResponse.ok) {
			throw new Error('Failed to fetch blog post content');
		}
		const content = await contentResponse.text();

		return { post, content };
	} catch (err) {
		console.error('Error loading blog post:', err);
		throw error(500, 'Failed to load blog post');
	}
};
