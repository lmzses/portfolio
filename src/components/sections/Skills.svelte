<script>
	import Icon from '@iconify/svelte';

	let tags = {
		JS: {
			name: 'Javascript',
			styles: 'bg-yellow-200 text-yellow-800',
			icon: 'vscode-icons:file-type-js-official'
		},
		TS: {
			name: 'Typescript',
			styles: 'bg-blue-200 text-blue-600',
			icon: 'vscode-icons:file-type-typescript-official'
		},
		ASTRO: {
			name: 'Astro',
			styles: 'bg-zinc-800 text-white',
			icon: 'vscode-icons:file-type-astro'
		},
		SVELTE: {
			name: 'Svelte',
			styles: 'bg-orange-200 text-orange-600',
			icon: 'vscode-icons:file-type-svelte'
		},
		NEXT: {
			name: 'Next.js',
			styles: 'bg-black text-white',
			icon: 'logos:nextjs-icon'
		},
		TAILWIND: {
			name: 'Tailwind',
			styles: 'bg-[#003159] text-white',
			icon: 'vscode-icons:file-type-tailwind'
		},
		GIT: {
			name: 'Git',
			styles: 'bg-red-200 text-red-600',
			icon: 'vscode-icons:file-type-git'
		}
	};
	let skills = [tags.JS, tags.TS, tags.NEXT, tags.ASTRO, tags.SVELTE, tags.TAILWIND, tags.GIT];
</script>

<section id="skills" class="scroll-m-16 mb-4">
	<div class="container mx-auto px-6">
		<h2 class="text-gray-200 font-semibold text-2xl">Skills</h2>
		<p class="text-lg text-gray-400 pt-4 pb-6">
			Here is a list of the technolgolies and tools I use in the daily basis.
		</p>
		<ul class="flex flex-row flex-wrap gap-2">
			{#each skills as tag}
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
</section>
