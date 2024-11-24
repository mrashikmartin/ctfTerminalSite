<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { terminalStore, terminalCurrentLineStore } from '$lib/stores/terminalStore';
	import { terminalOnStartEvent, terminalCommandEnterEvent } from '$lib/terminal/terminalEvents';
	let terminalDivElement:HTMLDivElement;
	onMount(() => {
		terminalOnStartEvent();
	});
	onDestroy(() => {
		terminalStore.set([]);
		terminalCurrentLineStore.set('');
	});
	function handleKeyboardEvent(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			terminalCommandEnterEvent();
		}
		terminalDivElement.scrollTop = terminalDivElement.scrollHeight;
	}

	function handleMouseClickEvent() {
		terminalCommandEnterEvent();
		terminalDivElement.scrollTop = terminalDivElement.scrollHeight;
	}
</script>

<div class="h-full w-full p-4 flex flex-col justify-between bg-rich-black">
	<div bind:this={terminalDivElement} class="text-spring-green text-base lg:text-lg font-mono font-bold overflow-y-scroll h-full">
		{@html $terminalStore.join('<br>')}
		<!-- cursor  -->
		<span class="h-4 w-2 bg-spring-green inline-block animate-pulse"></span>
	</div>
	<div class="border-2 flex flex-row border-electric-blue shadow shadow-electric-blue">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			autofocus
			on:keydown={handleKeyboardEvent}
			bind:value={$terminalCurrentLineStore}
			type="text"
			class="w-full bg-rich-black text-electric-blue p-2 font-mono font-bold ring-0 focus:ring-0 focus:outline-none"
			placeholder="Type Command Here!"
		/>
		<button
			on:click={handleMouseClickEvent}
			class="border-2 m-2 p-1 text-center text-electric-blue font-bold font-mono text-xl border-electric-blue shadow shadow-electric-blue"
		>
			<Icon icon="ri:send-plane-2-line" />
		</button>
	</div>
</div>

<style>
	::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}
	/* Optional: show position indicator in red
	::-webkit-scrollbar-thumb {
		background: #ff0000;
		height: 0;
	} */
</style>
