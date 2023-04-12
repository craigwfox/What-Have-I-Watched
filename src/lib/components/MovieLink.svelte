<script lang="ts">
	import { slugify } from '$lib/functions/utilities';

	export let movieData: object;
</script>

{#if movieData.slug}
	<a href="/movie/{movieData.slug}?id={movieData.id}">
		<slot />
	</a>
{:else}
	<a href="/movie/{slugify(movieData.name)}?id={movieData.id}">
		<slot />
	</a>
{/if}
