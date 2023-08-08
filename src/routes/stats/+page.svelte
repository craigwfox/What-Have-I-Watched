<script>
	import { parseJson } from '$lib/functions/utilities';

	// get movie data from supabase
	export let data;
	let { movies } = data;
	$: ({ movies } = data);
	let genreList = createList('genre');
	let directorList = createList('director');
	let actorList = createList('top_cast');
	let picksList = {
		craig: {
			name: 'Craig',
			count: 0
		},
		rebecca: {
			name: 'Rebecca',
			count: 0
		}
	};
	let ratings = [
		['Great', 0, 0],
		['Good', 0, 0],
		['Ok', 0, 0],
		['Bad', 0, 0],
		['The fuck', 0, 0],
		['Absolute trash', 0, 0]
	];

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

	// get pick counts
	function getPickCount() {
		for (const movie in movies) {
			const index = parseInt(movie);
			const picked = movies[index].picked;

			if (picked != 'NULL' && picked != 'none' && picked != null) {
				if (picked === 'Craig') {
					picksList.craig.count += 1;
				} else if (picked === 'Rebecca') {
					picksList.rebecca.count += 1;
				}
			}
		}
	}
	getPickCount();

	// get rating average
	function getRatingAverage(ratingOne, ratingTwo) {
		const ratingArry = [
			['Great', 5],
			['Good', 4],
			['Ok', 3],
			['Bad', 2],
			['The fuck', 1],
			['Absolute trash', 0]
		];

		const ratingOneVal = ratingArry.findIndex(function (sub) {
			return sub.indexOf(ratingOne) !== -1;
		});
		const ratingTwoVal = ratingArry.findIndex(function (sub) {
			return sub.indexOf(ratingTwo) !== -1;
		});

		return Math.ceil((ratingOneVal + ratingTwoVal) / 2);
	}

	// get pick counts
	function getRatingsCount() {
		for (const movie in movies) {
			const index = parseInt(movie);
			const picked = movies[index].picked;

			if (picked != 'NULL' && picked != 'none' && picked != null) {
				if (picked === 'Craig') {
					ratings[
						getRatingAverage(movies[index].rating_craig, movies[index].rating_rebecca)
					][1] += 1;
				} else if (picked === 'Rebecca') {
					ratings[
						getRatingAverage(movies[index].rating_craig, movies[index].rating_rebecca)
					][2] += 1;
				}
			}
		}
	}
	getRatingsCount();
</script>

<div class="wrapper">
	<h1>Stats</h1>

	<section class="stats-section" aria-labelledby="movie-stats">
		<h2 id="movie-stats">Movie stats</h2>
		<div class="stats-grid">
			<div>
				<h3>Pick count</h3>
				<table>
					<thead>
						<tr>
							<th>Picked</th>
							<th>Count</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.values(picksList) as pick}
							<tr>
								<td>{pick.name}</td>
								<td>{pick.count}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div>
				<h3>Pick Ratings</h3>
				<table>
					<thead>
						<tr>
							<th>Rating</th>
							<th>Craig Count</th>
							<th>Rebecca Count</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.values(ratings) as rating}
							<tr>
								<td>{rating[0]}</td>
								<td>{rating[1]}</td>
								<td>{rating[2]}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<section class="stats-section" aria-labelledby="movie-stats">
		<h2 id="movie-stats">Movie stats</h2>
		<div class="stats-grid">
			<div>
				<h3>Top 5 Genres</h3>
				<ol>
					{#each Object.entries(getTopList(genreList, 5)) as [key, genre]}
						<li>{genre[0]}: <small>{genre[1]}</small></li>
					{/each}
				</ol>
			</div>

			<div>
				<h3>Top 10 Actors</h3>
				<ol>
					{#each Object.entries(getTopList(actorList)) as [key, actor]}
						<li>{actor[0]}: <small>{actor[1]}</small></li>
					{/each}
				</ol>
			</div>

			<div>
				<h3>Top 10 Directors</h3>
				<ol>
					{#each Object.entries(getTopList(directorList)) as [key, director]}
						<li>{director[0]}: <small>{director[1]}</small></li>
					{/each}
				</ol>
			</div>
		</div>
	</section>
</div>
