<script>
	import '../css/styles.scss';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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
		const { error } = await supabase.auth.signOut();
		invalidate('supabase:auth');
	}
</script>

<header id="site-header">
	<a href="/" class="sh-logo"><span>What Have We</span> <span>Watched</span></a>
	<nav class="sh-nav">
		{#if sessionStatus}
			<a href="/add-movie">Add movie</a>
			<button on:click={signOut}>Sign out</button>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</header>

<main>
	<slot />
</main>

<footer>
	<p>By <a href="https://craigwfox.com">Craig Fox</a></p>
</footer>
