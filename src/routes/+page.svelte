<script>
	import Ticker from '$lib/components/Ticker.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import Converter from '$lib/components/Converter.svelte';
</script>

<Ticker />

<div class="layout">
	<aside class="sidebar left">
		<Menu />
	</aside>

	<div class="mobi-br"></div>

	<main class="center">
		<div class="card">
			<h1>★ 掲示板風ぴっぴ変換サイト ★</h1>
			<Converter />
		</div>
	</main>

	<aside class="sidebar right">
		<section id="about" class="side-info">
			<h3>掲示板について</h3>
			<p>この掲示板風サイトはクライアント側でテキストを「ぴっぴ変換」するWebアプリです。</p>
			<p>「し」を「ぴっぴ」に変換します。</p>
		</section>
	</aside>
</div>

<style>
	:global(body) {
		font-family: 'MS PGothic', 'Courier New', monospace;
		background: #ffe0f0;
		color: #660033;
	}
	main {
		max-width: 720px;
		margin: 0;
	}
	h1 {
		font-size: 22px;
		text-align: center;
		border-bottom: 2px dotted #ff99cc;
		padding-bottom: 6px;
		margin-top: 0;
	}
	.side-info {
		max-width: 720px;
		margin: 0 auto;
		padding: 10px;
		background: #fff0f8;
		border: 2px dotted #ff99cc;
	}

	@media (max-width: 768px) {
		.mobi-br {
			height: 150px;
		}
	}
</style>
