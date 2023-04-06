import { json } from '@sveltejs/kit';

export async function GET({ params, url }) {
	// get query term from url params and encode it
	const queryEncoded = encodeURI(url.searchParams.toString());

	// fetch the data for the movie from the tmdb api
	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${
			import.meta.env.VITE_TMDB_KEY
		}&${queryEncoded}`
	).then((response) => response.json());

	// return the response as a json object
	return json(response);
}
