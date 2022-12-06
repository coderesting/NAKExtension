function init() {
	const nameInput = document.querySelector("input[name=user]");
	const passInput = document.querySelector("input[name=pass]");
	const loginButton = document.querySelector("input[type=submit]");

	if (nameInput && passInput && loginButton) {
		attemptLogin(nameInput, passInput, loginButton);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
