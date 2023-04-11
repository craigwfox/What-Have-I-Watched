<script lang="ts">
	import { formatDate, tmdbPercent, parseJson } from '$lib/functions/utilities';

	export let data;
	let { movie } = data;
</script>

<h1>{movie.name}</h1>
<p>{movie.overview}</p>

<h2>Our data</h2>
<p>Watched on: <time>{formatDate(movie.watch_date)}</time></p>
{#if movie.picked}
	<p>Picked by: {movie.picked}</p>
{/if}

<h3 id="title-ratings">Our Ratings</h3>
<table aria-labelledby="title-ratings">
	<thead>
		<tr>
			<th>Craig</th>
			<th>Rebecca</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="rating-{movie.rating_craig.toLowerCase()}">{movie.rating_craig}</td>
			<td class="rating-{movie.rating_rebecca.toLowerCase()}">{movie.rating_rebecca}</td>
		</tr>
	</tbody>
</table>

<h2>Movie data</h2>
<p>Release date: {formatDate(movie.release_date)}</p>
<p>TMDB user score: {tmdbPercent(movie.tmdb_user_score)}</p>

<h3>Directors</h3>
<ul>
	{#each parseJson(movie.director) as director}
		<li>{director}</li>
	{/each}
</ul>

<h3>Top Cast</h3>
<ul>
	{#each parseJson(movie.top_cast) as cast}
		<li>{cast}</li>
	{/each}
</ul>

<h3>Genres</h3>
<ul>
	{#each parseJson(movie.genre) as genre}
		<li>{genre}</li>
	{/each}
</ul>
