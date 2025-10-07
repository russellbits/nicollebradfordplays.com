<!-- src/lib/components/EbayItem.svelte -->
<script>
	export let itemId = '';
	export let seller = '';

	let item = null;
	let loading = false;
	let error = null;

	async function fetchItem() {
		if (!itemId) return;

		loading = true;
		error = null;

		try {
			const params = new URLSearchParams({ itemId });
			if (seller) params.append('seller', seller);

			const response = await fetch(`/api/ebay?${params}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch item');
			}

			item = data;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	$: if (itemId) fetchItem();
</script>

<div class="ebay-item">
	{#if loading}
		<div class="loading">Loading item...</div>
	{:else if error}
		<div class="error">Error: {error}</div>
	{:else if item}
		<div class="item-card">
			{#if item.image}
				<img src={item.image} alt={item.title} class="item-image" />
			{/if}
			<div class="item-details">
				<h2 class="item-title">{item.title}</h2>
				{#if item.description}
					<p class="item-description">{item.description}</p>
				{/if}
				{#if item.price}
					<p class="item-price">{item.currency} {item.price}</p>
				{/if}
				<a href={item.link} target="_blank" rel="noopener noreferrer" class="item-link">
					View on eBay →
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.ebay-item {
		max-width: 600px;
		margin: 0 auto;
	}

	.item-card {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.item-image {
		width: 100%;
		height: auto;
		display: block;
	}

	.item-details {
		padding: 20px;
	}

	.item-title {
		margin: 0 0 10px 0;
		font-size: 1.5rem;
		color: #333;
	}

	.item-description {
		color: #666;
		margin-bottom: 10px;
	}

	.item-price {
		font-size: 1.25rem;
		font-weight: bold;
		color: #e53238;
		margin: 10px 0;
	}

	.item-link {
		display: inline-block;
		background-color: #3665f3;
		color: white;
		padding: 10px 20px;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.3s;
	}

	.item-link:hover {
		background-color: #2451cc;
	}

	.loading,
	.error {
		padding: 20px;
		text-align: center;
	}

	.error {
		color: #e53238;
	}
</style>
