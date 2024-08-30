<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { ExternalLink } from 'lucide-svelte';

	export let resource: any;
</script>

<div
	class="break-inside-avoid bg-card text-card-foreground rounded-lg border shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
>
	<div class="p-6">
		<div class="flex items-center space-x-4 mb-4">
			<div class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
				<svelte:component this={resource.icon} class="h-6 w-6 text-primary" />
			</div>
			<h3 class="text-lg font-semibold">{resource.title}</h3>
		</div>
		<p class="text-muted-foreground mb-4">{resource.description}</p>
		<div class="flex flex-wrap gap-2 mb-4">
			{#each resource.tags as tag}
				<Badge variant="secondary">
					{tag}
				</Badge>
			{/each}
		</div>
		<a
			href={resource.link}
			class="inline-flex items-center text-sm font-medium text-primary hover:underline"
		>
			Learn more
			<ExternalLink class="ml-1 h-4 w-4" />
		</a>
	</div>
</div>
