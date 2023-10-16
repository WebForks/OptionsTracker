<script>
	import { createEventDispatcher } from 'svelte';

	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'date';  // Set the default type to 'date' here
	export let disabled = false;
	export let required = false;
	export let errors;

	const dispatch = createEventDispatcher();

	function handleInput(event) {
		value = event.target.value;
		dispatch('input', value); // Dispatches the input event with the new value
	}
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		class={type === 'file'
			? 'file-input file-input-bordered w-full max-w-lg'
			: 'input input-bordered w-full max-w-lg'}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		bind:value={value} 
		on:input={handleInput}
		type = "date"
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
