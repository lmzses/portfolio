// src/routes/api/og-image/+server.js
import { generateOgImage } from '$lib/generateOgImage';

export async function GET({ url }) {
	const title = url.searchParams.get('title') || 'Default Title';
	const description = url.searchParams.get('description') || 'Default Description';
	const author = url.searchParams.get('author') || 'Anonymous';
	const date = url.searchParams.get('date') || 'January 1, 2024';
	const readTime = url.searchParams.get('readTime') || '5';

	const pngBuffer = await generateOgImage({ title, description, author, date, readTime });

	return new Response(pngBuffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
}
