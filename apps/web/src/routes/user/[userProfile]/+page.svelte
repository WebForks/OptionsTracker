<script>
	export let data;
	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Profile',
			href: `/user/${data.user.username}`
		},
		{
			title: 'Cost Basis Tracker',
			href: `/cbtracker`
		},
		{
			title: 'About',
			href: '/about'
		},
		{
			title: 'Changelog',
			href: '/changelog'
		}
	];
</script>

<div class="flex">
	<!-- Left Side (Menu) -->
	<div>
		{#if !data.user}
			<p>not logged in</p>
		{:else}
			<ul class="menu bg-base-100 w-56 p-2 rounded-box">
				{#each navigation as navItem}
					<li>
						<a
							href={navItem.href}
							class="block px-2 py-1 font-medium transition-colors duration-200 hover:bg-base-200 {$page
								.url.pathname === navItem.href
								? 'active'
								: ''}"
						>
							{navItem.title}
						</a>
					</li>
				{/each}
			</ul>

			<div class="dropdown dropdown-end mt-2">
				<a href="/trades/new" class="btn btn-primary btn-outline">New Trade</a>
			</div>
		{/if}
	</div>

	<!-- Right Side (User Info, Trade Filter, Trade History) -->
	<div class="ml-4">
		<!-- User Info section -->
		<div class=" p-4 rounded-lg shadow-md mb-6">
			<div class="flex justify-between items-center">
				<div class="flex items-center">
					<h1 class="font-bold text-xl">{data.user.username}</h1>
					<span class="ml-4 text-red-500">♥ 3</span>
				</div>
				<div class="flex space-x-2">
					<span class="text-sm">1 Following</span>
					<span class="text-sm">0 Followers</span>
				</div>
			</div>
			<div class="mt-4 grid grid-cols-2 gap-4">
				<!-- Profile Statistics -->
				<div>
					<p>📅 Join Date: 01-08-2021</p>
					<p>🔥 Longest Streak: 3</p>
					<p>⌚ Avg Trade Duration: 1.49 days</p>
					<p>📝 Notes Percentage: 80.00%</p>
					<p>✔️ Total Wins: 3</p>
					<p>❌ Total Losses: 2</p>
					<p>📚 Total Assignments: 0</p>
					<p>📈 Win Percentage: 60.00%</p>
					<p>💰 2021 Net Premium: 158</p>
				</div>
				<!-- Achievements -->
				<div>
					<!-- Add the achievements here -->
				</div>
			</div>
			<button class="btn btn-primary mt-4">Edit Profile</button>
		</div>

		<!-- Trade Filter -->
		<div class=" p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
			<div class="flex space-x-4 items-center">
				<select class="select select-bordered">
					<option disabled="disabled" selected="selected">Symbol</option>
					<!-- ... your options here ... -->
				</select>
				<button class="btn">Clear</button>
			</div>
			<input type="text" placeholder="Search..." class="input input-bordered" />
		</div>

		<!-- Trades History -->
		<div class=" p-4 rounded-lg shadow-md">
			<h2 class="font-bold text-lg mb-4">History</h2>
			<table class="table w-full table-zebra">
				<!-- ... your table contents here ... -->
			</table>
		</div>
	</div>
</div>
