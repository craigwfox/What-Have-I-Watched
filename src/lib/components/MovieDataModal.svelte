<script lang="ts">
	// imports
	import { slugify } from '$lib/functions/utilities';

	// exports
	export let movieData: object;
	export let formFunc: string;

	// get year from release date
	// input values
	let movieName = movieData.name;
	let watchDate = movieData.watch_date;
	let picked = movieData.picked;
	let ratingCraig = movieData.rating_craig;
	let ratingRebecca = movieData.rating_rebecca;
	let imdbId = movieData.imdb_id;
	let tmdbId = movieData.tmdb_id;
	let releaseDate = movieData.release_date;
	let directorList = movieData.director;
	let topCast = movieData.top_cast;
	let genreList = movieData.genre;
	let tmdbUserScore = movieData.tmdb_user_score;
	let posterPath = movieData.poster_path;
	let backdropPath = movieData.backdrop_path;
	let overview = movieData.overview;
	let collectionId = movieData.collection_id;
	let collectionName = movieData.collection_name;
	let movieId = movieData.id;
	let slug =
		movieData.slug != null
			? movieData.slug
			: slugify(movieName, new Date(releaseDate).getFullYear().toString());

	// functions
	function openModal() {
		const modal = document.querySelector('#movie-data-modal');
		modal.showModal();
	}

	function closeModal() {
		const modal = document.querySelector('#movie-data-modal');
		modal.close();
	}
</script>

<button on:click={openModal}>Update movie</button>
<dialog id="movie-data-modal">
	<button on:click={closeModal}>Close modal</button>
	<h2>Current movie data</h2>
	<form id="movie-data-form" method="POST" action={formFunc}>
		<fieldset>
			<legend>User data</legend>
			<div class="inputs inputs--grid">
				<div class="input-group">
					<label for="name">Name</label>
					<input type="text" name="name" id="name" bind:value={movieName} required />
				</div>
				<div class="input-group">
					<label for="watch_date">Watch date</label>
					<input type="date" name="watch_date" id="watch_date" bind:value={watchDate} required />
				</div>
				<div class="input-group">
					<label for="picked">Picked</label>
					<select name="picked" id="picked" bind:value={picked} required>
						<option value="NULL">None</option>
						<option value="Rebecca">Rebecca</option>
						<option value="Craig">Craig</option>
					</select>
				</div>
				<div class="input-group">
					<label for="rating_craig">Craig's rating</label>
					<select name="rating_craig" id="rating_craig" bind:value={ratingCraig} required>
						<option value="Great">Great</option>
						<option value="Good">Good</option>
						<option value="Ok">Ok</option>
						<option value="Bad">Bad</option>
						<option value="The fuck">The fuck</option>
						<option value="Absolute trash">Absolute trash</option>
					</select>
				</div>
				<div class="input-group">
					<label for="rating_rebecca">Rebecca's rating</label>
					<select name="rating_rebecca" id="rating_rebecca" bind:value={ratingRebecca} required>
						<option value="Great">Great</option>
						<option value="Good">Good</option>
						<option value="Ok">Ok</option>
						<option value="Bad">Bad</option>
						<option value="The fuck">The fuck</option>
						<option value="Absolute trash">Absolute trash</option>
					</select>
				</div>
			</div>
		</fieldset>

		<fieldset>
			<legend>Data from TMDB</legend>

			<div class="grid">
				<input type="hidden" name="movieId" bind:value={movieId} />
				<div class="inputs">
					<div class="input-group">
						<label for="slug">Slug</label>
						<input required type="text" name="slug" id="slug" bind:value={slug} />
					</div>
					<div class="input-group">
						<label for="imdb_id">IMDB ID</label>
						<input required type="text" name="imdb_id" id="imdb_id" bind:value={imdbId} />
					</div>
					<div class="input-group">
						<label for="tmdb_id">TMDB ID</label>
						<input required type="text" name="tmdb_id" id="tmdb_id" bind:value={tmdbId} />
					</div>
					<div class="input-group">
						<label for="release_date">Release date</label>
						<input
							required
							type="text"
							name="release_date"
							id="release_date"
							bind:value={releaseDate}
						/>
					</div>
					<div class="input-group">
						<label for="director">Director</label>
						<input required type="text" name="director" id="director" bind:value={directorList} />
					</div>
					<div class="input-group">
						<label for="top_case">Top cast</label>
						<input required type="text" name="top_cast" id="top_case" bind:value={topCast} />
					</div>
					<div class="input-group">
						<label for="genre">Genre</label>
						<input required type="text" name="genre" id="genre" bind:value={genreList} />
					</div>
					<div class="input-group">
						<label for="tmdb_user_score">User Score</label>
						<input
							required
							type="text"
							name="tmdb_user_score"
							id="tmdb_user_score"
							bind:value={tmdbUserScore}
						/>
					</div>
					<div class="input-group">
						<label for="poster_path">Poster path</label>
						<input
							required
							type="text"
							name="poster_path"
							id="poster_path"
							bind:value={posterPath}
						/>
					</div>
					<div class="input-group">
						<label for="backdrop_path">Backdrop path</label>
						<input
							required
							type="text"
							name="backdrop_path"
							id="backdrop_path"
							bind:value={backdropPath}
						/>
					</div>
					<div class="input-group">
						<label for="overview">Overview</label>
						<textarea
							required
							name="overview"
							id="overview"
							bind:value={overview}
							cols="30"
							rows="10"
						/>
					</div>
				</div>
			</div>
		</fieldset>

		<button>Update movie</button>
	</form>
</dialog>

<style>
	fieldset {
		border: 0.3rem solid salmon;

		+ fieldset {
			margin-block-start: 2rem;
		}

		> legend {
			font-size: 2rem;
			font-weight: 700;
		}
	}

	.inputs {
		display: grid;
		gap: 1rem;
	}

	.inputs--grid {
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));

		*:first-child {
			grid-column: 1 / -1;
		}
	}

	.input-group {
		display: grid;
		gap: 0.2rem;

		> label {
			font-weight: 600;
		}

		> input,
		> select {
			height: 2.5rem;

			display: block;

			padding: 0.2rem 0.5rem;

			border: 1px solid hsl(0, 0%, 70%);
			border-radius: 0.2rem;
			background: hsl(0, 0%, 100%);

			font-size: 1.2rem;
			line-height: 1.5;
		}
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 'inputs list';
	}

	.grid > .inputs {
		grid-area: inputs;
	}
</style>
