import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// Initialize the ApifyClient with your Apify API token
// Set APIFY_TOKEN in your .env file (copy .env.example to get started)
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// Prepare Actor input
const input = {
    imageUrls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nike_Air_Jordan_I.jpg/960px-Nike_Air_Jordan_I.jpg',
    ],
    status: 'sold',
    maxResultsPerImage: 120,
    proxyConfiguration: {
        useApifyProxy: true,
    },
};

// Run the Actor and wait for it to finish
const run = await client.actor('piotrv1001/mercari-image-search-scraper').call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs
