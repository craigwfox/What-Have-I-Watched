<script>
	import { page } from '$app/stores';
	import { slugify } from '$lib/functions/utilities';
	export let sessionStatus = $page.data.session ? true : false;

	let idMovieList = null;

	// input values
	let movieName = 'Swiss army';
	let watchDate = '2023-04-11';
	let picked = 'Craig';
	let ratingCraig = 'Great';
	let ratingRebecca = 'Good';
	let imdbId = '';
	let tmdbId = '';
	let releaseDate = '';
	let directorList = '';
	let topCast = '';
	let genreList = '';
	let tmdbUserScore = '';
	let posterPath = '';
	let backdropPath = '';
	let overview = '';
	let collectionId = '';
	let collectionName = '';
	$: slug = slugify(movieName);

	// fetch movie list
	function getMovieList() {
		// encode movie name
		const encodedMovieName = encodeURI(movieName);

		// fetch movie list
		fetch(`/api/movie-search?language=en-US&query=${encodedMovieName}&page=1`)
			.then((response) => response.json())
			.then((data) => {
				idMovieList = data.results;
			});
	}

	// modal open function
	function openMoviesModal() {
		const modal = document.getElementById('modal_add_movie');

		if (movieName !== '') {
			getMovieList();
			modal.hidden = false;
		} else {
			alert('Please enter a movie name');
		}
	}

	// modal close function
	function closeMoviesModal() {
		const modal = document.getElementById('modal_add_movie');

		modal.hidden = true;
	}

	function setMovieValues(movie) {
		movieName = movie.title;
		imdbId = movie.imdb_id;
		tmdbId = movie.id;
		releaseDate = movie.release_date;
		tmdbUserScore = movie.vote_average;
		overview = movie.overview;

		// loop genres and push to list
		let genreArry = [];
		movie.genres.forEach((genre) => {
			genreArry.push(genre.name);
		});
		genreList = genreArry.toString();

		if (movie.poster_path) {
			posterPath = movie.poster_path;
		}
		if (movie.backdrop_path) {
			backdropPath = movie.backdrop_path;
		}
		if (movie.belong_to_collection) {
			collectionId = movie.belong_to_collection.id;
			collectionName = movie.belong_to_collection.name;
		}
	}

	async function getMovieData(movieInput) {
		// get single movie base data
		await fetch(`/api/single-movie?language=en-US&id=${movieInput.id}&page=1`)
			.then((response) => response.json())
			.then((data) => {
				setMovieValues(data);
				// return data;
			});

		// get single movie credits
		await fetch(`/api/single-movie-credits?id=${movieInput.id}`)
			.then((response) => response.json())
			.then((data) => {
				// Get director list
				let directorArry = [];
				data.crew
					.filter(({ job }) => job === 'Director')
					.forEach((person) => {
						directorArry.push(person.name);
					});
				directorList = directorArry.toString();

				// get top cast list
				let castArry = [];
				data.cast
					.filter(({ order }) => order < 9)
					.forEach((person) => {
						castArry.push(person.name);
					});
				topCast = castArry.toString();
			});
	}

	// select id
	function selectMovie(movieInput) {
		// Fetch movie data
		getMovieData(movieInput);
	}
</script>

{#if sessionStatus}
	<section aria-labelledby="title-add-movie">
		<h2 id="title-add-movie">Add a new movie</h2>
		<form method="POST" action="?/addMovie">
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

				<button type="button" on:click={openMoviesModal}>Fetch data</button>

				<div class="grid">
					{#if idMovieList && movieName !== ''}
						<div id="modal_add_movie" class="movie-list" hidden>
							<h3>Choose your movie</h3>
							<ul>
								{#each idMovieList as movie}
									<li class="movie-item">
										<h4>{movie.title}</h4>
										<p>{movie.release_date}</p>
										{#if movie.poster_path}
											<img
												src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
												alt={movie.title}
											/>
										{/if}
										<button
											type="button"
											on:click={() => {
												selectMovie(movie);
												closeMoviesModal();
											}}
										>
											Use this movie
										</button>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
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

			<button>Add movie</button>
		</form>
	</section>
{/if}

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
