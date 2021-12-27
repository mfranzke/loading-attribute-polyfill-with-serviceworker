self.addEventListener('fetch', (event) => {
	const requestURLParameters = new URL(event.request.url).searchParams;
	const swURLSearchparams = new URL(self.location.href).searchParams;

	if (
		requestURLParameters.get('loading') &&
		requestURLParameters.get('loading') === 'lazy'
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
						(requestURLParameters.get('image-width') || '0') +
						' ' +
						(requestURLParameters.get('image-height') || '0') +
						'"></svg>',
					{
						headers: { 'Content-Type': 'image/svg+xml' },
					}
				)
			);
		}
	}
});
