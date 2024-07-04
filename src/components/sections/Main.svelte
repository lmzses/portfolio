<script>
	import LogoX from 'carbon-icons-svelte/lib/LogoX.svelte';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';

	let links = [
		{
			name: 'X',
			href: 'https://x.com/Lzmses',
			icon: LogoX
		},
		{
			name: 'Github',
			href: 'http://github.com/lmzses',
			icon: LogoGithub
		}
	];
</script>

<section id="home" class="py-10 text-center scroll-m-16">
	<div class="my-4">
		<a
			href="/"
			class="text-center py-2 text-gray-200 mx-auto border-gray-700 px-4 rounded-full border w-fit h-auto bg-slate-800"
		>
			Available for work
		</a>
	</div>
	<h1
		class="block antialiased tracking-normal font-sans font-semibold text-gray-200 mb-4 lg:text-5xl text-3xl"
	>
		Welcome to my personal portfolio
	</h1>
	<p class="text-lg text-gray-300 text-balance">
		I'm a web developer who loves to build stuff. Passionate about technology and coding. Building
		with next.js, svelte, tailwind.css, etc.
	</p>
	<div class="py-4 justify-center text-gray-300 flex flex-row gap-2 flex-wrap">
		{#each links as link, index (link.name)}
			<a href={link.href} class="text-lg rounded-full p-2 bg-slate-800"
				><svelte:component this={link.icon} size={24} /></a
			>
		{/each}
	</div>
</section>
