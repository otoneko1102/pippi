<header>
	<div class="ticker">
		<div class="scroll">★ 掲示板風ぴっぴ変換サイトへようこそ！デザインの懐かぴっぴさを感じろ ★</div>
	</div>
</header>

<style>
	header {
		background: #ff99cc;
		border-bottom: 3px double #ff66aa;
	}
	.ticker {
		overflow: hidden;
		white-space: nowrap;
		padding: 6px 0;
	}
	.scroll {
		display: inline-block;
		padding-left: 100%;
		animation: marquee 18s linear infinite;
		font-weight: bold;
		color: #fff;
		text-shadow: 1px 1px #cc3366;
	}
	@keyframes marquee {
		from {
			transform: translateX(0%);
		}
		to {
			transform: translateX(-100%);
		}
	}
</style>
