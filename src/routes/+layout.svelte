<script>
	import '../css/styles.scss';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	export let sessionStatus = $page.data.session ? true : false;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	function signOut() {
		async function supaOut() {
			const { error } = await supabase.auth.signOut();
		}
		supaOut().then(() => {
			window.location.href = '/';
		});
	}
</script>

<header id="site-header">
	<a href="/" class="sh-logo"><span>What Have We</span> <span>Watched</span></a>
	<nav class="sh-nav" aria-label="Site">
		<a href="/stats">Stats</a>
		{#if sessionStatus}
			<a href="/add-movie">Add movie</a>
			<button on:click={signOut}>Log off</button>
		{:else}
			<a href="/auth">Login</a>
		{/if}
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="site-footer">
	<p>By <a href="https://craigwfox.com">Craig Fox</a></p>
</footer>
