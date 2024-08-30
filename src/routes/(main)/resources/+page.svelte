<script>
	import { Book, Wrench, Lightbulb, ExternalLink, Search, Mail } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import ResourceCard from './components/resource-card.svelte';

	let searchTerm = '';
	let activeTab = 'all';

	const allResources = [
		{
			icon: Wrench,
			title: 'Neovim',
			description: 'A powerful, extensible terminal based text editor.',
			link: '/resources/neovim',
			tags: ['Editor', 'Development'],
			category: 'tools'
		},
		{
			icon: Wrench,
			title: 'Termux',
			description: 'A powerful terminal emulator and Linux environment for Android.',
			link: '/resources/termux',
			tags: ['Terminal', 'Android', 'Development'],
			category: 'tools'
		}
	];

	$: filteredResources = allResources.filter(
		(resource) =>
			resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);
</script>

<svelte:head>
	<title>Resources | Lmzses</title>
	<meta
		name="description"
		content="Explore a curated collection of tutorials, tools, and resources to help you on your web development journey."
	/>
	<meta property="og:title" content="Resources | Your Website Name" />
	<meta
		property="og:description"
		content="Explore a curated collection of tutorials, tools, and resources to help you on your web development journey."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://yourwebsite.com/resources" />
	<meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Resources | Your Website Name" />
	<meta
		name="twitter:description"
		content="Explore a curated collection of tutorials, tools, and resources to help you on your web development journey."
	/>
	<meta name="twitter:image" content="https://yourwebsite.com/og-image.jpg" />
</svelte:head>

<div id="resources" class="max-w-2xl mx-auto py-16 mb-16">
	<div>
		<h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Resources 🚀</h1>
		<p class="text-xl text-muted-foreground max-w-2xl">
			Explore a curated collection of tutorials, tools, and resources to help you on your web
			development journey.
		</p>
	</div>

	<div class="mx-auto py-12">
		<div class="mb-8">
			<div class="relative">
				<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search resources..."
					class="pl-10 max-w-md"
					bind:value={searchTerm}
				/>
			</div>
		</div>

		<Tabs bind:value={activeTab} class="mb-12">
			<TabsList class="w-full flex flex-row justify-between">
				<TabsTrigger value="all">All Resources</TabsTrigger>
				<TabsTrigger value="tutorials">Tutorials</TabsTrigger>
				<TabsTrigger value="tools">Tools</TabsTrigger>
				<TabsTrigger value="other">Other</TabsTrigger>
			</TabsList>
			<TabsContent value="all">
				<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
					{#each filteredResources as resource (resource.title)}
						<ResourceCard {resource} />
					{/each}
				</div>
			</TabsContent>
			<TabsContent value="tutorials">
				<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
					{#each filteredResources.filter((r) => r.category === 'tutorials') as resource (resource.title)}
						<!-- Same resource card structure as above -->
						<ResourceCard {resource} />
					{/each}
				</div>
			</TabsContent>
			<TabsContent value="tools">
				<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
					{#each filteredResources.filter((r) => r.category === 'tools') as resource (resource.title)}
						<!-- Same resource card structure as above -->
						<ResourceCard {resource} />
					{/each}
				</div>
			</TabsContent>
			<TabsContent value="other">
				<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
					{#each filteredResources.filter((r) => r.category === 'other') as resource (resource.title)}
						<!-- Same resource card structure as above -->
						<ResourceCard {resource} />
					{/each}
				</div>
			</TabsContent>
		</Tabs>
	</div>
</div>
