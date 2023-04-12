import { error } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function load({ params, url }) {
	async function getSupaMovie() {
		return await supabase
			.from('movies')
			.select()
			.eq('slug', params.slug)
			.then((moviesSupa) => moviesSupa);
	}

	// get data from supabase
	const { data, error: supaError } = await getSupaMovie();

	if (data?.length === 0 || supaError) {
		throw error(404, 'Not Found');
	} else {
		return {
			movie: data[0] ?? []
		};
	}
}

export const actions = {
	updateMovie: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const movieId = data.get('movieId');

		const movieData = {
			name: data.get('name'),
			watch_date: data.get('watch_date'),
			picked: data.get('picked'),
			rating_craig: data.get('rating_craig'),
			rating_rebecca: data.get('rating_rebecca'),
			imdb_id: data.get('imdb_id'),
			tmdb_id: data.get('tmdb_id'),
			release_date: data.get('release_date'),
			director: JSON.stringify(data.get('director').split(',')),
			top_cast: JSON.stringify(data.get('top_cast').split(',')),
			genre: JSON.stringify(data.get('genre').split(',')),
			tmdb_user_score: data.get('tmdb_user_score'),
			poster_path: data.get('poster_path'),
			backdrop_path: data.get('backdrop_path'),
			overview: data.get('overview'),
			slug: data.get('slug')
		};

		const { data: newData, error: supaError } = await supabase
			.from('movies')
			.update({ picked: movieData.picked })
			.eq('id', movieId)
			.select();

		if (supaError) {
			console.log(supaError);
			return supaError;
		} else if (newData) {
			console.log('new', newData);
			return newData;
		} else {
			console.log('no data');
		}
	}
};
