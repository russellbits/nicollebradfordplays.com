// src/routes/api/ebay/+server.js (for SvelteKit)
// Or use this as a standalone Express server

import { json } from '@sveltejs/kit';

const EBAY_APP_ID = 'RussellW-MyMamaSa-SBX-c88c9ae0a-e13d34ed'; // Get this from eBay Developer Program

export async function GET({ url }) {
	const itemId = url.searchParams.get('itemId');
	const seller = url.searchParams.get('seller');

	if (!itemId) {
		return json({ error: 'Item ID is required' }, { status: 400 });
	}

	try {
		// Using eBay Finding API
		const ebayUrl = new URL('https://svcs.ebay.com/services/search/FindingService/v1');
		ebayUrl.searchParams.append('OPERATION-NAME', 'findItemsAdvanced');
		ebayUrl.searchParams.append('SERVICE-VERSION', '1.0.0');
		ebayUrl.searchParams.append('SECURITY-APPNAME', EBAY_APP_ID);
		ebayUrl.searchParams.append('RESPONSE-DATA-FORMAT', 'JSON');
		ebayUrl.searchParams.append('REST-PAYLOAD', '');
		ebayUrl.searchParams.append('keywords', itemId);

		if (seller) {
			ebayUrl.searchParams.append('itemFilter(0).name', 'Seller');
			ebayUrl.searchParams.append('itemFilter(0).value', seller);
		}

		const response = await fetch(ebayUrl.toString());
		const data = await response.json();

		const items = data.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item;

		if (!items || items.length === 0) {
			return json({ error: 'Item not found' }, { status: 404 });
		}

		const item = items[0];

		return json({
			itemId: item.itemId?.[0],
			title: item.title?.[0],
			image: item.galleryURL?.[0] || item.pictureURLLarge?.[0],
			description: item.subtitle?.[0] || '',
			link: item.viewItemURL?.[0],
			price: item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__,
			currency: item.sellingStatus?.[0]?.currentPrice?.[0]?.['@currencyId']
		});
	} catch (error) {
		console.error('eBay API Error:', error);
		return json({ error: 'Failed to fetch item data' }, { status: 500 });
	}
}
