<script>
	export let data;
	let { movies } = data;
	$: ({ movies } = data);

	// sort movies by most recent watch date
	movies.sort((a, b) => {
		return new Date(b.watch_date) - new Date(a.watch_date);
	});
</script>

<div class="grid">
	{#each movies as movie}
		<article class="movie-card" aria-labelledby={movie.id}>
			{#if movie.backdrop_path}
				<img
					src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
					alt={`Movie poster for ${movie.name}`}
					loading="lazy"
				/>
			{/if}
			<div class="flow">
				<h2 id={movie.id}>{movie.name}</h2>
				<ul>
					<li>Watch date: {movie.watch_date}</li>
					<li>IMDB ID: {movie.imdb_id}</li>
					{#if movie.rating_craig}
						{#if movie.rating_rebecca == null}
							<li>Rating: {movie.rating_craig}</li>
						{:else}
							<li>Craig Rating: {movie.rating_craig}</li>
							<li>Rebecca Rating: {movie.rating_becca}</li>
						{/if}
					{/if}
					{#if movie.picked}
						<li>Picked by: {movie.picked}</li>
					{/if}
				</ul>
			</div>
		</article>
	{/each}
</div>
