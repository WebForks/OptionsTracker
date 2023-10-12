<script>
    let name = '';
</script>

<input type="text" bind:value={name} />

<h1>Hello {name}!</h1>

{#if name}
    <div>hello</div>
{/if}