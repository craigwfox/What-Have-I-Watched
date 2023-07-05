import { json } from '@sveltejs/kit';
import { VITE_TMDB_KEY } from '$env/static/private';

export async function GET({ params, url }) {
	// get movie id from url params and encode it
	const movieId = encodeURI(url.searchParams.get('id'));

	// fetch the data for the movie from the tmdb api
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${VITE_TMDB_KEY}`
	)
		.then((response) => response.json())
		.then((jsonData) => jsonData);

	// return the response as a json object
	return json(response);
}
