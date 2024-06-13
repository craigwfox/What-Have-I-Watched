<script>
	// imports
	import { page } from '$app/stores';
	import MovieForm from '$lib/components/MovieForm.svelte';
	import { formatDate, tmdbPercent, parseJson } from '$lib/functions/utilities';

	// exports
	export let sessionStatus = $page.data.session ? true : false;
	export let data;

	// variables
	let { movie } = data;

	let slug = $page.params.slug;

	function openModal(e) {
		const modalId = e.target.getAttribute('data-modal');
		document.getElementById(modalId)?.show();
		document.querySelector('body')?.classList.add('modal-open');
	}

	function closeModal(e) {
		const modalId = e.target.getAttribute('data-modal');
		document.getElementById(modalId)?.close();
		document.querySelector('body')?.classList.remove('modal-open');
	}
</script>

<div class="movie-single wrapper">
	<h1>{movie.name}</h1>

	{#if sessionStatus}
		<div class="movie-update">
			<button
				on:click={openModal}
				data-modal="updateModal"
				type="button"
				class="btn btn-secondary btn-sm mbe-m">Update movie</button
			>
			<dialog id="updateModal">
				<button
					on:click={closeModal}
					data-modal="updateModal"
					type="button"
					class="btn btn-secondary btn-sm"
				>
					Close
				</button>
				<MovieForm
					editType="update"
					movieData={movie}
					slugCurrent={slug}
					formFunc="?/updateMovie"
				/>
			</dialog>
		</div>
	{/if}

	<div class="ms__grid">
		<div class="ms__watch">
			<div class="content-flow">
				<h2>Watch info</h2>
				<p class="movie-stat">
					<strong>Watched:</strong>
					{formatDate(movie.watch_date)}
				</p>
				<p class="movie-stat"><strong>Picked:</strong> {movie.picked}</p>
				<div class="mc__rating">
					<h3 class="movie-stat">Ratings</h3>
					{#if movie.rating_craig}
						{#if movie.rating_rebecca == null}
							<table>
								<thead>
									<tr>
										<th>Our rating</th>
										{#if movie.tmdb_user_score}
											<th>TMDB</th>
										{/if}
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{movie.rating_craig}</td>
										{#if movie.tmdb_user_score}
											<td>{movie.tmdb_user_score}</td>
										{/if}
									</tr>
								</tbody>
							</table>
						{:else}
							<table>
								<thead>
									<tr>
										<th>Craig</th>
										<th>Rebecca</th>
										{#if movie.tmdb_user_score}
											<th>TMDB</th>
										{/if}
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{movie.rating_craig}</td>
										<td>{movie.rating_rebecca}</td>
										{#if movie.tmdb_user_score}
											<td>{movie.tmdb_user_score}</td>
										{/if}
									</tr>
								</tbody>
							</table>
						{/if}
					{/if}
				</div>
			</div>
			{#if movie.poster_path}
				<img
					src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
					alt={`Movie poster for ${movie.name}`}
					width="500"
					loading="lazy"
				/>
			{/if}
		</div>

		<div class="ms__movie content-flow">
			<h2>Movie info</h2>

			{#if movie.release_date}
				<h3 class="movie-stat">Release date</h3>
				<p>{formatDate(movie.release_date)}</p>
			{/if}

			{#if movie.genre}
				<h3 class="movie-stat">Genres</h3>
				<ul class="genres">
					{#each parseJson(movie.genre) as genre}
						<li>{genre}</li>
					{/each}
				</ul>
			{/if}

			{#if movie.overview}
				<h3 class="movie-stat">Overview</h3>
				<p>{movie.overview}</p>
			{/if}

			<h3 class="movie-stat">Cast and Crew</h3>

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
	</div>
</div>
