<script>
	import { page } from '$app/stores';
</script>

<div class="error-wrap">
	<div class="error-box">
		<div class="error-header">★ ERROR ★</div>
		<p class="error-code">{$page.status}</p>
		<p class="error-msg">
			{#if $page.status === 404}
				そのページは存在ぴっぴません。
			{:else}
				エラーが発生ぴっぴまぴっぴた。
			{/if}
		</p>
		<p class="error-sub">{$page.error?.message ?? ''}</p>
		<a href="/" class="back-btn">▶ トップへもどる</a>
	</div>
</div>

<style>
	.error-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 60vh;
		padding: 20px;
	}
	.error-box {
		background: #fffafc;
		border: 3px double #ff99cc;
		box-shadow: 0 0 12px #ffccdd;
		padding: 40px 32px;
		text-align: center;
		max-width: 480px;
		width: 100%;
	}
	.error-header {
		background: #ff99cc;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		padding: 4px 0;
		margin-bottom: 20px;
		letter-spacing: 4px;
	}
	.error-code {
		font-size: 72px;
		font-weight: bold;
		color: #ff66aa;
		margin: 0 0 8px;
		line-height: 1;
		text-shadow: 2px 2px #ffccdd;
	}
	.error-msg {
		font-size: 16px;
		color: #660033;
		margin: 0 0 8px;
	}
	.error-sub {
		font-size: 12px;
		color: #cc6699;
		margin: 0 0 24px;
		min-height: 1em;
	}
	.back-btn {
		display: inline-block;
		background: #ff99cc;
		color: #fff;
		text-decoration: none;
		padding: 8px 20px;
		font-weight: bold;
		font-size: 14px;
	}
	.back-btn:hover {
		background: #ff6699;
	}
</style>
