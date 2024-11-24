<script lang="ts">
	import { departments } from '$lib/constants/profileContants';
	import { updateUserDetails } from '$lib/firebase/userRepo';
	import { userStore } from '$lib/firebase/userStore';
	const inputFieldsArray = [
		{
			name: 'name',
			label: 'Name',
			type: 'text',
			value: $userStore?.name
		},
		{
			name: 'registerNumber',
			label: 'Register Number',
			type: 'number',
			value: $userStore?.registerNumber
		},
		{
			name: 'phone',
			label: 'Phone Number',
			type: 'number',
			value: $userStore?.phone
		}
	];
	let loading = false;
	async function handleFormSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const phone = formData.get('phone') as string;
		if (phone.length !== 10) {
			alert('Phone number should be 10 digits ' + phone);
			return;
		}
		loading = true;
		const updateResult = await updateUserDetails(formData);
		loading = false;
		if (updateResult) {
			alert('Profile updated successfully');
		} else {
			alert('Profile update failed');
		}
	}
</script>

<div class="text-electric-blue text-xl">
	<form class="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-4 lg:gap-y-8" on:submit|preventDefault={handleFormSubmit}>
		<!-- input fields -->
		{#each inputFieldsArray as inputField}
			<!-- <div class="flex flex-row items-center space-x-4"> -->
			<label for={inputField.name} class="font-bold">{inputField.label} :</label>
			<input
				value={inputField.value}
				name={inputField.name}
				type={inputField.type}
				class="px-2 py-1 bg-rich-black border-2 rounded shadow shadow-electric-blue border-electric-blue font-mono outline-none"
			/>
		{/each}
		<!-- department  -->
		<label for="dept" class="font-bold">Department : </label>
		<select
			value={$userStore?.dept ?? 'CSE'}
			name="dept"
			id=""
			class="bg-rich-black border-2 border-electric-blue rounded shadow shadow-electric-blue px-2 py-1"
		>
			{#each departments as department}
				<option value={department}>{department}</option>
			{/each}
		</select>
		<!-- year  -->
		<label for="year" class="font-bold">Year : </label>
		<select
			value={$userStore?.year ?? 1}
			name="year"
			id=""
			class="bg-rich-black border-2 border-electric-blue rounded shadow shadow-electric-blue px-2 py-1"
		>
			{#each ['1', '2', '3', '4'] as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
		<!-- section  -->
		<label for="section" class="font-bold">Section : </label>
		<select
			value={$userStore?.section ?? 'A'}
			name="section"
			id=""
			class="bg-rich-black border-2 border-electric-blue rounded shadow shadow-electric-blue px-2 py-1"
		>
			{#each ['A', 'B', 'C'] as section}
				<option value={section}>{section}</option>
			{/each}
		</select>
		<!-- submit button  -->
		<button
			disabled={loading}
			type="submit"
			class="hover:scale-105 transition bg-electric-blue disabled:animate-pulse text-rich-black font-bold rounded shadow shadow-rich-black px-2 py-1 w-fit text-xl font-mono"
		>
			{loading ? 'Saving...' : 'Save'}
		</button>
		<!-- log out button -->
	</form>
</div>
