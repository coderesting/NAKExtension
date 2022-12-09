function getRedirectURL() {
	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('previousUrl')) return urlParams.get('previousUrl')
	if (urlParams.has('redirect_uri')) return urlParams.get('redirect_uri')
	return 'https://link.springer.com/'
}

async function init() {
	const { autoLogin, lastTry } = await getData({
		autoLogin: false,
		lastTry: 0,
	})

	if (!autoLogin) return

	if (Date.now() - lastTry > 10000) {
		window.location.href = `https://sp.springer.com/saml/login?idp=https://idp.nordakademie.de/idp/shibboleth&targetUrl=${getRedirectURL()}`
	} else {
		console.log('no auto login: recent failed attempt')
	}
}

if (document.readyState === 'loading')
	document.addEventListener('DOMContentLoaded', init)
else init()
