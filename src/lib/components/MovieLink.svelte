<script lang="ts">
	import { slugify } from '$lib/functions/utilities';
	export let movieData: object;
	export let className: String;
</script>

{#if movieData.slug}
	<a class={className} href="/movie/{movieData.slug}">
		<slot />
	</a>
{:else}
	<a class={className} href="/movie/{slugify(movieData.name)}?id={movieData.id}">
		<slot />
	</a>
{/if}
