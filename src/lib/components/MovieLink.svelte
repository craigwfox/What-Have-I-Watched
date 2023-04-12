<script lang="ts">
	import { slugify } from '$lib/functions/utilities';
	export let movieData: object;
</script>

{#if movieData.slug}
	<a href="/movie/{movieData.slug}">
		<slot />
	</a>
{:else}
	<a href="/movie/{slugify(movieData.name)}">
		<slot />
	</a>
{/if}
