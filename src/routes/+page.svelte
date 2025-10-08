<script>
	import '$lib/styles/house.scss';
	import EbayItem from '$lib/components/EbayItem.svelte';
	import { onMount } from 'svelte';

	// list of item ids to show sequentially
	const itemIds = ['236183238638', '236220886085', '236072363046'];

	// which indexes are visible
	let visible = itemIds.map((_, i) => i === 0);

	// reveal the next item after a short delay when current finishes loading
	function revealNext(index) {
		const next = index + 1;
		if (next < visible.length) {
			// small stagger so UI doesn't feel abrupt
			setTimeout(() => {
				visible[next] = true;
			}, 350);
		}
	}
</script>

<main>
	<div class="avatar">
		<img
			src="images/center-front-page-logo.png"
			width="400"
			height="400"
			alt="Nicolle Bradford Plays 
		logo"
		/>
	</div>
	<div>
		<h1>Nicolle Bradford Plays</h1>
		<h2>Hype Instigator</h2>
	</div>
	<div>
		<p>
			<!-- <SocialLinks /> -->
			<a href="https://www.pinterest.com/MyMammaSaidShop/">Pinterest</a> |
			<a href="https://www.facebook.com/nicollebradfordplays"
				><!--<i class="glyph-facebook glyph-white" />-->Facebook</a
			>
			|
			<a href="https://instagram.com/mymammasaidshop"
				><!--<i class="glyph-instagram glyph-white" />-->Instagram</a
			>
			|
			<a href="https://www.patreon.com/cw/NicolleBradfordPlays/home?utm_campaign=home_site"
				>Patreon</a
			>
		</p>
	</div>
</main>

<div class="item_feature">
	{#each itemIds as id, i}
		{#if visible[i]}
			<EbayItem itemId={id} on:loaded={() => revealNext(i)} on:error={() => revealNext(i)} />
		{:else}
			<!-- placeholder to preserve layout if desired -->
			<div class="ebay-placeholder" aria-hidden="true"></div>
		{/if}
	{/each}
</div>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin: auto;
		padding-top: 4em;
	}
	.item_feature {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 10px;
		margin-top: 20px;
	}
	/* .logo {
		position: absolute;
		top: 30px;
		left: 30px;
	} */

	.avatar > img {
		width: 60vw;
		max-width: 400px;
		height: auto;
		animation: scaleBounce 0.8s ease-out;
	}
	@keyframes scaleBounce {
		0% {
			transform: scale(0);
		}
		15% {
			transform: scale(1.2);
		}
		30% {
			transform: scale(0.9);
		}
		45% {
			transform: scale(1.1);
		}
		60% {
			transform: scale(0.95);
		}
		75% {
			transform: scale(1.02);
		}
		100% {
			transform: scale(1);
		}
	}

	/* Mobile responsiveness */
	@media (max-width: 600px) {
		main {
			padding-top: 2em;
		}

		.avatar > img {
			width: 200px;
		}

		.item_feature {
			flex-direction: column;
			align-items: center;
			gap: 12px;
			margin-top: 12px;
		}

		.featuredEbayItem {
			position: static;
			top: auto;
			left: auto;
		}
	}

	/* Placeholder for lazy-loaded Ebay items */
	.ebay-placeholder {
		width: 320px;
		max-width: 90vw;
		height: 360px;
		border-radius: 8px;
		background: linear-gradient(90deg, #f3f3f3 25%, #ececec 37%, #f3f3f3 63%);
		background-size: 400% 100%;
		animation: shimmer 1.2s linear infinite;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		margin: 6px;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (max-width: 600px) {
		.ebay-placeholder {
			width: 90vw;
			height: 360px;
		}
	}
</style>
