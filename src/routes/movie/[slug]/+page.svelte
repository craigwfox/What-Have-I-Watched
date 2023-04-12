<script lang="ts">
	// imports
	import { page } from '$app/stores';
	import MovieDataModal from '$lib/components/MovieDataModal.svelte';
	import { slugify } from '$lib/functions/utilities';
	import { formatDate, tmdbPercent, parseJson } from '$lib/functions/utilities';

	// exports
	export let sessionStatus = $page.data.session ? true : false;
	export let data;

	// variables
	let { movie } = data;
</script>

{#if sessionStatus}
	<MovieDataModal movieData={movie} formFunc="?/updateMovie" />
{/if}

<h1>{movie.name}</h1>
{#if movie.genre}
	<p>Genres</p>
	<ul>
		{#each parseJson(movie.genre) as genre}
			<li>{genre}</li>
		{/each}
	</ul>
{/if}

{#if movie.overview}
	<p>{movie.overview}</p>
{/if}

<p>Watched on: <time>{formatDate(movie.watch_date)}</time></p>

{#if movie.picked}
	<p>Picked by: {movie.picked}</p>
{/if}

<table aria-label="Movie ratings">
	<thead>
		<tr>
			{#if movie.rating_craig && movie.rating_rebecca}
				<th>Craig</th>
				<th>Rebecca</th>
			{:else}
				<th>Our Rating</th>
			{/if}
			{#if movie.tmdb_user_score}
				<th>TMDB Score</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="rating-{movie.rating_craig.toLowerCase()}">{movie.rating_craig}</td>
			<td class="rating-{movie.rating_rebecca.toLowerCase()}">{movie.rating_rebecca}</td>
			{#if movie.tmdb_user_score}
				<td>{tmdbPercent(movie.tmdb_user_score)}</td>
			{/if}
		</tr>
	</tbody>
</table>

<h2>Cast and Crew</h2>

{#if movie.release_date}
	<p>Release date: {formatDate(movie.release_date)}</p>
{/if}

{#if movie.genre}
	<h3>Directors</h3>
	<ul>
		{#each parseJson(movie.director) as director}
			<li>{director}</li>
		{/each}
	</ul>
{/if}

{#if movie.genre}
	<h3>Top Cast</h3>
	<ul>
		{#each parseJson(movie.top_cast) as cast}
			<li>{cast}</li>
		{/each}
	</ul>
{/if}
