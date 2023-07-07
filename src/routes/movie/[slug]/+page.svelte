<script lang="ts">
	// imports
	import { page } from '$app/stores';
	import MovieForm from '$lib/components/MovieForm.svelte';
	import { slugify, formatDate, tmdbPercent, parseJson } from '$lib/functions/utilities';

	// exports
	export let sessionStatus = $page.data.session ? true : false;
	export let data;

	// variables
	let { movie } = data;

	let slug = $page.params.slug;
</script>

{#if sessionStatus}
	<MovieForm editType="update" movieData={movie} slugCurrent={slug} formFunc="?/updateMovie" />
{:else}
	<a href="/login">Login</a>
{/if}

<div class="movie-data">
	<h1>{movie.name}</h1>

	<h2>Watch info</h2>

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

	<h2>Movie info</h2>

	{#if movie.genre}
		<div class="genres">
			<p>Genres</p>
			<ul>
				{#each parseJson(movie.genre) as genre}
					<li>{genre}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if movie.overview}
		<p>{movie.overview}</p>
	{/if}

	<h3>Cast and Crew</h3>

	{#if movie.release_date}
		<p>Release date: {formatDate(movie.release_date)}</p>
	{/if}

	{#if movie.director}
		<h4>Directors</h4>
		<ul>
			{#each parseJson(movie.director) as director}
				<li>{director}</li>
			{/each}
		</ul>
	{/if}

	{#if movie.top_cast}
		<h4>Top Cast</h4>
		<ul>
			{#each parseJson(movie.top_cast) as cast}
				<li>{cast}</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	/* .movie-data {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}

	.movie-data > h1 {
		grid-column: 1 / -1;
	} */

	h2:not(h1 + h2) {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid lightgrey;
	}

	.genres {
	}

	.genres > p {
		font-weight: 700;
	}

	.genres > ul {
		display: flex;

		padding: 0;

		list-style: none;
	}

	.genres li {
		margin-right: 0;
	}

	.genres li + li::before {
		content: ',';

		padding-right: 0.3rem;
	}
</style>
