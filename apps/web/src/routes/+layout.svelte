<script>
	import '../app.postcss';
	import { getImageURL } from '$lib/utils';
	export let data;
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">OptionsTracker</a>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="btn btn-primary">Login</a>
					<a href="/register" class="btn btn-secondary">Register</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end mr-4">
					<a href="/trades" class="btn btn-primary btn-outline">Add Project</a>
				</div>

				<div class="dropdown dropdown-bottom dropdown-end">
					<button aria-label="Click" class="btn m-1" tabindex="0">Menu</button>
					<ul
					  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
					  <li><a href="/about" class="btn btn-primary">Profile</a></li>
					  <li><a href="/logsearch" class="btn btn-primary">logsearch</a></li>
					  <li><a href="/about" class="btn btn-primary">About</a></li>
					  <li><a href="/changelog" class="btn btn-primary">Changelog</a></li>
					  <li>
						<form action="/logout" method="POST" class="btn btn-primary">
						  <button type="submit">Logout</button>
						</form>
					  </li>
					</ul>
				  </div>
				  	
				  	  
			{/if}
		</div>
	</nav>
	<div class="py-4">
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
</div>
