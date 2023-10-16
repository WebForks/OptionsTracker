<script>
	export let value = '';
	export let id;
	export let label;
	export let disabled = false;
	export let required = false;
	export let errors;
	export let options = []; // An array of { value: '...', label: '...' }
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<select 
		bind:value={value} 
		class="input input-bordered w-full max-w-lg" 
		{id} 
		name={id} 
		{required} 
		{disabled}
	>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
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
