<script>
	import '../css/styles.scss';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';

	export let data;
	export let sessionStatus = $page.data.session ? true : false;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});

	async function signOut() {
		async function supaOut() {
			const { error } = await supabase.auth.signOut();
		}
		await supaOut().then(() => {
			window.location.href = '/';
		});
	}
</script>

<header id="site-header">
	<a href="/" class="sh-logo"><span>What Have We</span> <span>Watched</span></a>
	<nav class="sh-nav" aria-label="Site">
		{#if sessionStatus}
			<a href="/add-movie">Add movie</a>
			<button on:click={signOut}>Log off</button>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="site-footer">
	<p>By <a href="https://craigwfox.com">Craig Fox</a></p>
</footer>
