<script lang="ts">
	import { getChallengesDataToStore } from '$lib/firebase/domainRepo';
	import { userStore } from '$lib/firebase/userStore';
	import { onMount } from 'svelte';
	import { challengesStore } from '$lib/stores/firebaseStore';
	import { type challengeSchema, challengeType } from '$lib/firebase/schemas';
	let challenges: challengeSchema[];
	let loading = false;
	onMount(async () => {
		loading = true;
		if (
			$userStore?.challengeCompleted !== undefined &&
			$userStore?.challengeCompleted !== null &&
			$userStore?.challengeCompleted.length > 0
		) {
			await getChallengesDataToStore($userStore?.challengeCompleted);
		}
		loading = false;
	});
	$: easyPercentage = Math.floor(
		(challenges.filter((challenge) => challenge.type === challengeType.EASY).length /
			challenges.length) *
			100
	);
	$: easyProblem = challenges.filter((challenge) => challenge.type === challengeType.EASY).length;
	$: mediumPercentage = Math.floor(
		(challenges.filter((challenge) => challenge.type === challengeType.MEDIUM).length /
			challenges.length) *
			100
	);
	$: mediumProblem = challenges.filter(
		(challenge) => challenge.type === challengeType.MEDIUM
	).length;
	$: hardPercentage = Math.floor(
		(challenges.filter((challenge) => challenge.type === challengeType.HARD).length /
			challenges.length) *
			100
	);
	$: hardProblem = challenges.filter((challenge) => challenge.type === challengeType.HARD).length;

	challengesStore.subscribe((value) => {
		challenges = value;
	});
</script>

<div
	class="flex font-mono font-bold flex-col text-spring-green lg:mx-8 items-center w-full h-full lg:basis-1/2"
>
	<div class="text-3xl mb-8">Problems Solved</div>
	{#if loading}
		<div>Loading</div>
	{:else}
		<div
			class="w-full lg:w-1/2 p-4 mb-8 rounded items-center justify-center flex flex-col border-2 border-spring-green shadow-lg shadow-spring-green lg:hover:scale-110 transition"
		>
			<!-- graph  -->
			<div class="h-64 w-full p-1 flex flex-row justify-between items-end">
				<!-- easy bar  -->
				<div
					class={`bg-electric-blue p-4 w-1/4 rounded`}
					style={`height: ${easyPercentage}%;`}
				></div>
				<!-- medium bar  -->
				<div
					class={`bg-yellow-400 p-4 w-1/4 rounded`}
					style={`height: ${mediumPercentage}%;`}
				></div>
				<!-- hard bar  -->
				<div class={`bg-red-500 p-4 w-1/4 rounded`} style={`height: ${hardPercentage}%;`}></div>
			</div>
			<!-- axis  -->
			<div class="w-full p-1 flex flex-row justify-between">
				<!-- Easy Problems  -->
				<div class="flex flex-col text-electric-blue w-1/4 items-center justify-center text-2xl">
					<div class="">{easyProblem}</div>
					<div>Easy</div>
				</div>
				<!-- Medium Problems  -->
				<div class="flex flex-col text-yellow-400 w-1/4 items-center justify-center text-2xl">
					<div class="">{mediumProblem}</div>
					<div>Medium</div>
				</div>
				<!-- Hard Problems  -->
				<div class="flex flex-col w-1/4 items-center text-red-500 justify-center text-2xl">
					<div class="">{hardProblem}</div>
					<div>Hard</div>
				</div>
			</div>
		</div>
		<div class="text-xl lg:text-2xl my-8 font-extrabold">Total Problems Solved : {challenges.length}</div>
	{/if}
</div>
