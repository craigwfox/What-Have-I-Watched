<script lang="ts">
	// imports
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';

	// exports
	export let sessionStatus = $page.data.session ? true : false;
	export let supabase;
</script>
