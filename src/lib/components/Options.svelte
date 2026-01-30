<script>
	export let useKata = false;
	export let useKataPippi = false;
	export let useShort = false;
	// user option to enable morphological analysis
	export let useMorpho = true;
	export let morphoAvailable = true;
</script>

<div class="options">
	<label><input type="checkbox" bind:checked={useKata} /> 全文をカタカナにする</label>
	<br />
	<label><input type="checkbox" bind:checked={useKataPippi} /> 変換部分をカタカナにする</label>
	<br />
	<label><input type="checkbox" bind:checked={useShort} /> 「し」→「ぴ」にする</label>
	<br />
	<label
		><input type="checkbox" bind:checked={useMorpho} disabled={!morphoAvailable} />
		形態素解析利用（{morphoAvailable ? '可' : '不可'}）</label
	>
</div>
