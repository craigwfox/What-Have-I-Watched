<script lang="ts">
	// imports
	import { page } from '$app/stores';
	import { slugify } from '$lib/functions/utilities';
	import MovieForm from '$lib/components/MovieForm.svelte';

	// exports
	export let sessionStatus = $page.data.session ? true : false;
	export let form;

	// variables
	let { movie } = {};

	let slug = '';
</script>

{#if sessionStatus}
	<section aria-labelledby="title-add-movie" class="wrapper">
		<h1 id="title-add-movie">Add a new movie</h1>
		{#if form?.movieExists}
			<h2>Movie already exists</h2>
			<p>
				View existing entry for <a href={'/movie/' + form?.existingMovie.slug}
					>{form?.existingMovie.name}</a
				>
				<br />Try adding <a href="/add-movie">another movie</a>
			</p>
		{:else if form?.newMovieAdded}
			<h2>Movie added</h2>
			<p>
				View your new entry for <a href={'/movie/' + form?.newMovie.slug}>{form?.newMovie.name}</a>
				<br />Or add <a href="/add-movie">another movie</a>
			</p>
		{:else}
			<MovieForm editType="new" movieData={movie} slugCurrent={slug} formFunc="?/addMovie" />
		{/if}
	</section>
{/if}
