import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const userEmail = data.get('email');

		async function signInWithEmail(userEmail) {
			const { data, error } = await supabase.auth.signInWithOtp({
				email: userEmail,
				options: {
					emailRedirectTo: 'http://127.0.0.1:5173/add-movie'
				}
			});
		}
		await signInWithEmail(userEmail);
	}
};

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	console.log(session);

	// redirect user is already logged in
	if (session) {
		throw redirect(302, '/add-movie');
	}
};
