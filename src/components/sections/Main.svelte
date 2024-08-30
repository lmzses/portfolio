<script>
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
</script>

<section class="max-w-2xl mx-auto py-16 mb-16">
	<h1 class="text-4xl font-bold mb-4">Hey, I'm Lmses 👋</h1>
	<p class="text-xl text-muted-foreground mb-6">
		I'm a web developer who loves to build stuff. Passionate about technology and coding. Building
		with next.js, svelte, tailwind css, etc.
	</p>
	<p class="text-muted-foreground mb-6">
		When I'm not coding, you can find me exploring new tech, playing video games, or watching
		videos.
	</p>
	<div class="flex space-x-2">
		<Button variant="outline" size="icon" class="rounded-lg" href="https://x.com/lmzses">
			<Icon icon="tabler:brand-x" class="h-4 w-4" />
		</Button>
		<Button variant="outline" size="icon" class="rounded-lg" href="https://github.com/lmzses/">
			<Icon icon="tabler:brand-github" class="h-4 w-4" />
		</Button>
	</div>
</section>
