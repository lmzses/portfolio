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
	author: {
		username: string;
		avatar_url: string;
	};
	tags: [];
}

interface LoadResult {
	post: BlogPost;
	content: string;
	readTime: number;
}

export const load: PageServerLoad = async ({ params, fetch }): Promise<LoadResult> => {
	try {
		const blogPosts = await fetchBlogPosts(fetch);
		const post = findPostBySlug(blogPosts, params.slug);
		const content = await fetchPostContent(post.raw_url, fetch);
		const readTime = calculateReadTime(content);
		return { post, content, readTime };
	} catch (err) {
		console.error('Error loading blog post:', err);
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'An unexpected error occurred');
	}
};

async function fetchBlogPosts(fetch: typeof globalThis.fetch): Promise<BlogPost[]> {
	const response = await fetch('/api/blog/posts');
	if (!response.ok) {
		throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
	}
	return response.json();
}

function findPostBySlug(posts: BlogPost[], slug: string): BlogPost {
	const post = posts.find((p) => p.slug === slug);
	if (!post) {
		throw error(404, 'Blog post not found');
	}
	return post;
}

async function fetchPostContent(rawUrl: string, fetch: typeof globalThis.fetch): Promise<string> {
	const response = await fetch(rawUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch blog post content: ${response.statusText}`);
	}
	return response.text();
}

function calculateReadTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}
