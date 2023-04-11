import { supabase } from '$lib/server/supabaseClient';
import { VITE_API_LIMIT } from '$env/static/private';

export const prerender = true;

export async function load() {
	const { count, error } = await supabase
		.from('movies')
		.select('*', { count: 'exact', head: true });

	async function getSupaMovies() {
		return await supabase
			.from('movies')
			.select()
			.range(count - VITE_API_LIMIT, count)
			.then((moviesSupa) => moviesSupa);
	}

	const { data } = await getSupaMovies();

	return {
		movies: data ?? []
	};
}
