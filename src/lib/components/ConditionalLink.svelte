<script lang="ts">
	export let isWrapped = false;
	export let href: string;
</script>

{#if isWrapped}
	<a {href}>
		<slot />
	</a>
{:else}
	<div>
		<slot />
	</div>
{/if}
