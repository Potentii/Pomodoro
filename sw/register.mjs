if('serviceWorker' in navigator){
	window.addEventListener('load', async e => {
		try{
			const registration = await navigator.serviceWorker.register('../sw.mjs');
			console.log('ServiceWorker registration successful');
		} catch(err){
			console.log('ServiceWorker registration failed: ', err);
			console.error(err);
		}
	});
}