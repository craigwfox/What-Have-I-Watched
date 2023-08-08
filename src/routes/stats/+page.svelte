<script>
	import { parseJson } from '$lib/functions/utilities';

	// get movie data from supabase
	export let data;
	let { movies } = data;
	$: ({ movies } = data);
	let genreList = createList('genre');
	let directorList = createList('director');
	let actorList = createList('top_cast');
	// console.log(actorList);

	// sort objects
	function getTopList(obj, count = 10) {
		return Object.fromEntries(
			Object.entries(obj)
				.sort(([, a], [, b]) => b[1] - a[1])
				.slice(0, count)
		);
	}

	// most watched genre
	function createList(key) {
		let newObj = {};

		for (const movie in movies) {
			const index = parseInt(movie);
			const tempArr = parseJson(movies[index][key]);
			if (tempArr != null) {
				tempArr.forEach((item) => {
					if (newObj[item.toLowerCase()]) {
						newObj[item.toLowerCase()][1] += 1;
					} else {
						newObj[item.toLowerCase()] = [item, 1];
					}
				});
			}
		}

		return newObj;
	}
</script>

<div class="wrapper">
	<h1>Stats</h1>

	<h2>Top 5 Genres</h2>
	<ol>
		{#each Object.entries(getTopList(genreList, 5)) as [key, genre]}
			<li><strong>{genre[0]}</strong>: {genre[1]} movies</li>
		{/each}
	</ol>

	<h2>Top 10 Actors</h2>
	<ol>
		{#each Object.entries(getTopList(actorList)) as [key, actor]}
			<li><strong>{actor[0]}</strong>: {actor[1]} movies</li>
		{/each}
	</ol>

	<h2>Top 10 Directors</h2>
	<ol>
		{#each Object.entries(getTopList(directorList)) as [key, director]}
			<li><strong>{director[0]}</strong>: {director[1]} movies</li>
		{/each}
	</ol>
</div>
