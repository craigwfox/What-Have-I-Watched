import { json } from '@sveltejs/kit';

export async function GET({ params, url }) {
	// get movie id from url params and encode it
	const movieId = encodeURI(url.searchParams.get('id'));

	// fetch the data for the movie from the tmdb api
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${
			import.meta.env.VITE_TMDB_KEY
		}&language=en-US`
	).then((response) => response.json());

	// return the response as a json object
	return json(response);
}
