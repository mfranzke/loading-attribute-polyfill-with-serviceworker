self.addEventListener('fetch', (event) => {
	const requestURLParams = new URL(event.request.url).searchParams,
		swURLSearchparams = new URL(self.location.href).searchParams;

	if (
		requestURLParams.get('loading') &&
		requestURLParams.get('loading') === 'lazy'
	) {
		if (event.request.destination === 'iframe') {
			if (swURLSearchparams.get('loading-iframes') !== 'true') {
				event.respondWith(
					new Response('', {
						headers: { 'Content-Type': 'text/html; charset=utf-8' },
					})
				);
			}
		} else if (swURLSearchparams.get('loading-images') !== 'true') {
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