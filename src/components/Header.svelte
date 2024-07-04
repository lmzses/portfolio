<script>
	let navItems = ['Projects', 'Skills', 'About'];
</script>

<header
	class="bg-slate-700 bg-opacity-60 backdrop-blur-md px-4 py-2 sticky top-2 w-[90%] mx-auto rounded-full z-50"
>
	<nav class="flex justify-between items-center w-full mx-auto container lg:max-w-4xl md:max-w-2xl">
		<a class="text-gray-200 text-xl font-bold" href="/">Lzmses</a>
		<ul class="flex space-x-4 items-center">
			{#each navItems as item}
				<li>
					<a
						href="#{item.toLowerCase()}"
						class="hover:text-blue-500 text-gray-300 text-sm font-normal">{item}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
