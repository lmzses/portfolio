<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import type { PageData } from './$types';

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
</script>

<svelte:head>
	<title>{post.title}</title>
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
