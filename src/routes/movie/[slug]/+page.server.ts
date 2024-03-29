import { error } from '@sveltejs/kit';
import { supabase as supaClient } from '$lib/server/supabaseClient';
import { redirect } from '@sveltejs/kit';

let movieLoadData: object;

export async function load({ params, url }) {
	const movieId = url.searchParams.get('id');
	async function getSupaMovie() {
		if (movieId) {
			return await supaClient
				.from('movies')
				.select()
				.eq('id', movieId)
				.then((moviesSupa) => moviesSupa);
		} else {
			return await supaClient
				.from('movies')
				.select()
				.eq('slug', params.slug)
				.then((moviesSupa) => moviesSupa);
		}
	}

	// get data from supabase
	const { data, error: supaError } = await getSupaMovie();

	if (data?.length === 0 || supaError) {
		error(404, 'Movie not found');
	} else {
		movieLoadData = data[0];

		return {
			movie: data[0] ?? []
		};
	}
}

export const actions = {
	updateMovie: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const movieId = formData.get('movieId');
		const slug_current = formData.get('slug_current');

		const movieData = {
			name: formData.get('name'),
			watch_date: formData.get('watch_date'),
			picked: formData.get('picked'),
			rating_craig: formData.get('rating_craig'),
			rating_rebecca: formData.get('rating_rebecca'),
			imdb_id: formData.get('imdb_id'),
			tmdb_id: formData.get('tmdb_id'),
			release_date: formData.get('release_date'),
			director: JSON.stringify(formData.get('director').split(',')),
			top_cast: JSON.stringify(formData.get('top_cast').split(',')),
			genre: JSON.stringify(formData.get('genre').split(',')),
			tmdb_user_score: formData.get('tmdb_user_score'),
			poster_path: formData.get('poster_path'),
			backdrop_path: formData.get('backdrop_path'),
			overview: formData.get('overview'),
			slug: formData.get('slug')
		};

		// check if for what movie data has changed
		const changedData = Object.keys(movieData).reduce((acc, key) => {
			if (movieData[key] !== movieLoadData[key]) {
				acc[key] = movieData[key];
			}
			return acc;
		}, {});

		// check if changed data is empty
		if (Object.keys(changedData).length != 0) {
			const { data: newData, error: supaError } = await supabase
				.from('movies')
				.update(changedData)
				.eq('id', movieId)
				.select();

			if (supaError) {
				console.log(supaError);
				return supaError;
			} else if (newData) {
				if (newData[0].slug !== slug_current) {
					redirect(303, `/movie/${newData[0].slug}`);
				} else {
					return newData;
				}
			}
		} else {
			return movieLoadData;
		}
	}
};
