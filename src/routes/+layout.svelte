<script>
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import Header from '../components/Header.svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';

	// Inject
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<!-- head content -->
	<title>Portfolio</title>
</svelte:head>

<div class="min-h-screen w-full bg-background text-foreground font-sans">
	<Header />
	<main class="container mx-auto px-4 py-16">
		<slot />
	</main>
	<Footer />
</div>
