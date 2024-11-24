<script lang="ts">
    type InputField = {
        name: string;
        type: string;
        label: string;
        placeholder: string;
    };
    export let inputField: InputField;
</script>
<label for={inputField.name} class="text-electric-blue font-mono text-xl font-bold"
	>{inputField.label}</label
>
<input
	required
	type={inputField.type}
	name={inputField.name}
	placeholder={inputField.placeholder}
	class="bg-oxford-blue w-full lg:w-96  border-2 focus:ring-0 font-medium outline-none rounded p-2 text-spring-green border-electric-blue shadow-md shadow-electric-blue"
/>
