const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// An array with your page routes
const links = [
  { url: '/', changefreq: 'daily', priority: 0.8 },
  { url: '/register', changefreq: 'monthly', priority: 0.7 },
  { url: '/login', changefreq: 'monthly', priority: 0.7 },
  { url: '/profile', changefreq: 'monthly', priority: 0.7 },
  // Add more routes as needed
];

// Create a stream to write to
const stream = new SitemapStream({
  hostname: 'https://notable-react.vercel.app',
});

// Write sitemap to file
streamToPromise(Readable.from(links).pipe(stream)).then(data => {
  fs.writeFileSync('public/sitemap.xml', data.toString());
});
