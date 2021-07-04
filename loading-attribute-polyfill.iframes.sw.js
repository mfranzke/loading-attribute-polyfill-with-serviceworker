self.addEventListener('fetch', (event) => {
	const requestURLParams = new URL(event.request.url).searchParams;

	if (
		requestURLParams.get('loading') &&
		requestURLParams.get('loading') === 'lazy'
	) {
		if (event.request.destination === 'iframe') {
			event.respondWith(
				new Response('', {
					headers: { 'Content-Type': 'text/html; charset=utf-8' },
				})
			);
		}
		return;
	}
});
