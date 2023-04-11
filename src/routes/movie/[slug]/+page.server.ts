import { supabase } from '$lib/server/supabaseClient';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
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
