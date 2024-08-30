<script>
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	// Inject
</script>

<svelte:head>
	<!-- head content -->
	<title>Portfolio</title>
</svelte:head>

<div class="min-h-screen w-full bg-background text-foreground font-sans">
	<Header />
	<main class="container mx-auto px-4">
		<slot />
	</main>
	<Footer />
</div>
