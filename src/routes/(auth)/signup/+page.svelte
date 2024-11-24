<script lang="ts">
	import InputField from '$lib/components/ui/inputField.svelte';
	import { signUpFirebase } from '$lib/firebase/auth';
	import { createUserInFirestore } from '$lib/firebase/userRepo';
	import { toast } from 'svelte-sonner';

	const inputFields = [
		{
			name: 'name',
			type: 'text',
			label: 'Name',
			placeholder: 'Enter your name'
		},
		{
			name: 'registerNumber',
			type: 'number',
			label: 'Register Number',
			placeholder: 'Enter your register number'
		},
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
		},
		{
			name: 'confirmPassword',
			type: 'password',
			label: 'Confirm Password',
			placeholder: 'Confirm your password'
		}
	];
	let loading = false;
	let stateText = '';
	async function handleFormSubmit(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		if (password != confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}
		toast.info('Signing up...');
		const signInData = await signUpFirebase({
			email: email,
			password: password
		});
		if (!signInData) {
			toast.error('Sign up failed');
			return;
		}
		await createUserInFirestore(
			email,
			formData.get('name') as string,
			Number.parseInt(formData.get('registerNumber') as string)
		);

		loading = false;
		if (!signInData) {
			toast.error('Sign up failed');
		}
		toast.success('Sign up successful');
	}
</script>

<div class="flex flex-col items-center justify-center">
	<div class="text-electric-blue text-4xl font-bold font-mono">Sign Up</div>
	<form class="flex flex-col space-y-6 my-8 w-full lg:w-fit" on:submit|preventDefault={handleFormSubmit}>
		{#each inputFields as inputField}
			<InputField {inputField} />
		{/each}
		<button
			disabled={loading}
			class="rounded shadow-md p-2 shadow-electric-blue text-xl font-mono font-bold text-electric-blue hover:shadow-sm transition"
		>
			{#if !loading}
				Submit
			{:else}
				Submitting...
			{/if}
		</button>
	</form>
	<div class="text-red-600">{stateText}</div>
	<div class="text-spring-green">Already have an account? <a href="/login">Login</a></div>
</div>
