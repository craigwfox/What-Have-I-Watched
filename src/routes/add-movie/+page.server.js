import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// redirect user if not logged in
	if (!session) {
		throw redirect(302, '/login');
	}
};

export const actions = {
	addMovie: async ({ request, locals: { getSession, supabase } }) => {
		// const session = await getSession();
		// console.log(supabase);

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
			sulg: data.get('slug')
		};

		const { data: newData, error } = await supabase.from('movies').insert(movieData).select();

		if (error) {
			return error;
		} else {
			return newData;
		}
	}
};
