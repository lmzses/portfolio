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
			icon: Terminal,
			title: 'Linux Environment',
			description: 'Run a full-fledged Linux environment on your Android device.'
		},
		{
			icon: Code,
			title: 'Package Management',
			description: 'Access to a wide range of Linux packages through APT.'
		},
		{
			icon: Zap,
			title: 'Development Tools',
			description: 'Compile and run various programming languages directly on your device.'
		}
	];

	const resources = [
		{
			href: 'https://wiki.termux.com/wiki/Main_Page',
			text: 'Termux Wiki - Comprehensive documentation and guides'
		},
		{ href: 'https://termux.com/community', text: 'Termux Community' },
		{
			href: 'https://www.youtube.com/results?search_query=termux+tutorial',
			text: 'Termux Tutorials on YouTube'
		},
		{ href: 'https://github.com/termux/termux-app', text: 'Termux GitHub Repository' }
	];

	let activeTab = 'install';
</script>

<svelte:head>
	<title>Termux - Terminal Emulator and Linux Environment for Android</title>
	<meta
		name="description"
		content="Termux: An Android terminal emulator and Linux environment app that works directly with no rooting or setup required."
	/>
	<meta
		name="keywords"
		content="Termux, Android, terminal emulator, Linux environment, command line, development tools"
	/>
	<meta name="author" content="Termux Community" />
	<meta
		property="og:title"
		content="Termux - Terminal Emulator and Linux Environment for Android"
	/>
	<meta
		property="og:description"
		content="Discover Termux, a powerful terminal emulator and Linux environment for Android devices."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://termux.com/" />
	<meta property="og:image" content="https://termux.com/images/logo.png" />
</svelte:head>

<div>
	<header class="py-16">
		<div class="max-w-2xl mx-auto">
			<div class="flex flex-col md:flex-row items-center justify-between gap-8">
				<div>
					<h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Termux</h1>
					<p class="text-xl max-w-2xl">
						Terminal emulator and Linux environment app for Android devices.
					</p>
				</div>
				<Icon icon="arcticons:termux" class="w-32 h-32 md:w-48 md:h-48" />
			</div>
		</div>
	</header>

	<main class="max-w-2xl mx-auto py-16">
		<section class="mb-16">
			<h2 class="text-3xl font-bold mb-6">About Termux</h2>
			<p class="text-lg text-muted-foreground mb-4">
				Termux is an Android terminal emulator and Linux environment app that works directly with no
				rooting or setup required. A minimal base system is installed automatically - additional
				packages are available using the APT package manager.
			</p>
			<div class="flex flex-wrap gap-4">
				<Button href="https://f-droid.org/en/packages/com.termux/">
					<Download class="mr-2 h-4 w-4" /> Download Termux
				</Button>
				<Button variant="outline" href="https://wiki.termux.com/wiki/Main_Page">
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
								href="https://f-droid.org/en/packages/com.termux/"
								class="text-primary hover:underline">F-Droid Termux page</a
							>.
						</li>
						<li>Download and install the Termux app on your Android device.</li>
						<li>Open Termux to start the initial setup process.</li>
						<li>
							Run <code class="bg-muted px-1 py-0.5 rounded">pkg update && pkg upgrade</code> to update
							the package lists and upgrade all packages.
						</li>
					</ol>
				</TabsContent>
				<TabsContent value="config">
					<ol class="list-decimal list-inside space-y-2 text-lg">
						<li>
							Edit the configuration file at <code class="bg-muted px-1 py-0.5 rounded"
								>~/.termux/termux.properties</code
							>.
						</li>
						<li>Customize terminal appearance, keyboard shortcuts, and other settings.</li>
						<li>
							Install additional packages using <code class="bg-muted px-1 py-0.5 rounded"
								>pkg install package-name</code
							>.
						</li>
						<li>Set up your preferred shell (e.g., Bash, Zsh) and configure it.</li>
					</ol>
				</TabsContent>
				<TabsContent value="usage">
					<ul class="list-disc list-inside space-y-2 text-lg">
						<li>Open Termux to access the command line interface.</li>
						<li>
							Use standard Linux commands like <code class="bg-muted px-1 py-0.5 rounded">ls</code>,
							<code class="bg-muted px-1 py-0.5 rounded">cd</code>, and
							<code class="bg-muted px-1 py-0.5 rounded">mkdir</code>.
						</li>
						<li>
							Install packages with <code class="bg-muted px-1 py-0.5 rounded"
								>pkg install package-name</code
							>.
						</li>
						<li>Run programming languages and development tools directly in Termux.</li>
						<li>
							Access the Termux wiki with <code class="bg-muted px-1 py-0.5 rounded"
								>termux-open-url https://wiki.termux.com</code
							>.
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
