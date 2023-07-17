<script>
	import { parseJson } from '$lib/functions/utilities';

	// get movie data from supabase
	export let data;
	let { movies } = data;
	$: ({ movies } = data);
	let genreList = null;
	// most watched genre
	function getGenres() {
		let genreObj = {};

		for (const movie in movies) {
			const index = parseInt(movie);
			const genresArr = parseJson(movies[index].genre);
			if (genresArr != null) {
				genresArr.forEach((genre) => {
					if (genreObj[genre.toLowerCase()]) {
						genreObj[genre.toLowerCase()][1] += 1;
					} else {
						genreObj[genre.toLowerCase()] = [genre, 1];
					}
				});
			}
		}

		return genreObj;
	}
	function sortGenres() {
		const genreObj = getGenres();
		console.log(genreObj);
	}
	sortGenres();

	// Top 5 Actors
	// Top 5 Directors
</script>

<div class="wrapper">
	<h1>Stats</h1>

	<h2>Genres</h2>
	<ul>
		<!-- {#each Object.entries(genreList) as [key, genre]}
			<li />
		{/each} -->
	</ul>
</div>
