<script>
	import MovieCard from '$lib/components/MovieCard.svelte';

	export let data;
	let { movies } = data;
	$: ({ movies } = data);

	// sort movies by most recent watch date
	movies.sort((a, b) => {
		return new Date(b.watch_date) - new Date(a.watch_date);
	});

	function checkForSlug(slug) {
		if (slug) return true;
		return false;
	}
</script>

<div class="movie-card-grid">
	{#each movies as movie}
		<MovieCard {movie} />
	{/each}
</div>
