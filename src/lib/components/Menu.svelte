<nav class="menu">
	<input type="checkbox" id="toggle" />
	<label for="toggle" class="menu-btn">≡ メニュー</label>
	<div class="menu-content">
		<ul>
			<li><a href="https://montblank.fun/" target="_blank">管理人ホームページ</a></li>
			<li><a href="https://twitter.com/rin_montblank" target="_blank">管理人ツイッター</a></li>
			<li><a href="https://github.com/otoneko1102" target="_blank">管理人GitHub</a></li>
			<li><a href="#about">この掲示板について</a></li>
		</ul>
	</div>
</nav>

<style>
	.menu {
		background: #fff0f8;
		border: 2px solid #ff99cc;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
	}
	.menu-btn {
		display: block;
		background: #ff99cc;
		color: #fff;
		padding: 8px;
		cursor: pointer;
		font-weight: bold;
		text-align: center;
	}
	#toggle {
		display: none;
	}
	.menu-content {
		margin-top: 8px;
	}
	.menu-content ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.menu-content li {
		padding: 6px 0;
	}
	.menu-content a {
		color: #cc3366;
		text-decoration: none;
		font-size: 13px;
	}
	.menu-content a:hover {
		text-decoration: underline;
	}
</style>
