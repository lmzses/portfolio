// src/routes/api/blog-posts/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_GITHUB_TOKEN } from '$env/static/private';

interface GistFile {
	filename: string;
	raw_url: string;
}

interface Gist {
	id: string;
	description: string;
	html_url: string;
	files: { [key: string]: GistFile };
	created_at: string;
	updated_at: string;
	owner: {
		login: string;
		avatar_url: string;
	};
}

async function fetchGistContent(url: string): Promise<string> {
	const response = await fetch(url, {
		headers: {
			Authorization: `token ${VITE_GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3.raw'
		}
	});
	if (!response.ok) {
		throw new Error('Failed to fetch gist content');
	}
	// Fetch the first 1500 characters to ensure we get all frontmatter
	const reader = response.body?.getReader();
	const decoder = new TextDecoder();
	let content = '';
	if (reader) {
		const { value, done } = await reader.read();
		content = decoder.decode(value).slice(0, 1500);
		reader.cancel();
	}
	return content;
}

function extractMetadata(content: string): {
	title: string;
	description: string;
	date: string;
	tags: string[];
} {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
	const match = content.match(frontmatterRegex);
	let title = 'Untitled';
	let date = 'No date';
	let description = '';
	let tags: string[] = [];

	if (match) {
		const frontmatter = match[1];
		const titleMatch = frontmatter.match(/title:\s*"(.+?)"/);
		const descriptionMatch = frontmatter.match(/description:\s*"(.+?)"/);
		const dateMatch = frontmatter.match(/date:\s*(\d{4}-\d{2}-\d{2})/);
		const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);

		if (titleMatch) title = titleMatch[1];
		if (dateMatch) date = dateMatch[1];
		if (tagsMatch) {
			tags = tagsMatch[1].split(',').map((tag) => tag.trim().replace(/"/g, ''));
		}
		if (descriptionMatch) description = descriptionMatch[1];
	}

	return { title, description, date, tags };
}

function createSlug(filename: string): string {
	return filename
		.replace(/\.[^/.]+$/, '')
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

export const GET: RequestHandler = async () => {
	if (!VITE_GITHUB_TOKEN) {
		return json({ error: 'GitHub token not configured' }, { status: 500 });
	}

	try {
		let url = 'https://api.github.com/gists';
		let allGists: Gist[] = [];

		while (url) {
			const response = await fetch(url, {
				headers: {
					Authorization: `token ${VITE_GITHUB_TOKEN}`,
					Accept: 'application/vnd.github+json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch gists');
			}

			const gists: Gist[] = await response.json();
			allGists = [...allGists, ...gists];
			const linkHeader = response.headers.get('Link');
			url = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || '';
		}

		const blogPostPromises = allGists
			.filter((gist) => gist.description.toLowerCase().startsWith('blog_post'))
			.map(async (gist) => {
				const fileKey = Object.keys(gist.files)[0];
				const file = gist.files[fileKey];
				const content = await fetchGistContent(file.raw_url);
				const { title, description, date, tags } = extractMetadata(content);

				return {
					id: gist.id,
					title,
					date,
					description,
					slug: createSlug(file.filename),
					tags,
					raw_url: file.raw_url,
					author: {
						username: gist.owner.login,
						avatar_url: gist.owner.avatar_url
					}
				};
			});

		const blogPosts = await Promise.all(blogPostPromises);

		blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return json(blogPosts);
	} catch (error) {
		console.error('Error fetching gists:', error);
		return json({ error: 'Failed to fetch blog posts' }, { status: 500 });
	}
};
