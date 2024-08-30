<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */

	const carta = new Carta({
		sanitizer: false
	});
	let value = '# Welcome to the Markdown Editor\n\nStart typing your content here...';
</script>

<MarkdownEditor {carta} mode="tabs" bind:value title="Markdown Editor" />

<style>
	/* Set your monospace font (Required to have the editor working correctly!) */
	:global(.carta-font-code) {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 1.1rem;
		line-height: 1.5;
	}

	:global(.carta-editor) {
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
