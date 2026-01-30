<script>
	export let value = '';
	export let placeholder = '';
	export let rows = 6;
</script>

<textarea bind:value {rows} {placeholder}></textarea>
