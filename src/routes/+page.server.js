import { supabase } from '$lib/server/supabaseClient';
import { VITE_TMDB_KEY } from '$env/static/private';

export const prerender = true;

export async function load() {
	const callAmt = 45;
	const { count, error } = await supabase
		.from('movies')
		.select('*', { count: 'exact', head: true });

	async function getSupaMovies(rangeStart) {
		return await supabase
			.from('movies')
			.select()
			.range(200, 260)
			.then((moviesSupa) => moviesSupa);
	}

	async function addTmdbData() {
		return await getSupaMovies()
			.then(async (moviesSupa) => {
				const moviesTmbd = moviesSupa;
				const movies = moviesSupa.data;

				// loop over movies from Supabase and add TMDb data
				for (const movie of movies) {
					const imdb_id = movie.imdb_id;
					const getIndex = movies.indexOf(movie);

					await fetch(
						`https://api.themoviedb.org/3/find/${imdb_id}?api_key=${VITE_TMDB_KEY}&language=en-US&external_source=imdb_id`
					)
						.then((response) => response.json())
						.then((data) => {
							// TODO: Add fallback for when IMDB ID is not found
							if (data.movie_results.length > 0) {
								moviesTmbd.data[getIndex].backdrop_path = data.movie_results[0].backdrop_path;
								moviesTmbd.data[getIndex].poster_path = data.movie_results[0].poster_path;
								moviesTmbd.data[getIndex].release_date = data.movie_results[0].release_date;
							}
						});
				}

				return moviesTmbd;
			})
			.then((moviesTmbd) => moviesTmbd)
			.catch((err) => console.log('tmdbError', err));
	}

	const { data } = await addTmdbData();

	return {
		movies: data ?? []
	};
}
