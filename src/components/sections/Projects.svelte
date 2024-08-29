<!-- Projects.svelte -->
<script>
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink } from 'lucide-svelte';
	import Icon from '@iconify/svelte';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	let tags = {
		SVELTE: {
			name: 'Svelte',
			styles: 'bg-orange-200 text-orange-600',
			icon: 'vscode-icons:file-type-svelte'
		},
		ASTRO: {
			name: 'Astro',
			styles: 'bg-zinc-800 text-white',
			icon: 'vscode-icons:file-type-astro'
		},
		TAILWIND: {
			name: 'Tailwind',
			styles: 'bg-[#003159] text-white',
			icon: 'vscode-icons:file-type-tailwind'
		},
		TYPESCRIPT: {
			name: 'Typescript',
			styles: 'bg-blue-200 text-blue-600',
			icon: 'vscode-icons:file-type-typescript-official'
		}
	};

	let projects = [
		{
			title: 'CognitoAI',
			image: '/images/cognita-ai.png', // placeholder image
			description: 'A minimalist collection of web and AI tools. Built using Astro and Tailwind. ',
			tech: [tags.ASTRO, tags.TAILWIND],
			githubLink: 'https://github.com/lmzses/CognitoAI',
			liveLink: 'https://cognito-ai.vercel.app/'
		},
		{
			title: 'Portfolio',
			image: '/images/portfolio-image.jpg', // placeholder image
			description:
				'Simple personal portfolio design. Built from scratch using SvelteKit and Tailwind, from my phone.',
			tech: [tags.SVELTE, tags.TAILWIND, tags.TYPESCRIPT],
			githubLink: 'https://github.com/lmzses/portfolio',
			liveLink: 'https://lmzses.vercel.app'
		}
		// Add more projects as needed
	];
</script>

<section id="projects" class="max-w-2xl mx-auto scroll-m-16 mb-16">
	<h2 class="text-3xl font-semibold mb-8">My Projects</h2>
	<div class="flex flex-col gap-8">
		{#each projects as project}
			<Card class="flex flex-col sm:flex-row gap-2 rounded-lg overflow-hidden sm:gap-6">
				<CardHeader class="w-full md:w-1/2">
					<div
						class="relative flex flex-col items-center col-span-6 row-span-5 gap-8 transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl lg:border lg:border-gray-800 lg:hover:border-gray-700 lg:hover:bg-gray-800/50"
					>
						<img
							src={project.image}
							alt={project.title}
							class="object-cover object-top w-full h-56 transition duration-500 sm:h-full md:scale-110 md:group-hover:scale-105"
						/>
					</div>
				</CardHeader>
				<CardContent class="w-full md:w-1/2 md:max-w-lg">
					<h3 class="text-xl font-semibold mb-2">{project.title}</h3>
					<div class="flex flex-wrap my-2">
						<ul class="flex flex-row gap-2">
							{#each project.tech as tag}
								<li>
									<span
										class={`flex gap-x-2 rounded-full text-sm ${tag.styles} items-center py-1 px-2.5 font-normal`}
									>
										<Icon icon={tag.icon} class="size-4" />
										{tag.name}
									</span>
								</li>
							{/each}
						</ul>
					</div>
					<p class="mb-4">{project.description}</p>
					<div class="flex justify-between w-full">
						<Button variant="ghost" size="sm" class="group">
							View Project
							<ExternalLink class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>
</section>
