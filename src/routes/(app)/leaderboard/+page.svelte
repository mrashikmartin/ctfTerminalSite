<script lang="ts">
	import { calculateScore } from '$lib/firebase/domainRepo';
	import { getAllUsers } from '$lib/firebase/userRepo';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	let leaderboard: {
		name: string;
		registerNumber: number;
		challengesCompleted: string[];
		score: number;
	}[] = [];

	$: currentLeaderboard = leaderboard.filter((user) =>
		user.name.toLowerCase().includes(search.toLowerCase())
	);
	let loading = false;
	let search = '';
	onMount(async () => {
		loading = true;
		await getLeaderboard();
		loading = false;
	});
	async function getLeaderboard() {
		const userData = await getAllUsers();
		for (let user of userData) {
			user.score = await calculateScore(user.challengesCompleted);
		}
		userData.sort((a, b) => b.score - a.score);
		leaderboard = userData;
	}
	function triggerSearch() {}
</script>

<div class="flex flex-col p-8 h-full">
	<div class="mt-4 mb-8">
		<input
			type="text"
			bind:value={search}
			on:change={triggerSearch}
			placeholder="Search..."
			class="bg-rich-black p-2 w-full lg:w-96 text-spring-green outline-none border-2 border-electric-blue rounded"
		/>
	</div>
	<div class="grid grid-cols-4 text-spring-green gap-4 overflow-y-scroll">
		<div class="text-2xl font-bold">S.No</div>
		<div class="text-2xl font-bold">Name</div>
		<div class="text-2xl font-bold">Register Number</div>
		<div class="text-2xl font-bold">Score</div>
		{#if loading}
			<div class="text-2xl font-bold">Loading...</div>
		{:else}
			{#each currentLeaderboard as user, index}
				<div class="text-xl flex flex-row space-x-2">
					<div>
						{#if index in [0, 1, 2]}
							<Icon icon="arcticons:anonymousmessenger-alt" class="text-2xl font-bold" />
						{/if}
					</div>
					<div>
						{index + 1}.
					</div>
				</div>
				<div class="text-xl">{user.name}</div>
				<div class="text-xl">{user.registerNumber}</div>
				<div class="text-xl">{user.score}</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}
	/* Optional: show position indicator in red */
	::-webkit-scrollbar-thumb {
		background: #ff0000;
	}
</style>
