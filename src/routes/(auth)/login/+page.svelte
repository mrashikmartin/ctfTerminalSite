<script lang="ts">
	import InputField from '$lib/components/ui/inputField.svelte';
	import { signInFirebase } from '$lib/firebase/auth';
	import { getUserFromFirestore } from '$lib/firebase/userRepo';
	import { userStore } from '$lib/firebase/userStore';
	import { toast } from 'svelte-sonner';

	const inputFields = [
		{
			name: 'email',
			type: 'email',
			label: 'Email',
			placeholder: 'Enter your email'
		},
		{
			name: 'password',
			type: 'password',
			label: 'Password',
			placeholder: 'Enter your password'
		}
	];

	let stateText = '';
	async function handleFormSubmit(e: Event) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		toast.info('Signing in...');
		const signInData = await signInFirebase({
			email: email,
			password: password
		});

		if (signInData) {
			toast.success('Signed in successfully');
			const userData = await getUserFromFirestore(email);
			userStore.set(userData);
		} else {
			toast.error('Sign in failed');
			stateText = 'Invalid Credentials';
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<div class="text-electric-blue text-4xl font-bold font-mono">Sign In</div>
	<form class="flex flex-col space-y-6 my-8 w-full lg:w-fit" on:submit|preventDefault={handleFormSubmit}>
		{#each inputFields as inputField}
			<InputField {inputField} />
		{/each}
		<button
			class="rounded shadow-md p-2 shadow-electric-blue text-xl font-mono font-bold text-electric-blue hover:shadow-sm transition"
			>Submit</button
		>
	</form>
	<div class="text-red-600">{stateText}</div>
	<div class="text-spring-green">Don't have an account ? <a href="/signup">Signup</a></div>
</div>
