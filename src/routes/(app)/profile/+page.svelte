<script>
	import ProfileFormComponent from '$lib/components/profileFormComponent.svelte';
	import ProfileProblemSolvedComponent from '$lib/components/profileProblemSolvedComponent.svelte';
	import { signOutFirebase } from '$lib/firebase/auth';
</script>

<div class="flex flex-col-reverse lg:flex-row p-4 lg:p-8 h-full overflow-scroll">
	<div class="flex flex-col w-full lg:basis-1/2 lg:mx-8">
		<div class="flex flex-col">
			<ProfileFormComponent />
		</div>
		<button
			on:click={signOutFirebase}
			class=" bg-rich-black mt-8 hover:scale-105 transition text-electric-blue font-bold rounded shadow shadow-electric-blue border-2 border-electric-blue px-2 py-1 w-fit text-xl font-mono"
		>
			Log Out
		</button>
	</div>
	<!-- problems solved  -->
	<ProfileProblemSolvedComponent />
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
