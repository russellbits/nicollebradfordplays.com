<script>
	import { onMount, createEventDispatcher } from 'svelte';
	export let itemId = '';
	export let supabaseUrl = 'https://dpwfzcszotvieswirwyw.supabase.co'; // Your Supabase project URL
	export let supabaseAnonKey =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwd2Z6Y3N6b3R2aWVzd2lyd3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjcxMDQsImV4cCI6MjA1NzQ0MzEwNH0.GPIFaUoNzwm5v_3DRiGp5PvLbdTR5KjnroKna30-kYI'; // Your Supabase anon key

	const dispatch = createEventDispatcher();

	let item = null;
	let loading = false;
	let error = null;

	function decodeHTML(html) {
		const txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	async function fetchItem() {
		if (!itemId || !supabaseUrl) return;

		loading = true;
		error = null;

		try {
			const functionUrl = `${supabaseUrl}/functions/v1/fetch-ebay-item?itemId=${itemId}`;

			const response = await fetch(functionUrl, {
				headers: {
					Authorization: `Bearer ${supabaseAnonKey}`
				}
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch item');
			}

			// Decode HTML entities
			if (data.title) data.title = decodeHTML(data.title);
			if (data.description) data.description = decodeHTML(data.description);

			item = data;
			// notify parent that item loaded
			dispatch('loaded', { itemId });
		} catch (err) {
			// prefer to surface the message but keep original behavior
			const msg = err && err.message ? err.message : String(err);
			error = msg;
			dispatch('error', { itemId, error: msg });
		} finally {
			loading = false;
		}
	}

	// $: if (itemId) fetchItem();
	onMount(() => {
		if (itemId) fetchItem();
	});
</script>

<!-- Same template and styles as before -->
<div class="ebay-item">
	{#if loading}
		<div class="loading">Loading item...</div>
	{:else if error}
		<div class="error">Error: {error}</div>
	{:else if item}
		<div class="item-card">
			{#if item.image}
				<img src={item.image} alt={item.title} class="item-image" />
			{:else}
				<div class="no-image">No image available</div>
			{/if}
			<div class="item-details">
				<h2 class="item-title">{item.title}</h2>
				{#if item.description}
					<p class="item-description">{item.description}</p>
				{/if}
				{#if item.price}
					<p class="item-price">{item.currency} ${item.price}</p>
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
		max-width: 400px;
		margin: 0 auto;
	}

	.item-card {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		background: white;
	}

	.item-image {
		width: 100%;
		height: auto;
		display: block;
		max-height: 400px;
		object-fit: contain;
		background: #f5f5f5;
	}

	.no-image {
		width: 100%;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f5f5f5;
		color: #999;
		font-style: italic;
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
		line-height: 1.5;
	}

	.item-price {
		font-size: 1.25rem;
		font-weight: normal;
		color: #ff41ce;
		margin: 10px 0;
	}

	.item-link {
		display: inline-block;
		background-color: #ff41ce;
		color: white;
		padding: 10px 20px;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.3s;
	}

	.item-link:hover {
		background-color: #ff41ce;
	}

	.loading,
	.error {
		padding: 20px;
		text-align: center;
	}

	.error {
		color: #ff41ce;
	}
</style>
