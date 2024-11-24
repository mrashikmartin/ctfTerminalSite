<script>
	import '../../app.css';
	import NavbarComponent from "$lib/components/navbarComponents.svelte";
</script>

<div class="flex flex-col h-screen w-full bg-rich-black p-4 lg:p-16">
	<NavbarComponent />
	<div class="border-2 border-electric-blue my-4 rounded h-full overflow-hidden">
		<slot />
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
