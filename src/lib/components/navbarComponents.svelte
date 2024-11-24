<script lang="ts">
	import { userStore } from "$lib/firebase/userStore";
	import { onMount } from "svelte";

    let profileText = 'Profile';
	onMount(() => {
		userStore.subscribe((user) => {
			if (user) {
				profileText = user.name;
			}
		});
	});
</script>
<div
	class="flex flex-row justify-between text-electric-blue font-extrabold font-mono text-xl border-2 p-4 border-electric-blue rounded overflow-x-scroll lg:overflow-auto space-x-4"
>
	<a
		href="/"
		class="border-2 border-electric-blue p-2 rounded hover:scale-105 transition hover:shadow-md hover:shadow-electric-blue"
		>Terminal</a
	>
	<a
		href="/about"
		class="border-2 border-electric-blue p-2 rounded hover:scale-105 transition hover:shadow-md hover:shadow-electric-blue"
		>About</a
	>
	<a
		href="/leaderboard"
		class="border-2 border-electric-blue p-2 rounded hover:scale-105 transition hover:shadow-md hover:shadow-electric-blue"
		>LeaderBoard</a
	>
	<a
		href="/profile"
		class="border-2 border-electric-blue p-2 rounded hover:scale-105 transition hover:shadow-md hover:shadow-electric-blue"
		>{profileText}</a
	>
</div>
