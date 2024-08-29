<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let data: PageData;

	$: ({ post, content, readTime } = data);

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

	function getDescription(content: string, maxLength = 160) {
		// Remove markdown syntax
		const strippedContent = content
			.replace(/[#*`_~\[\]()]/g, '') // Remove common markdown characters
			.replace(/!\[.*?\]\(.*?\)/g, '') // Remove image syntax
			.replace(/\[.*?\]\(.*?\)/g, '') // Remove link syntax
			.replace(/\n+/g, ' ') // Replace newlines with spaces
			.trim();
		return strippedContent.length > maxLength
			? strippedContent.slice(0, maxLength - 3) + '...'
			: strippedContent;
	}
	$: description = getDescription(processedContent);
	$: ogImageUrl = `/og-image?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(description)}&author=${encodeURIComponent(post.author.username || 'Lmzses')}&date=${encodeURIComponent(new Date(post.date).toLocaleDateString())}&readTime=${encodeURIComponent(readTime)}`;
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
	<meta property="og:site_name" content="Your Site Name" />
	<meta property="article:published_time" content={new Date(post.date).toISOString()} />
	<meta property="article:author" content={post.author.username} />
	{#each post.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@YourTwitterHandle" />
	<meta name="twitter:creator" content="@AuthorTwitterHandle" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

<section id="blog-post" class="max-w-2xl mx-auto mb-16">
	<article>
		<header class="mb-8">
			<h1 class="text-3xl font-bold mb-2">{post.title}</h1>
			<div class="flex items-center space-x-4 mb-6">
				<Avatar>
					<AvatarImage src={post?.author?.avatar_url} alt={post.author.username} />
					<AvatarFallback>Lmz</AvatarFallback>
				</Avatar>
				<div>
					<p class="text-sm font-medium">{post.author.username}</p>
					<p class="text-sm text-muted-foreground">
						{new Date(post.date).toLocaleDateString()} • {readTime} min to read
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-2 mb-4">
				{#each post.tags as tag}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>
		</header>

		<div class="prose prose-lg">
			{@html htmlContent}
		</div>
	</article>
</section>
<div class="max-w-3xl mx-auto flex justify-between">
	<Button variant="ghost" size="sm" href="/blog">
		<ChevronLeft class="mr-2 h-4 w-4" />
		Go back to blog
	</Button>
</div>

<style>
	:global(.prose) {
		max-width: none;
	}
</style>
