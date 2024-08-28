<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { ChevronRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	$: ({ blogPosts, error } = data);
</script>

<svelte:head>
	<title>Blog Posts</title>
</svelte:head>
<section id="blog" class="max-w-2xl mx-auto mb-16">
	<h1 class="text-4xl font-bold mb-8">Blog</h1>
	{#if error}
		<p class="text-red-500">{error}</p>
	{:else if blogPosts.length === 0}
		<p>No blog posts found.</p>
	{:else}
		<div class="space-y-8">
			{#each blogPosts as post}
				<Card class="overflow-hidden transition-all hover:shadow-md">
					<CardHeader>
						<CardTitle class="text-2xl">{post.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-muted-foreground mb-4">{post.description}</p>
						<div class="flex justify-between items-center text-sm text-muted-foreground">
							<span>{new Date(post.date).toLocaleDateString()}</span>
						</div>
						<Button variant="ghost" class="mt-4 group" href="/blog/{post.slug}">
							Read More
							<ChevronRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</CardContent>
				</Card>
			{/each}
		</div>
	{/if}
</section>

<style>
	/* Any additional styles can go here */
</style>
