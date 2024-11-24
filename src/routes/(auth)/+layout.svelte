<script>
	import '../../app.css';
	import { Toaster } from 'svelte-sonner';
</script>


<Toaster position="bottom-right" richColors />
<div class="flex flex-col min-h-screen w-full bg-rich-black p-4 lg:p-16">
	<slot />
</div>
