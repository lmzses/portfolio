<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<!-- head content -->
	<title>Portfolio</title>
</svelte:head>

<div
	class="absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-gradient-to-b from-slate-900 to-zinc-800"
></div>
<Header />
<main class="px-4 w-full flex flex-col gap-y-16 mx-auto container lg:max-w-4xl md:max-w-2xl">
	<slot />
</main>
<Footer />
