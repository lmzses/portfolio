<script>
	let footer_links = ['Home', 'About'];
</script>

<footer class="px-4 mt-6 w-full mx-auto container justify-center lg:max-w-4xl">
	<div
		class="rounded-lg w-full max-w-screen-xl mx-auto md:flex md:items-center md:justify-between py-4 px-6"
	>
		<div class="text-gray-200 mb-4">
			<p>Built by Lzmses in Svelte and tailwind.</p>
		</div>
		<div>
			<ul class="flex flex-row flex-wrap gap-2">
				{#each footer_links as link}
					<li>
						<a
							href={`#${link.toLowerCase()}`}
							class="text-gray-300 hover:text-gray-400 hover:underline">{link}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</footer>
