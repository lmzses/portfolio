<script>
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import '../app.css';

	// Inject
	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
