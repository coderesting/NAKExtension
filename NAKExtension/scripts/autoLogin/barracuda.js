function init() {
	const nameInput = document.getElementById('user')
	const passInput = document.getElementById('password_entry')
	const loginButton = document.getElementById('Submit')
	if (nameInput && passInput && loginButton) {
		attemptLogin(nameInput, passInput, loginButton)
	}
}

if (document.readyState === 'loading')
	document.addEventListener('DOMContentLoaded', init)
else init()
