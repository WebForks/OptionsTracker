<script>
	export let value = undefined;
	export let placeholder = '';
	export let id;
	export let label;
	export let min;
	export let max;
	export let step = 0.01;
	export let disabled = false;
	export let required = false;
	export let errors;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		class="input input-bordered w-full max-w-lg"
		type="number"
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
		{min}
		{max}
		{step}
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
