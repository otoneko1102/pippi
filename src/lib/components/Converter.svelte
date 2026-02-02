<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as wanakana from 'wanakana';
	import TextArea from '$lib/components/TextArea.svelte';
	import Options from '$lib/components/Options.svelte';
	import Result from '$lib/components/Result.svelte';

	let input = '';
	let placeholder = '鹿児島県志布志市市志布志町志布志市';
	let output = '';
	let loading = true;
	let loadingMessage = 'なうろーでぃんぐ…';
	let morphoAvailable = true;

	let useKata = false;
	let useKataPippi = false;
	let useShort = false;
	// user option to enable morphological analysis
	let useMorpho = true;

	let tokenizer: any = null;
	let statusType: 'loading' | 'success' | 'error' | 'info' = 'loading';
	let resultMessage = '';

	// loading dots animation (cycles 1,2,3 dots every 0.1s)
	let loadingDotsInterval: number | null = null;
	const loadingBaseMessage = 'なうろーでぃんぐ';
	let loadingDotCount = 0;
	// timeout id for auto-hiding copy confirmation message
	let copyMessageTimeout: number | null = null;

	function startLoadingDots() {
		if (loadingDotsInterval) return;
		loadingDotCount = 0;
		loadingMessage = loadingBaseMessage + '.';
		loadingDotsInterval = window.setInterval(() => {
			loadingDotCount = (loadingDotCount % 3) + 1;
			loadingMessage = loadingBaseMessage + '.'.repeat(loadingDotCount);
		}, 200) as unknown as number;
	}

	function stopLoadingDots() {
		if (loadingDotsInterval) {
			clearInterval(loadingDotsInterval);
			loadingDotsInterval = null;
		}
	}

	const tryLoadKuromoji = () =>
		new Promise<any>((res, rej) => {
			if ((window as any).kuromoji) return res((window as any).kuromoji);
			const s = document.createElement('script');
			s.src = 'https://unpkg.com/kuromoji@0.1.2/build/kuromoji.js';
			s.async = true;
			s.onload = () => res((window as any).kuromoji);
			s.onerror = () => rej(new Error('kuromoji load failed'));
			document.head.appendChild(s);
		});

	onMount(async () => {
		loading = true;
		loadingMessage = loadingBaseMessage + '・';
		statusType = 'loading';
		startLoadingDots();
		try {
			await tryLoadKuromoji();
			const kuromojiLib = (window as any).kuromoji;

			// 辞書ファイル取得で HTML（エラーページ）が返るケースがあるため、複数 CDN を順に試すフォールバックを追加
			const dicCandidates = [
				'/dict/',
				'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/',
				'https://unpkg.com/kuromoji@0.1.2/dict/',
			];

			async function buildTokenizerWithFallback() {
				for (const dicPath of dicCandidates) {
					try {
						const t = await new Promise((res, rej) =>
							kuromojiLib
								.builder({ dicPath })
								.build((err: any, t: any) => (err ? rej(err) : res(t)))
						);
						console.log('kuromoji dict loaded from', dicPath);
						return t;
					} catch (e) {
						console.warn('kuromoji build failed for', dicPath, e);
					}
				}
				throw new Error('All kuromoji dictionary loads failed');
			}

			tokenizer = await buildTokenizerWithFallback();
			morphoAvailable = true;
			loadingMessage = 'ろーどが完了ぴっぴまぴっぴた！';
			statusType = 'success';
		} catch (e) {
			console.warn('kuromoji init failed', e);
			morphoAvailable = false;
			loadingMessage = 'ろーど失敗…';
			statusType = 'error';
		} finally {
			// stop animated dots on completion (success or failure)
			stopLoadingDots();
			loading = false;
		}
	});

	onDestroy(() => {
		stopLoadingDots();
		if (copyMessageTimeout) {
			clearTimeout(copyMessageTimeout);
			copyMessageTimeout = null;
		}
	});

	function hiraFromReading(token: any) {
		const r = token.reading || token.surface_form;
		return wanakana.toHiragana(r);
	}

	function doConvert() {
		let text = input || placeholder || '';

		if (useMorpho && morphoAvailable && tokenizer) {
			try {
				const tokens = tokenizer.tokenize(text);
				text = tokens.map((t: any) => hiraFromReading(t)).join('');
			} catch (e) {
				console.warn('tokenize failed', e);
			}
		}

		let replaceWord = useShort ? 'ぴ' : 'ぴっぴ';
		if (useKataPippi || useKata) replaceWord = wanakana.toKatakana(replaceWord);

		text = text.replace(/し/g, replaceWord);

		if (useKata) text = wanakana.toKatakana(text);

		output = text;
	}

	function clearAll() {
		input = '';
		output = '';
	}

	async function doCopy() {
		// Clipboard write handled by Result.svelte's click handler; parent only sets persistent message
		if (!output) return;
		resultMessage = 'コピーぴっぴまぴっぴた！';		// clear any previous timeout
		if (copyMessageTimeout) {
			clearTimeout(copyMessageTimeout);
			copyMessageTimeout = null;
		}
		// hide message after 3 seconds
		copyMessageTimeout = window.setTimeout(() => {
			resultMessage = '';
			copyMessageTimeout = null;
		}, 3000) as unknown as number;	}
	function doTweet() {
		if (!output) return;
		// クライアント側で現在ページのURLを取得してツイートに追加
		const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://pippi.oto.im/pippi/';
		const tweet = `${output}\n\n${pageUrl}`;
		window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet), '_blank');
		// show persistent message near result area
		resultMessage = '';
	}
</script>

<div class="converter">
	<h3>入力：</h3>
	<TextArea bind:value={input} placeholder={placeholder} />

	<Options bind:useKata bind:useKataPippi bind:useShort bind:useMorpho {morphoAvailable} />

	{#if loadingMessage}
		<div class="status-plain">
			{#if statusType === 'loading'}
				<img src="/dot_loading.gif" alt="loading" class="status-icon" />
			{:else if statusType === 'success'}
				<img src="/dot_check.png" alt="done" class="status-icon" />
			{/if}
			<small>{loadingMessage}</small>
		</div>
	{/if}

	<div style="margin-top:8px; display:flex; gap:8px; align-items:center;">
		<button class="primary" on:click={doConvert} disabled={loading}>変換</button>
		<button class="primary" on:click={clearAll} disabled={loading}>リセット</button>
	</div>

	<h3>結果：</h3>
	<Result
		text={output}
		onCopy={doCopy}
		onTweet={doTweet}
		disabled={loading}
		statusMessage={resultMessage}
	/>
</div>

<style>
	.converter {
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
		padding: 12px;
		background: #fffafc;
		border: 1px dashed #ff99cc;
		box-sizing: border-box;
	}
	.converter h3 {
		margin-bottom: 8px;
		border-left: 6px solid #ff99cc;
		padding-left: 6px;
	}
	button.primary {
		background: #ff99cc;
		color: #fff;
		border: 1px solid #ff66aa;
		padding: 8px 14px;
		font-weight: bold;
		cursor: pointer;
	}
	button.primary:hover {
		background: #ff66aa;
	}
	button.primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* simple persistent plain text status (no close button) */
	.status-plain {
		margin: 8px 0;
		display:flex;
		align-items:center;
		gap:8px;
		font-size:13px;
		color:#660033;
		background: transparent;
		border: none;
		padding: 0;
	}
	.status-icon { width:18px; height:18px; display:block }

</style>
