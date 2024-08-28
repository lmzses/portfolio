<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ post, content } = data);

	function processFrontmatter(content: string) {
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
		const match = content.match(frontmatterRegex);
		if (match) {
			const frontmatter = match[1];
			const contentWithoutFrontmatter = content.slice(match[0].length);
			return { frontmatter, content: contentWithoutFrontmatter };
		}
		return { frontmatter: '', content };
	}

	$: ({ content: processedContent } = processFrontmatter(content));
	$: htmlContent = marked(processedContent);

	// Function to generate a short description from the content
	function getDescription(content: string, maxLength = 160) {
		const strippedContent = content.replace(/<[^>]*>/g, '');
		return strippedContent.length > maxLength
			? strippedContent.slice(0, maxLength - 3) + '...'
			: strippedContent;
	}

	$: description = getDescription(processedContent);
	$: ogImageUrl = `/og-image?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(description)}&author=${encodeURIComponent(post?.author || 'Lmzses')}&date=${encodeURIComponent(new Date(post.date).toLocaleDateString())}&readTime=${encodeURIComponent('5')}`;
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImageUrl} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content={post.title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogImageUrl} />
</svelte:head>

<section id="blog-post" class="max-w-2xl mx-auto mb-16">
	<article>
		<header class="mb-8">
			<h1 class="text-3xl font-bold mb-2">{post.title}</h1>
			<p class="text-gray-600 mb-2">{new Date(post.date).toLocaleDateString()}</p>
			<div class="flex flex-wrap gap-2 mb-4">
				{#each post.tags as tag}
					<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
						>{tag}</span
					>
				{/each}
			</div>
		</header>

		<div class="prose prose-lg">
			{@html htmlContent}
		</div>
	</article>

	<div class="mt-8">
		<a href="/blog" class="text-blue-500 hover:underline">&larr; Back to all posts</a>
	</div>
</section>

<style>
	:global(.prose) {
		max-width: none;
	}
</style>
