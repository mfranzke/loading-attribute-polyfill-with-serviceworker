self.addEventListener('fetch', (event) => {
	const requestURLParams = new URL(event.request.url).searchParams;

	if (
		requestURLParams.get('loading') &&
		requestURLParams.get('loading') === 'lazy'
	) {
		if (event.request.destination !== 'iframe') {
			event.respondWith(
				new Response(
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
						requestURLParams.get('image-width') +
						' ' +
						requestURLParams.get('image-height') +
						'"></svg>',
					{
						headers: { 'Content-Type': 'image/svg+xml' },
					}
				)
			);
		}
		return;
	}
});
