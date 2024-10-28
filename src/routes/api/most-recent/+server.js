import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const prerender = true;

export async function GET(event) {
	const { error } = await supabase
		.from('movies')
		.select('*', { count: 'exact', head: true });

	async function getSupaMovies() {
		return await supabase
			.from('movies')
			.select()
			.order('watch_date', { ascending: false })
			.limit(2)
			.then((moviesSupa) => moviesSupa);
	}

	const { data } = await getSupaMovies();

	return json(data);
}
