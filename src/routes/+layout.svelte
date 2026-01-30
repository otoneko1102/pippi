<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ffe0f0" />
	<title>ぴっぴ変換</title>
	<meta name="title" content="ぴっぴ変換" />
	<meta name="description" content="★ 掲示板風ぴっぴ変換サイトへようこそ！デザインの懐かぴっぴさを感じろ ★" />
</svelte:head>

{@render children()}

<footer class="site-footer">otoneko. &copy; 2025-2026 All rights reserved.</footer>
