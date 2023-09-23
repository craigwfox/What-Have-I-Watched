<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="wrapper">
	<form class="form" method="POST" use:enhance>
		<div class="input">
			<label for="email">Email</label>
			<input id="email" name="email" type="email" value={form?.email ?? ''} />
		</div>
		<button class="btn btn-primary">Log in</button>
	</form>
</div>
