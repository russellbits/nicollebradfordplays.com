import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
	// Handle CORS
	if (req.method === 'OPTIONS') {
		return new Response('ok', {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization'
			}
		});
	}

	try {
		const url = new URL(req.url);
		const itemId = url.searchParams.get('itemId');

		if (!itemId) {
			return new Response(JSON.stringify({ error: 'Item ID is required' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		const itemUrl = `https://www.ebay.com/itm/${itemId}`;

		const response = await fetch(itemUrl, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.5'
			}
		});

		const html = await response.text();

		// Extract data
		let titleMatch = html.match(/<title>([^<]+)<\/title>/);
		let imageMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/);
		let descMatch = html.match(/<meta name="description" content="([^"]+)"/);
		let priceMatch = html.match(/"price":"([^"]+)"/);
		let currencyMatch = html.match(/"priceCurrency":"([^"]+)"/);

		const title = titleMatch?.[1] || '';
		const image = imageMatch?.[1] || '';
		const description = descMatch?.[1] || '';
		const price = priceMatch?.[1] || '';
		const currency = currencyMatch?.[1] || 'USD';

		if (!title) {
			return new Response(JSON.stringify({ error: 'Could not extract item data' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		}

		return new Response(
			JSON.stringify({
				itemId,
				title,
				image,
				description,
				link: itemUrl,
				price,
				currency
			}),
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || 'Failed to fetch item data' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	}
});
