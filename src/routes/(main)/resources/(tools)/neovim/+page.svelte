<script>
	import {
		Terminal,
		Download,
		Book,
		Star,
		Github,
		ExternalLink,
		Code,
		Cpu,
		Zap
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Icon from '@iconify/svelte';

	const features = [
		{
			icon: Cpu,
			title: 'Extensibility',
			description: 'Powerful plugin system with asynchronous execution and Lua integration.'
		},
		{
			icon: Terminal,
			title: 'Built-in Terminal',
			description: 'Integrated terminal emulator for seamless development workflow.'
		},
		{
			icon: Zap,
			title: 'Performance',
			description: 'Optimized for speed and efficiency, even with multiple plugins.'
		}
	];

	const resources = [
		{
			href: 'https://github.com/rockerBOO/awesome-neovim',
			text: 'Awesome Neovim - A curated list of Neovim plugins'
		},
		{ href: 'https://neovim.io/doc/user/', text: 'Neovim User Manual' },
		{
			href: 'https://www.youtube.com/watch?v=ctH-a-1eUME',
			text: 'Neovim Full Course - Free on YouTube'
		},
		{ href: 'https://github.com/neovim/neovim', text: 'Neovim GitHub Repository' }
	];

	let activeTab = 'install';
</script>

<svelte:head>
	<title>Neovim - Hyper-extensible Vim-based Text Editor</title>
	<meta
		name="description"
		content="Neovim: A hyper-extensible Vim-based text editor for efficient coding and editing. Learn about its features, installation, and usage."
	/>
	<meta
		name="keywords"
		content="Neovim, text editor, Vim, coding, extensible, terminal emulator, Lua API"
	/>
	<meta name="author" content="Neovim Community" />
	<meta property="og:title" content="Neovim - Hyper-extensible Vim-based Text Editor" />
	<meta
		property="og:description"
		content="Discover Neovim, a powerful and extensible text editor for efficient coding and editing."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://neovim.io/" />
	<meta property="og:image" content="https://neovim.io/images/logo@2x.png" />
</svelte:head>

<div>
	<header class="py-16">
		<div class="max-w-2xl mx-auto">
			<div class="flex flex-col md:flex-row items-center justify-between gap-8">
				<div>
					<h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Neovim</h1>
					<p class="text-xl max-w-2xl">
						A hyper-extensible Vim-based text editor for efficient coding and editing.
					</p>
				</div>
				<Icon icon="devicon:neovim" class="w-32 h-32 md:w-48 md:h-48" />
			</div>
		</div>
	</header>

	<main class="max-w-2xl mx-auto py-16">
		<section class="mb-16">
			<h2 class="text-3xl font-bold mb-6">About Neovim</h2>
			<p class="text-lg text-muted-foreground mb-4">
				Neovim is a fork of Vim that focuses on extensibility and usability. It's designed to be a
				better Vim than Vim, offering modern features like asynchronous plugins, a built-in terminal
				emulator, and an extensive Lua API for customization.
			</p>
			<div class="flex flex-wrap gap-4">
				<Button href="https://github.com/neovim/neovim/releases/latest">
					<Download class="mr-2 h-4 w-4" /> Download Neovim
				</Button>
				<Button variant="outline" href="https://neovim.io/doc/">
					<Book class="mr-2 h-4 w-4" /> Documentation
				</Button>
			</div>
		</section>

		<section class="mb-16">
			<h2 class="text-3xl font-bold mb-6">Key Features</h2>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature}
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<svelte:component this={feature.icon} class="h-5 w-5 text-primary" />
								{feature.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>{feature.description}</CardDescription>
						</CardContent>
					</Card>
				{/each}
			</div>
		</section>

		<section class="mb-16 prose lg:prose-lg">
			<h2 class="text-3xl font-bold mb-6">Getting Started</h2>
			<Tabs bind:value={activeTab}>
				<TabsList>
					<TabsTrigger value="install">Installation</TabsTrigger>
					<TabsTrigger value="config">Basic Configuration</TabsTrigger>
					<TabsTrigger value="usage">Basic Usage</TabsTrigger>
				</TabsList>
				<TabsContent value="install">
					<ol class="list-decimal list-inside space-y-2 text-lg">
						<li>
							Visit the <a
								href="https://github.com/neovim/neovim/releases/latest"
								class="text-primary hover:underline">Neovim releases page</a
							>.
						</li>
						<li>Download the appropriate version for your operating system.</li>
						<li>Install Neovim following the instructions for your OS.</li>
						<li>
							Verify installation by running <code class="bg-muted px-1 py-0.5 rounded"
								>nvim --version</code
							> in your terminal.
						</li>
					</ol>
				</TabsContent>
				<TabsContent value="config">
					<ol class="list-decimal list-inside space-y-2 text-lg">
						<li>
							Create a configuration file at <code class="bg-muted px-1 py-0.5 rounded"
								>~/.config/nvim/init.vim</code
							>
							(or <code class="bg-muted px-1 py-0.5 rounded">~/.config/nvim/init.lua</code> for Lua).
						</li>
						<li>
							Add basic settings like <code class="bg-muted px-1 py-0.5 rounded">set number</code> to
							show line numbers.
						</li>
						<li>Install a plugin manager like vim-plug or packer.nvim.</li>
						<li>Start adding plugins and customizing your configuration.</li>
					</ol>
				</TabsContent>
				<TabsContent value="usage">
					<ul class="list-disc list-inside space-y-2 text-lg">
						<li>
							Open Neovim by typing <code class="bg-muted px-1 py-0.5 rounded">nvim</code> in your terminal.
						</li>
						<li>
							Use <code class="bg-muted px-1 py-0.5 rounded">i</code> to enter insert mode,
							<code class="bg-muted px-1 py-0.5 rounded">Esc</code> to return to normal mode.
						</li>
						<li>
							Save files with <code class="bg-muted px-1 py-0.5 rounded">:w</code>, quit with
							<code class="bg-muted px-1 py-0.5 rounded">:q</code>, or save and quit with
							<code class="bg-muted px-1 py-0.5 rounded">:wq</code>.
						</li>
						<li>
							Learn more commands and features by running <code class="bg-muted px-1 py-0.5 rounded"
								>:help</code
							> within Neovim.
						</li>
					</ul>
				</TabsContent>
			</Tabs>
		</section>

		<section class="bg-primary/5 rounded-lg">
			<h2 class="text-3xl font-bold mb-6">Additional Resources</h2>
			<ul class="space-y-4">
				{#each resources as resource}
					<li>
						<a href={resource.href} class="flex items-center text-primary hover:underline">
							<ExternalLink class="mr-2 h-4 w-4" />
							{resource.text}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</main>
</div>
