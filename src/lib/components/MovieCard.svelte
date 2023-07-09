<script lang="ts">
	// imports
	import MovieLink from '$lib/components/MovieLink.svelte';
	import { formatDate } from '$lib/functions/utilities';

	// exports
	export let movie: object;
</script>

<article class="movie-card" aria-labelledby={movie.id}>
	{#if movie.poster_path}
		<MovieLink className="mc__title" movieData={movie}>
			<img
				src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
				alt={`Movie poster for ${movie.name}`}
				width="500"
				loading="lazy"
			/>
		</MovieLink>
	{/if}
	<div>
		<MovieLink className="mc__title" movieData={movie}>
			<h2 id={movie.id}>{movie.name}</h2>
		</MovieLink>

		<p class="mc__picked movie-stat"><strong>Picked:</strong> {movie.picked}</p>
		<p class="mc__date movie-stat"><strong>Watched:</strong> {formatDate(movie.watch_date)}</p>

		<div class="mc__rating">
			{#if movie.rating_craig}
				{#if movie.rating_rebecca == null}
					<p class="movie-stat"><strong>Rating:</strong> {movie.rating_craig}</p>
				{:else}
					<h3 class="movie-stat">Our Ratings</h3>
					<table>
						<thead>
							<tr>
								<th>Craig</th>
								<th>Rebecca</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{movie.rating_craig}</td>
								<td>{movie.rating_rebecca}</td>
							</tr>
						</tbody>
					</table>
				{/if}
			{/if}
		</div>
	</div>
</article>
