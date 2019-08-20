importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
} else {
	console.log(`Boo! Workbox didn't load 😬`);
}
let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
// 	// Prevent Chrome 67 and earlier from automatically showing the prompt
// 	e.preventDefault();
// 	// Stash the event so it can be triggered later.
// 	deferredPrompt = e;
// 	// Update UI notify the user they can add to home screen
// 	alert('Install in your home screen?');
// 	deferredPrompt.prompt();
// 	// Wait for the user to respond to the prompt
// 	deferredPrompt.userChoice
// 		.then((choiceResult) => {
// 			if (choiceResult.outcome === 'accepted') {
// 				console.log('User accepted the A2HS prompt');
// 			} else {
// 				console.log('User dismissed the A2HS prompt');
// 			}
// 			deferredPrompt = null;
// 		});
// });
//
// window.addEventListener('appinstalled', (evt) => {
// 	alert('App installed');
// });

workbox.routing.registerRoute(
	// Cache CSS files.
	/\.css$/,
	// Use cache but update in the background.
	new workbox.strategies.StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: 'css-cache',
	})
);

workbox.routing.registerRoute(
	// Cache image files.
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	// Use the cache if it's available.
	new workbox.strategies.CacheFirst({
		// Use a custom cache name.
		cacheName: 'image-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache only 20 images.
				maxEntries: 20,
				// Cache for a maximum of a week.
				maxAgeSeconds: 7 * 24 * 60 * 60,
			})
		],
	})
);