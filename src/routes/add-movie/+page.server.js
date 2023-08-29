import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// redirect user if not logged in
	if (!session) {
		throw redirect(302, '/auth');
	}
};

export const actions = {
	addMovie: async ({ request, locals: { getSession, supabase } }) => {
		const data = await request.formData();
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

		// check for existing movie
		const { data: existingMovie, error: existingMovieError } = await supabase
			.from('movies')
			.select()
			.eq('tmdb_id', movieData.tmdb_id);

		// if existing movie, return the existing movie
		if (existingMovie[0]) {
			return { movieExists: true, existingMovie: existingMovie[0] };
		} else if (existingMovieError) {
			return existingMovieError;
		}
		// if no existing movie, add movie
		else {
			const { data: newData, error: newDataError } = await supabase
				.from('movies')
				.insert(movieData)
				.select();

			if (newDataError) {
				console.log(newDataError);
				return newDataError;
			} else {
				return { newMovieAdded: true, newMovie: newData[0] };
			}
		}
	}
};
