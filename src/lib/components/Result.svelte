<script lang="ts">
	export let text = '';
	export let onCopy: () => void = () => {};
	export let onTweet: () => void = () => {};
	export let disabled = false;
	export let statusMessage = '';

	const doCopy = async () => {
		if (!text) return;
		await navigator.clipboard.writeText(text);
		// Notify parent so it can set persistent message (parent may also log/analytics)
		onCopy();
	};
</script>

<div>
	<pre>{text}</pre>
	{#if statusMessage}
		<div class="status-plain"><small>{statusMessage}</small></div>
	{/if}
	<div style="display:flex; gap:8px; margin-top:8px;">
		<button class="primary" on:click={doCopy} disabled={!text || disabled}>コピー</button>
		<button class="tweet" on:click={onTweet} disabled={!text || disabled}>ツイートする</button>
	</div>
</div>

<style>
	button.primary {
		background: #ff99cc;
		color: #fff;
		border: 1px solid #ff66aa;
		padding: 6px 12px;
		font-weight: 700;
		cursor: pointer;
	}
	button.primary:hover {
		background: #ff66aa;
	}
	button.primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	button.tweet {
		background: #3b82f6;
		color: #fff;
		border: 1px solid #2b6be0;
		padding: 6px 12px;
		font-weight: 700;
		cursor: pointer;
	}
	button.tweet:hover {
		background: #2563eb;
	}
	button.tweet:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	pre {
		background: #fff0f8;
		padding: 10px;
		border: 1px dashed #ff99cc;
		min-height: 2em;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.status-plain {
		margin: 6px 0 0 0;
		font-size: 13px;
		color: #660033;
	}
</style>
